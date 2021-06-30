import React, { useState, useEffect } from 'react'
import './ViewPuzzlesPage.scss'
import AdminFeed from '../../components/AdminFeed/AdminFeed'
import * as puzzleService from '../../utils/puzzleService'

export default function ViewPuzzlesPage () {

    const [puzzles, setPuzzles] = useState([])

    async function deletePuzzle (id) {
        try {
            await puzzleService.removePuzzle(id)
            getPuzzles()
        } catch (err) {
            console.log(err)
        }
    }

    async function getPuzzles() {
        try {
            let thePuzzles = await puzzleService.getAll()
            thePuzzles = thePuzzles.puzzles.reverse()
            setPuzzles(thePuzzles)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPuzzles()
    }, [])

    return (
        <div>{puzzles ? <AdminFeed puzzles={puzzles} deletePuzzle={deletePuzzle} /> : 'No puzzles available'}</div>
    )
}