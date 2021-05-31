import React, { useState, useEffect } from 'react'
import { useLocation, useParams} from 'react-router-dom'
import * as puzzleService from '../../utils/puzzleService'
import './PlayPage.css'

export default function PlayPage () {

    const [puzzle, setPuzzle] = useState({})

    const location = useLocation()

    const { id } = useParams()
    const count = location.state.count
    const type = location.state.type

    async function getPuzzle () {
        try {
            const thePuzzle = await puzzleService.getOne(id)
            setPuzzle(thePuzzle.puzzle)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPuzzle()
    }, [])

    return (
        <div>{type} / {count} pieces / {puzzle.width} X {puzzle.height}</div>
    )
}