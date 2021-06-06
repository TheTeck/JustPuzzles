import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Feed from '../../components/Feed/Feed'
import * as puzzleService from '../../utils/puzzleService'
import './HomePage.css'

export default function HomePage ({ pageNum }) {

    const [puzzles, setPuzzles] = useState([])
    const [page, setPage] = useState(pageNum)
    const [totalPages, setTotalPages] = useState(0)

    const history = useHistory()

    function showPuzzle (id) {
        history.push(`/puzzle/${id}/options`)
    }

    async function getPuzzles(pageNum) {
        try {
            const data = await puzzleService.getAll();
            data.puzzles = data.puzzles.reverse()
            const onePageOfPuzzles = data.puzzles.slice(10*(page-1), 10*page)
            setPuzzles([...onePageOfPuzzles])
            setTotalPages(Math.ceil(data.puzzles.length / 10))
        } catch(err){
            console.log(err, 'Could not load puzzles')
        }
    }

    useEffect(() => {
        getPuzzles(page)
    }, [])

    return (
        <div id="home-container">
            <Header />
            <div>{page} of {totalPages} Pages</div>
            <Feed puzzles={puzzles} showPuzzle={showPuzzle} />
        </div>
    )
}

