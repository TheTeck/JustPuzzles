import React from 'react'
import { useHistory } from 'react-router-dom'
import './Header.scss'

export default function Header () {

    const history = useHistory()

    function handleTitleClick () {
        history.push('/')
    }

    return (
        <div id="header-container">
            <div onClick={handleTitleClick} id="header-title">Just Puzzles</div>
            <div id="header-slogan">Your source for daily puzzles!</div>
        </div>
    )
}