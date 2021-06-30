import React from 'react'
import './TilePiece.scss'

export default function TilePiece ({ image, size, id, piece}) {
    return (
        <div 
            id={id}
            className="tile-piece"
            style={{ 
                backgroundPosition: `-${piece.x * size}px -${piece.y * size}px`, 
                width: `${size}px`, 
                height: `${size}px`,
                backgroundImage: `url(${image})`,
                left: `${piece.xLoc}px`,
                top: `${piece.yLoc}px`,
                zIndex: `${piece.z}`
            }}
            ></div>
    )
}  