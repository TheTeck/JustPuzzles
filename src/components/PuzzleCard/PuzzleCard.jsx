import React from 'react'
import './PuzzleCard.css'

export default function PuzzleCard ({ puzzle }) {

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    function handlePlayClick () {
        //Do something here
    }

    return (
        <div className="card-container">
            <div className="puzzle-date">{months[puzzle.month-1]} {puzzle.day}, {puzzle.year}</div>
            <div className="thumb-container">
                <img className="puzzle-thumb" src={puzzle.photoUrl} style={{ width: `${puzzle.width/3}px`, height: `${puzzle.height/3}px`, background: 'red' }} />
            </div>
            <div className="play-btn" onClick={handlePlayClick}>Play This Puzzle</div>
        </div>
    )
}