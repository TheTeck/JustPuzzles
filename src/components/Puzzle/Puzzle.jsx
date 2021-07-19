import React, { useState, useEffect } from 'react'
import TilePiece from '../TilePiece/TilePiece'
import PolyPiece from '../PolyPiece/PolyPiece'
import * as puzzleService from '../../utils/puzzleService'
import './Puzzle.scss'

export default function Puzzle ({ id, type, pieceSize, handlePuzzleComplete }) {

    const [ puzzleImage, setPuzzleImage ] = useState({})
    const [ xCount, setXCount ] = useState()
    const [ yCount, setYCount ] = useState()
    const [ currentActive, setCurrentActive ] = useState(null)
    const [ thePuzzle, setThePuzzle ] = useState([])
    const [ vEdges, setVEdges ] = useState([])
    const [ hEdges, setHEdges ] = useState([])
    const [ force, setForce ] = useState(false)
    const [ buffer, setBuffer ] = useState(0)

    const SNAP_GAP = 15 //within 15px pieces will snap together
    const POLY_BUFFER = 30 // 30% of piece size
    const VERTEX_RANGE = 40 // the middle 40% of a size
    const VERTEX_RANGE_OFFSET = (100 - VERTEX_RANGE) / 2 // Basically 30%
      
    
    

    // Add all connected pieces to each other's connected array property
    function bindPieces (piece, otherPiece) {
        const allConnected = [ ...thePuzzle[piece].connected, ...thePuzzle[otherPiece].connected ]
        const allUniqueConnected = [...new Set(allConnected)].sort((a, b) => (a.y * xCount + a.x) - (b.y * xCount + b.x))
        const temp = thePuzzle

        thePuzzle[piece].connected.forEach(connectedPiece => {
            temp[connectedPiece].connected = allUniqueConnected
            temp[connectedPiece].xLoc = thePuzzle[piece].xLoc + 
                (thePuzzle[connectedPiece].x - thePuzzle[piece].x) * pieceSize +
                (thePuzzle[connectedPiece].x === 0 ? buffer : thePuzzle[piece].x === 0 ? -buffer : 0)
                
            temp[connectedPiece].yLoc = thePuzzle[piece].yLoc + 
                (thePuzzle[connectedPiece].y - thePuzzle[piece].y) * pieceSize + 
                (thePuzzle[connectedPiece].y === 0 ? buffer : thePuzzle[piece].y === 0 ? -buffer : 0)
                
        })

        thePuzzle[piece].connected.forEach(connectedPiece => {
            temp[connectedPiece].connected = allUniqueConnected
        })

        thePuzzle[otherPiece].connected.forEach(connectedPiece => {
            temp[connectedPiece].connected = allUniqueConnected
        })

        //snap.play()
        setThePuzzle(temp)
    }

    // Determines if a piece is in range to connect
    function checkConnection (piece) {
        let outputX = thePuzzle[piece].xLoc
        let outputY = thePuzzle[piece].yLoc

        // Check if piece above active piece is in range and snap to it
        if (thePuzzle[piece].y !== 0 && !thePuzzle[piece].connected.includes(piece - xCount)) {
            const offset = piece-xCount < xCount ? buffer : 0
            if (Math.abs(thePuzzle[piece].yLoc - (thePuzzle[piece-xCount].yLoc + pieceSize - offset)) < SNAP_GAP
                && Math.abs(thePuzzle[piece].xLoc - thePuzzle[piece-xCount].xLoc) < SNAP_GAP) {
                outputX = thePuzzle[piece-xCount].xLoc
                outputY = thePuzzle[piece-xCount].yLoc + pieceSize - offset
                return [ outputX, outputY, piece - xCount ]
            }
        }
        // Check if piece to the left of the active piece is in range and snap to it
        if (thePuzzle[piece].x !== 0 && !thePuzzle[piece].connected.includes(piece - 1)) {
            const offset = (piece - 1) % xCount ? 0 : buffer
            if (Math.abs(thePuzzle[piece].xLoc - (thePuzzle[piece-1].xLoc + pieceSize - offset)) < SNAP_GAP
                && Math.abs(thePuzzle[piece].yLoc - (thePuzzle[piece-1].yLoc)) < SNAP_GAP) {
                outputX = thePuzzle[piece-1].xLoc + pieceSize - offset
                outputY = thePuzzle[piece-1].yLoc
                return [ outputX, outputY, piece - 1 ]
            }
        }
        // Check if piece below active piece is in range and snap to it
        if (thePuzzle[piece].y !== yCount-1 && !thePuzzle[piece].connected.includes(piece + xCount)) {
            const offset = piece < xCount ? buffer : 0
            if (Math.abs(thePuzzle[piece].yLoc - (thePuzzle[piece+xCount].yLoc - pieceSize + offset)) < SNAP_GAP
                && Math.abs(thePuzzle[piece].xLoc - (thePuzzle[piece+xCount].xLoc)) < SNAP_GAP) {
                outputX = thePuzzle[piece+xCount].xLoc
                outputY = thePuzzle[piece+xCount].yLoc - pieceSize + offset
                return [ outputX, outputY, piece + xCount ]
            }
        }
        // Check if piece to the right of the active piece is in range and snap to it
        if (thePuzzle[piece].x !== xCount-1 && !thePuzzle[piece].connected.includes(piece + 1)) {
            const offset = piece % xCount ? 0 : buffer
            if (Math.abs(thePuzzle[piece].xLoc - (thePuzzle[piece+1].xLoc - pieceSize + offset)) < SNAP_GAP
                && Math.abs(thePuzzle[piece].yLoc - (thePuzzle[piece+1].yLoc)) < SNAP_GAP) {
                outputX = thePuzzle[piece+1].xLoc - pieceSize + offset
                outputY = thePuzzle[piece+1].yLoc
                return [ outputX, outputY, piece + 1 ]
            }
        }

        return [ outputX, outputY, null ]
    }

    // Either selects a piece or checks and makes any connections if
    // already selected peice is within range of connectable pieces
    function setActive(e) {
        if (currentActive !== null) {
            const temp = thePuzzle

            if (temp[currentActive].connected.length <= 1) {
                temp[currentActive].z = 0
            }

            temp[currentActive].connected.forEach(piece => {
                let [newX, newY, otherPiece] = checkConnection(piece)
                
                // If there is a connectable piece in range
                if(otherPiece) {
                    const snap = new Audio('/snap.mp3')
                    snap.play()
                    bindPieces(piece, otherPiece)
                }
                
                temp[piece].z = 1
                temp[piece].xLoc = newX
                temp[piece].yLoc = newY
            })
            
            setThePuzzle(temp)
            setCurrentActive(null)
            if (temp[currentActive].connected.length === thePuzzle.length) {
                handlePuzzleComplete()
            }
        } else {
            if (e.target.id >= 0 && e.target.id < yCount * xCount)
                setCurrentActive(+e.target.id)
        }
    }

    // Move all connected pieced attached to the one piece selected
    function movePiece(e) {
        if (currentActive !== null) {
            const temp = thePuzzle
            for (let connection of temp[currentActive].connected) {
                temp[connection].xLoc = updatePieceLocation(e.clientX, 'x', connection)
                temp[connection].yLoc = updatePieceLocation(e.clientY, 'y', connection)
                temp[connection].z = 3
            }
            setThePuzzle(temp)
            setForce(!force)
        }
    }

    function updatePieceLocation(pointer, dimension, piece) {
        const offset = thePuzzle[piece][dimension] === 0 ? buffer : 0
        return (thePuzzle[piece][dimension] - thePuzzle[currentActive][dimension]) * pieceSize + pointer - pieceSize / 2 + offset
    }
    
    // Initial creation of all puzzle pieces
    async function setupPuzzle () {
        try {
            const puzzleImg = await puzzleService.getOne(id)
            setPuzzleImage(puzzleImg.puzzle)
            const xSize = Math.floor(puzzleImg.puzzle.width / pieceSize)
            const ySize = Math.floor(puzzleImg.puzzle.height / pieceSize)
            setXCount(xSize)
            setYCount(ySize)
            
            const temp = []
            const vEdgeBuilder = []
            const hEdgeBuilder = []

            for(let y = 0; y < ySize; y++) {         
                vEdgeBuilder.push([])
                hEdgeBuilder.push([]) 

                // Create all of the pieces
                for (let x = 0; x < xSize; x++) {

                    let description = ''
                    if (y === 0) description += 'top'
                    else if (y === ySize - 1) description += 'bottom'
                    if (x === 0) description += 'left'
                    else if (x === xSize - 1) description += 'right'

                    temp.push(
                        {
                            x: x,
                            y: y,
                            z: 0,
                            xLoc: Math.floor(Math.random() * (window.innerWidth - pieceSize)),
                            yLoc: Math.floor(Math.random() * (window.innerHeight - pieceSize - 100) + 100),
                            description: description,
                            connected: [ xSize * y + x]
                        }
                    )

                    // Establish edges in-between polygon pieces
                    if (type === 'poly' && x !== xSize - 1) {
                        vEdgeBuilder[y].push([Math.floor(Math.random() * POLY_BUFFER) - POLY_BUFFER / 2, Math.floor(Math.random() * VERTEX_RANGE) + VERTEX_RANGE_OFFSET])
                    }
                    if (type === 'poly' && y !== ySize - 1) {
                        hEdgeBuilder[y].push([Math.floor(Math.random() * POLY_BUFFER) - POLY_BUFFER / 2, Math.floor(Math.random() * VERTEX_RANGE) + VERTEX_RANGE_OFFSET])
                    }
                }
            }

            setVEdges(vEdgeBuilder)
            setHEdges(hEdgeBuilder)

            if (type === 'tile')
                setBuffer(0)
            if (type === 'poly') {
                const PERCENT_OF_VISUAL_TILE = 70 // visual tiile will be 70% of total size with buffer
                const PERCENT_OF_BUFFER = (100 - PERCENT_OF_VISUAL_TILE) / 2
                setBuffer(pieceSize / PERCENT_OF_VISUAL_TILE * PERCENT_OF_BUFFER)
            }

            setThePuzzle(temp)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setupPuzzle()
    }, [])

    return (
        <div id="puzzle-container" onMouseMove={movePiece} >
            {
                thePuzzle.map(piece => {
                    return (
                        <>
                            {
                                type === 'tile' ?
                                    <TilePiece 
                                        setActive={setActive}
                                        key={piece.x + (piece.y * xCount)}
                                        piece={piece}
                                        image={puzzleImage.photoUrl}
                                        id={piece.x + (piece.y * xCount)}
                                        size={pieceSize}
                                    />
                                :
                                    <PolyPiece 
                                        setActive={setActive}
                                        key={piece.x + (piece.y * xCount)}
                                        piece={piece}
                                        image={puzzleImage.photoUrl}
                                        id={piece.x + (piece.y * xCount)}
                                        size={pieceSize}
                                        vEdges={vEdges}
                                        hEdges={hEdges}
                                        xCount={xCount}
                                        yCount={yCount}
                                    />
                            }
                        </>
                    )
                }) 
            }
        </div>
    )
}