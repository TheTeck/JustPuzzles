import React from 'react'
import AdminPuzzleCard from '../AdminPuzzleCard/AdminPuzzleCard'
import './AdminFeed.css'

export default function AdminFeed ({ puzzles, deletePuzzle }) {
    return (
        <div id="admin-puzzle-feed">
            {
                puzzles.map(puzzle => {
                    return (
                        <AdminPuzzleCard puzzle={puzzle} deletePuzzle={deletePuzzle} key={puzzle._id} />
                    )
                })
            }
        </div>
    )
}