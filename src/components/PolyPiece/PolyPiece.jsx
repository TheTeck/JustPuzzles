import React, { useState, useEffect } from 'react'
import './PolyPiece.css'

export default function PolyPiece ({ image, size, id, piece }) {

    const modPecent = size / 70     // size of piece represents 70% of total size
    const buffer = 15 * modPecent   // 15% buffer around piece

    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [xOffset, setXOffset] = useState()
    const [yOffset, setYOffset] = useState()

    function setTheWidth () {
        if (/left/.test(piece.description) || /right/.test(piece.description))
            setWidth(size + buffer)
        else 
            setWidth(size + 2 * buffer)
    }

    function setTheHeight () {
        if (/top/.test(piece.description) || /bottom/.test(piece.description)) 
            setHeight(size + buffer)
        else
            setHeight(size + 2 * buffer)
    }

    function setTheOffset () {
        console.log(buffer, 'buffer size')
        setYOffset(/top/.test(piece.description) ? 0 : buffer)
        setXOffset(/left/.test(piece.description) ? 0 : buffer)
    }

    useEffect(() => {
        setTheWidth()
        setTheHeight()
        setTheOffset()
    }, [])

    return (
        <div 
            id={id}
            className="poly-piece"
            style={{ 
                backgroundPosition: `-${(piece.x * size) - xOffset}px -${(piece.y * size) - yOffset}px`, 
                width: `${width}px`, 
                height: `${height}px`,
                backgroundImage: `url(${image})`,
                left: `${piece.xLoc - buffer}px`,
                top: `${piece.yLoc - buffer}px`,
                zIndex: `${piece.z}`,
                fontSize: '20px',
                color: 'white'
            }}
            >{piece.x}, {piece.y}</div>
    )
} 