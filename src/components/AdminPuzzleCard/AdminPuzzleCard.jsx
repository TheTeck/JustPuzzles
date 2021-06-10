import React from 'react'
import './AdminPuzzleCard.css'

export default function AdminPuzzleCard ({ puzzle, deletePuzzle }) {
    const photoName = puzzle.photoUrl.split('/')
    const photo = photoName[photoName.length-1]

    function handleDeleteClick () {
        deletePuzzle(puzzle._id)
    }

    return (
        <>
            <div className="admin-card">
                {puzzle.month}/{puzzle.day}/{puzzle.year} - {photo}
                <div onClick={handleDeleteClick} className="close-card">X</div>   
            </div>
            
        </>
    )
}