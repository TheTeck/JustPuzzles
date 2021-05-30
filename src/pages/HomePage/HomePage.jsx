import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import * as puzzleService from '../../utils/puzzleService'
import './HomePage.css'

export default function HomePage ({ pageNum }) {

    const [puzzles, setPuzzles] = useState([])
    const [page, setPage] = useState(pageNum)

    async function getPuzzles(pageNum) {
        try {
            const data = await puzzleService.getAll();
            console.log(data)
            const onePageOfPuzzles = data.puzzles.slice(10*(page-1), 10*page)
            setPuzzles([...onePageOfPuzzles])
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
        </div>
    )
}

