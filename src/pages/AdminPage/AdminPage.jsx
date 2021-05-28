import React from 'react'
import { useHistory } from 'react-router-dom'
import './AdminPage.css'

export default function AdminPage ({ admin, handleLogout }) {

    const history = useHistory()

    function handleLogoutClick () {
        handleLogout()
        history.push('/')
    }

    return (
        <div>
            <div onClick={handleLogoutClick}>Log Out</div>
            This is the admin page
        </div>
    )
}