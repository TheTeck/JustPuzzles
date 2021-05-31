import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './TypeSelectPage.css';

export default function TypeSelectPage () {

    const [type, setType] = useState('tile')
    const [count, setCount] = useState(126)
    const { id } = useParams()
    const history = useHistory()

    const sizeSelection = [ 126, 150, 176, 216, 260, 308 ]

    function handleTileClick() {
        setType('tile')
    }

    function handleSizeClick(e) {
        setCount(+e.target.innerHTML)
    }

    function handleSubmitClick () {
        history.push({
            pathname: `/puzzle/${id}`,
            state: {
                type,
                count
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
                                <div className='tileRed' id="tile1"></div>
                                <div className='tileRed' id="tile2"></div>
                                <div className='tileRed' id="tile3"></div>
                                <div className='tileRed' id="tile4"></div>
                            </> :
                            <>
                                <div className='tileBlack' id="tile1"></div>
                                <div className='tileBlack' id="tile2"></div>
                                <div className='tileBlack' id="tile3"></div>
                                <div className='tileBlack' id="tile4"></div>
                            </>
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