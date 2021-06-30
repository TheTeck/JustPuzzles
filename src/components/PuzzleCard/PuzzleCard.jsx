import React from 'react'
import './PuzzleCard.scss'

export default function PuzzleCard ({ puzzle, showPuzzle, index, firstPage }) {

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    function handlePlayClick () {
        showPuzzle(puzzle._id)
    }

    return (
        <div className="card-container">
            <div className="puzzle-date">
                { index === 0 && firstPage ? <span id="new-puzzle">New Puzzle For Today!</span> : '' }
                {months[puzzle.month-1]} {puzzle.day}, {puzzle.year}
            </div>
            <div className="thumb-container">
                <img className="puzzle-thumb" src={puzzle.photoUrl} style={{ width: `${puzzle.width/3}px`, height: `${puzzle.height/3}px`, background: 'rgba(0,0,0,0.5)' }} />
            </div>
            <div className="play-btn" onClick={handlePlayClick}>Play This Puzzle</div>
        </div>
    )
}