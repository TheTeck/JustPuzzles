import React, { useState } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import ColorSelector from '../../components/ColorSelector/ColorSelector'
import Timer from '../../components/Timer/Timer'
import Puzzle from '../../components/Puzzle/Puzzle'
import './PuzzlePage.scss'

export default function PuzzlePage () {

    const location = useLocation()
    const pieceSize = location.state.size
    const type = location.state.type

    const [ puzzleDone, setPuzzleDone ] = useState(false)
    const [ color, setColor ] = useState(1)
    
    const history = useHistory()
    const { id } = useParams()

    function handleBackClick () {
        history.push('/')
    }

    function handleColorSelection (colorVal) {
        setColor(colorVal)
    }

    function handlePuzzleComplete () {
        setPuzzleDone(true)
    }

    return (
        <>
            <div id="puzzle-page-container" className={`bg-color-${color}`}>
                <ColorSelector handleColorSelection={handleColorSelection} />
                <Timer pause={puzzleDone} />
                <Puzzle id={id} type={type} pieceSize={pieceSize} handlePuzzleComplete={handlePuzzleComplete} />
            </div>
            {
                puzzleDone ? 
                    <div className="puzzle-done">
                        Congratulations! Puzzle Completed!
                        <div onClick={handleBackClick} className="return-btn">Back to Homepage</div>
                    </div> : ''
            }
        </>
    )
}