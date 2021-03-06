import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './TypeSelectPage.scss';

export default function TypeSelectPage () {

    const [type, setType] = useState('tile')
    const [count, setCount] = useState(150)
    const { id } = useParams()
    const history = useHistory()

    const sizeSelection = [ 77, 96, 104, 126, 150, 176, 216, 260, 308 ]

    function handleTileClick(e) {
        setType(e.target.getAttribute('name'))
    }

    function handleSizeClick(e) {
        setCount(+e.target.innerHTML)
    }

    function handleSubmitClick () {

        const sizeConversion = {
            '77': 85,
            '96': 80,
            '104': 75,
            '126': 70,
            '150': 65,
            '176': 60,
            '216': 55,
            '260': 50,
            '308': 45,
        }

        history.push({
            pathname: `/puzzle/${id}`,
            state: {
                type,
                size: sizeConversion['' + count]
            }
        })
    }

    // use useLocation() from react-router-dom
    // then location.state.type and location.state.count

    return (
        <div id="type-select-container">
            <Header />
            <div id="all-selections-container">
                <div id="selections-container">
                    <div id="selections-title">Select your puzzle piece type</div>
                        <div className="piece-selection" onClick={handleTileClick} name="tile">
                            <div className="piece-selection-name">Tiles</div>
                            {
                                type === 'tile' ? 
                                <>
                                    <div className='tileRed tile1'></div>
                                    <div className='tileRed tile2'></div>
                                    <div className='tileRed tile3'></div>
                                    <div className='tileRed tile4'></div>
                                </> :
                                <>
                                    <div className='tileBlack tile1'></div>
                                    <div className='tileBlack tile2'></div>
                                    <div className='tileBlack tile3'></div>
                                    <div className='tileBlack tile4'></div>
                                </>
                            }
                        </div>

                        <div className="piece-selection" onClick={handleTileClick} name="poly">
                            <div className="piece-selection-name">Polygons</div>
                            {
                                type === 'poly' ? 
                                <div id='polyOut' className='poly-selected' >
                                    <div id='polyIn'></div>
                                </div>
                                :
                                <div id='polyOut' style={{ backgroundColor: 'black'}} >
                                    <div id='polyIn' style={{ backgroundColor: 'rgb(57, 56, 56)'}} ></div>
                                </div>
                            }
                        </div>
                    </div>
                <div id="sizes-container">
                    <div id="selections-title">Select your piece count</div>
                    {
                        sizeSelection.map((size, index) => {
                            return (
                                <div key={index} className="sizes" onClick={handleSizeClick}>
                                    { size === count ? <span>{size}</span> : size }
                                </div>
                            )
                        })
                    }
                </div>
                <div id="selection-btn" onClick={handleSubmitClick}>OK</div>
            </div>
        </div>
    )
}