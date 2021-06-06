import React, { useState, useEffect } from 'react'
import './PolyPiece.css'

export default function PolyPiece ({ image, size, id, piece, vEdges, hEdges, xCount, yCount }) {

    const modPecent = size / 70     // size of piece represents 70% of total size
    const buffer = 15 * modPecent   // 15% buffer around piece

    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [xOffset, setXOffset] = useState()
    const [yOffset, setYOffset] = useState()
    const [edges, setEdges] = useState([[0,0],[0,0],[0,0],[0,0]])

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

    function setTheEdges () {
        const temp = []
        // depth first, placement second
        temp.push(piece.y ? [hEdges[piece.y-1][piece.x][1], hEdges[piece.y-1][piece.x][0]] : [50,0])
        temp.push(piece.x < xCount-1 ? [vEdges[piece.y][piece.x][0], vEdges[piece.y][piece.x][1]] : [0,50])
        temp.push(piece.y < yCount-1 ? [hEdges[piece.y][piece.x][1], hEdges[piece.y][piece.x][0]] : [50,0])
        temp.push(piece.x ? [vEdges[piece.y][piece.x-1][0], vEdges[piece.y][piece.x-1][1]] : [0,50])

        // temp.push(piece.y ? [hEdges[piece.y-1][piece.x][0], hEdges[piece.y-1][piece.x][1]] : null)
        // temp.push(piece.x < xCount-1 ? [vEdges[piece.y][piece.x][0], vEdges[piece.y][piece.x][1]] : null)
        // temp.push(piece.y < yCount-1 ? [hEdges[piece.y][piece.x][0], hEdges[piece.y][piece.x][1]] : null)
        // temp.push(piece.x ? [vEdges[piece.y][piece.x-1][0], vEdges[piece.y][piece.x-1][1]] : null)
        setEdges(temp)
    }

    useEffect(() => {
        setTheWidth()
        setTheHeight()
        setTheOffset()
        setTheEdges()
    }, [])

    console.log(edges)
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
                color: 'white',
                // clipPath: `polygon(15% 15%, 15% 85%, 85% 85%, 85% 15%)`,
                clipPath: `polygon(15% 15%, ${edges[0][0]}% ${edges[0][1]+15}%, 85% 15%, ${edges[1][0]+85}% ${edges[1][1]}%, 85% 85%, ${edges[2][0]}% ${edges[2][1]+85}%, 15% 85%, ${edges[3][0]+15}% ${edges[3][1]}%)`

            }}
            >
                <div className="red-box" style={{ width: size, height: size, left: xOffset, top: yOffset }}>
                    {piece.x}, {piece.y}
                </div>
            </div>
    )
} 