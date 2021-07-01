import React, { useState, useEffect } from 'react'
import './PolyPiece.scss'

export default function PolyPiece ({ image, size, id, piece, vEdges, hEdges, xCount, yCount, setActive }) {

    const modPecent = size / 70     // size of piece represents 70% of total size
    const buffer = 15 * modPecent   // 15% buffer around piece

    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [xOffset, setXOffset] = useState()
    const [yOffset, setYOffset] = useState()
    const [edges, setEdges] = useState([[0,0],[0,0],[0,0],[0,0]])
    const [perimeter, setPerimeter] = useState([15,85,85,15])

    function handlePieceClick(e) {
        setActive(e)
    }

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

        setEdges(temp)
    }

    function setThePerimeter () {
        const temp = [...perimeter]

        if (/top/.test(piece.description))
            temp[0] = 0
        if (/right/.test(piece.description))
            temp[1] = 100
        if (/bottom/.test(piece.description))
            temp[2] = 100
        if (/left/.test(piece.description)) 
            temp[3] = 0
        
        setPerimeter(temp)
    }
    useEffect(() => {
        setTheWidth()
        setTheHeight()
        setTheOffset()
        setTheEdges()
        setThePerimeter()
    }, [])

    return (
        <div 
            onClick={handlePieceClick}
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
                clipPath: `polygon(${perimeter[3]}% ${perimeter[0]}%, ${edges[0][0]}% ${edges[0][1]+perimeter[0]}%, 
                                    ${perimeter[1]}% ${perimeter[0]}%, ${edges[1][0]+perimeter[1]}% ${edges[1][1]}%, 
                                    ${perimeter[1]}% ${perimeter[2]}%, ${edges[2][0]}% ${edges[2][1]+perimeter[2]}%, 
                                    ${perimeter[3]}% ${perimeter[2]}%, ${edges[3][0]+perimeter[3]}% ${edges[3][1]}%)`
            }}
        >
        </div>
    )
} 