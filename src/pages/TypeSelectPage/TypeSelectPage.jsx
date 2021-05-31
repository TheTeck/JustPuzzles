import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './TypeSelectPage.css';

export default function TypeSelectPage () {

    const [type, setType] = useState('tile')
    const { id } = useParams()

    const sizeSelection = [ 126, 150, 176, 216, 260, 308 ]

    function handleTileClick() {
        setType('tile')
    }

    return (
        <div id="type-select-container">
            <Header />
            <div id="all-selections-container">
                <div id="selections-container">
                    <div id="selections-title">Choose your puzzle piece type</div>
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
                    {
                        sizeSelection.map((size, index) => {
                            return (
                                <div key={index} className="sizes">
                                    {size}
                                </div>
                            )
                        })
                    }
                </div>
                <div id="selection-btn">OK</div>
            </div>
        </div>
    )
}