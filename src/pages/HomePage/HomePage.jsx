import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Feed from '../../components/Feed/Feed'
import * as puzzleService from '../../utils/puzzleService'
import './HomePage.css'

export default function HomePage ({ pageNum }) {

    const [ allPuzzles, setAllPuzzles ] = useState([])
    const [ pagePuzzles, setPagePuzzles ] = useState([])
    const [ page, setPage ] = useState(pageNum)
    const [ totalPages, setTotalPages ] = useState(0)

    const history = useHistory()

    function showPuzzle (id) {
        history.push(`/puzzle/${id}/options`)
    }

    function handleLeftClick () {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    function handleRightClick () {
        if (page < totalPages) {
            setPage(page + 1)
        }
    }

    function updatePuzzleList () {
        const onePageOfPuzzles = allPuzzles.slice(10*(page-1), 10*page)
        setPagePuzzles(onePageOfPuzzles)
    }

    async function getPuzzles () {
        try {
            const data = await puzzleService.getAll();
            data.puzzles = data.puzzles.reverse()
            setAllPuzzles(data.puzzles)
            setTotalPages(Math.ceil(data.puzzles.length / 10))
        } catch(err){
            console.log(err, 'Could not load puzzles')
        }
    }

    useEffect(() => {
        updatePuzzleList()
    })

    useEffect(() => {
        getPuzzles()
    }, [])

    return (
        <div id="home-container">
            <Header />
            <div className="pagination-display">
                <div onClick={handleLeftClick} className="left-arrow"></div>
                {page} of {totalPages} Pages
                <div onClick={handleRightClick} className="right-arrow"></div>
            </div>
            <Feed puzzles={pagePuzzles} showPuzzle={showPuzzle} firstPage={page === 1 ? true : false}/>
        </div>
    )
}

