import React from 'react'
import ColorOption from '../ColorOption/ColorOption'
import './ColorSelector.scss'

export default function ColorSelector({ handleColorSelection }) {
    return (
        <div className="color-selector-container">
            <ColorOption color={1} handleColorSelection={handleColorSelection} />
            <ColorOption color={2} handleColorSelection={handleColorSelection} />
            <ColorOption color={3} handleColorSelection={handleColorSelection} />
            <ColorOption color={4} handleColorSelection={handleColorSelection} />
        </div>
    )
}