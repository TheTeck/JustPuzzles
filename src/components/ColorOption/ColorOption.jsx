import React from 'react'
import './ColorOption.scss'

export default function ColorOption ({ color, handleColorSelection }) {

    function handleClick () {
        handleColorSelection(color)
    }

    return (
        <div onClick={handleClick} className={`color-option-${color}`}></div>
    )
}