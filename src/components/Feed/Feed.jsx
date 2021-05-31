import React from 'react'
import PuzzleCard from '../../components/PuzzleCard/PuzzleCard'
import './Feed.css'

export default function Feed ({ puzzles, showPuzzle }) {
    return (
        <div id="feed-container">
            {
                puzzles.map(puzzle => {
                    return (
                        <PuzzleCard key={puzzle._id} puzzle={puzzle} showPuzzle={showPuzzle} />
                    )
                })
            }
        </div>
    )
}