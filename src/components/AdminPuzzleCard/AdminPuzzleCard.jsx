import React, { useState } from 'react'
import './AdminPuzzleCard.css'

export default function AdminPuzzleCard ({ puzzle, deletePuzzle }) {

    const [views, setViews] = useState(puzzle.views ? puzzle.views : 0)

    const photoName = puzzle.photoUrl.split('/')
    const photo = photoName[photoName.length-1]

    function handleDeleteClick () {
        deletePuzzle(puzzle._id)
    }

    return (
        <>
            <div className="admin-card">
                {puzzle.month}/{puzzle.day}/{puzzle.year} - {photo}  <span className="views">Views: {views}</span>
                <div onClick={handleDeleteClick} className="close-card">X</div>   
            </div>
            
        </>
    )
}