import React from 'react'
import PuzzleCard from '../../components/PuzzleCard/PuzzleCard'
import './Feed.css'

export default function Feed ({ puzzles, showPuzzle, firstPage }) {
    return (
        <div id="feed-container">
            {
                puzzles.map((puzzle, index) => {
                    return (
                        <PuzzleCard key={puzzle._id} puzzle={puzzle} showPuzzle={showPuzzle} index={index} firstPage={firstPage} />
                    )
                })
            }
        </div>
    )
}