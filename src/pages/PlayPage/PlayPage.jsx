import React, { useState, useEffect } from 'react'
import { useLocation, useParams} from 'react-router-dom'
import TilePiece from '../../components/TilePiece/TilePiece'
import PolyPiece from '../../components/PolyPiece/PolyPiece'
import * as puzzleService from '../../utils/puzzleService'
import './PlayPage.css'

export default function PlayPage () {

    const location = useLocation()
    const pieceSize = location.state.size
    const type = location.state.type

    const [ puzzle, setPuzzle ] = useState({})
    const [ xCount, setXCount ] = useState()
    const [ yCount, setYCount ] = useState()
    const [ currentActive, setCurrentActive ] = useState(null)
    const [ thePuzzle, setThePuzzle ] = useState([])
    const [ vEdges, setVEdges ] = useState([])
    const [ hEdges, setHEdges ] = useState([])
    const [ force, setForce ] = useState(false)
    const [ puzzleDone, setPuzzleDone ] = useState(false)
    const [ buffer, setBuffer ] = useState(0)
    
    const { id } = useParams()
    let interval = null
      
    
    const snap = new Audio('/snap.mp3')

    // Add all connected pieces to each other's connected array property
    function bindPieces (piece, otherPiece) {
        const allConnected = [ ...thePuzzle[piece].connected, ...thePuzzle[otherPiece].connected ]
        const allUniqueConnected = [...new Set(allConnected)]
        const temp = thePuzzle

        thePuzzle[piece].connected.forEach(connectedPiece => {
            temp[connectedPiece].connected = [...allUniqueConnected]
            temp[connectedPiece].xLoc = thePuzzle[otherPiece].xLoc + (thePuzzle[connectedPiece].x - thePuzzle[otherPiece].x) * pieceSize
            temp[connectedPiece].yLoc = thePuzzle[otherPiece].yLoc + 
                (thePuzzle[connectedPiece].y - thePuzzle[otherPiece].y) * pieceSize
        })

        thePuzzle[otherPiece].connected.forEach(connectedPiece => {
            temp[connectedPiece].connected = [...allUniqueConnected]
        })

        snap.play()
        setThePuzzle(temp)
    }

    // Look for a connection between pieces
    function checkConnection (piece) {
        let outputX = thePuzzle[piece].xLoc
        let outputY = thePuzzle[piece].yLoc

        // Check if piece above active piece is in range and snap to it
        if (thePuzzle[piece].y !== 0 && !thePuzzle[piece].connected.includes(piece - xCount)) {
            const offset = piece-xCount < xCount ? buffer : 0
            if (Math.abs(thePuzzle[piece].yLoc - (thePuzzle[piece-xCount].yLoc + pieceSize - offset)) < 15
                && Math.abs(thePuzzle[piece].xLoc - (thePuzzle[piece-xCount].xLoc)) < 15) {
                outputX = thePuzzle[piece-xCount].xLoc
                outputY = thePuzzle[piece-xCount].yLoc + pieceSize - offset
                bindPieces(piece, piece-xCount)
                return [ outputX, outputY ]
            }
        }
        // Check if piece to the left of the active piece is in range and snap to it
        if (thePuzzle[piece].x !== 0 && !thePuzzle[piece].connected.includes(piece - 1)) {
            const offset = piece - 1 % xCount ? 0 : buffer
            if (Math.abs(thePuzzle[piece].xLoc - (thePuzzle[piece-1].xLoc + pieceSize - offset)) < 15
                && Math.abs(thePuzzle[piece].yLoc - (thePuzzle[piece-1].yLoc)) < 15) {
                outputX = thePuzzle[piece-1].xLoc + pieceSize - offset
                outputY = thePuzzle[piece-1].yLoc
                bindPieces(piece, piece-1)
                return [ outputX, outputY ]
            }
        }
        // Check if piece below active piece is in range and snap to it
        if (thePuzzle[piece].y !== yCount-1 && !thePuzzle[piece].connected.includes(piece + xCount)) {
            const offset = piece < xCount ? buffer : 0
            if (Math.abs(thePuzzle[piece].yLoc - (thePuzzle[piece+xCount].yLoc - pieceSize + offset)) < 15
                && Math.abs(thePuzzle[piece].xLoc - (thePuzzle[piece+xCount].xLoc)) < 15) {
                outputX = thePuzzle[piece+xCount].xLoc
                outputY = thePuzzle[piece+xCount].yLoc - pieceSize + offset
                bindPieces(piece, piece+xCount)
                return [ outputX, outputY ]
            }
        }
        // Check if piece to the right of the active piece is in range and snap to it
        if (thePuzzle[piece].x !== xCount-1 && !thePuzzle[piece].connected.includes(piece + 1)) {
            const offset = piece % xCount ? 0 : buffer
            if (Math.abs(thePuzzle[piece].xLoc - (thePuzzle[piece+1].xLoc - pieceSize + offset)) < 15
                && Math.abs(thePuzzle[piece].yLoc - (thePuzzle[piece+1].yLoc)) < 15) {
                outputX = thePuzzle[piece+1].xLoc - pieceSize + offset
                outputY = thePuzzle[piece+1].yLoc
                bindPieces(piece, piece+1)
                return [ outputX, outputY ]
            }
        }

        return [ outputX, outputY ]
    }

    function setActive(e) {
        if (currentActive !== null) {
            const temp = thePuzzle
            temp[currentActive].connected.forEach(piece => {
                let locs = checkConnection(piece)
                temp[piece].z = 1
                temp[piece].xLoc = locs[0]
                temp[piece].yLoc = locs[1]
            })
            setThePuzzle(temp)
            setCurrentActive(null)
            if (temp[currentActive].connected.length === thePuzzle.length) {
                setPuzzleDone(true)
                console.log("puzzle is complete")
            }
        } else {
            if (e.target.id >= 0 && e.target.id < yCount * xCount)
                setCurrentActive(+e.target.id)
        }
    }

    function movePiece(e) {
        if (currentActive !== null) {
            const temp = thePuzzle
            temp[currentActive].xLoc = updatePieceXLocation(e.clientX, currentActive)
            temp[currentActive].yLoc = updatePieceYLocation(e.clientY, currentActive)
            for (let connection of temp[currentActive].connected) {
                temp[connection].xLoc = updatePieceXLocation(e.clientX, connection)
                temp[connection].yLoc = updatePieceYLocation(e.clientY, connection)
                temp[connection].z = 3
            }
            setThePuzzle(temp)
            setForce(!force)
        }
    }

    function updatePieceXLocation(mouseX, piece) {
        const offset = thePuzzle[piece].x === 0 ? buffer : 0
        return (thePuzzle[piece].x - thePuzzle[currentActive].x) * pieceSize + mouseX - pieceSize / 2 + offset
    }

    function updatePieceYLocation(mouseY, piece) {
        const offset = thePuzzle[piece].y === 0 ? buffer : 0
        return (thePuzzle[piece].y - thePuzzle[currentActive].y) * pieceSize + mouseY - pieceSize / 2 + offset
    }
    
    async function setupPuzzle () {
        try {
            const thePuzzle = await puzzleService.getOne(id)
            setPuzzle(thePuzzle.puzzle)
            const xSize = Math.floor(thePuzzle.puzzle.width / pieceSize)
            const ySize = Math.floor(thePuzzle.puzzle.height / pieceSize)
            setXCount(xSize)
            setYCount(ySize)
            
            const temp = []
            const vEdgeBuilder = []
            const hEdgeBuilder = []
            for(let y = 0; y < ySize; y++) {         
                vEdgeBuilder.push([])
                hEdgeBuilder.push([]) 
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
                            z: 1,
                            xLoc: Math.floor(Math.random() * (window.innerWidth - pieceSize)),
                            yLoc: Math.floor(Math.random() * (window.innerHeight - pieceSize)),
                            description: description,
                            connected: [ xSize * y + x]
                        }
                    )

                    // Establish edges in-between polygon pieces
                    if (type === 'poly' && x !== xSize - 1) {
                        vEdgeBuilder[y].push([Math.floor(Math.random() * 30) - 15, Math.floor(Math.random() * 40) + 30])
                    }
                    if (type === 'poly' && y !== ySize - 1) {
                        hEdgeBuilder[y].push([Math.floor(Math.random() * 30) - 15, Math.floor(Math.random() * 40) + 30])
                    }
                }
            }

            setVEdges(vEdgeBuilder)
            setHEdges(hEdgeBuilder)

            if (type === 'tile')
                setBuffer(0)
            if (type === 'poly')
                setBuffer(pieceSize / 70 * 15)

            setThePuzzle(temp)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setupPuzzle()
    }, [])

    return (
        <>
            <div id="puzzle-container" onClick={setActive} onMouseMove={movePiece} >
                {
                    thePuzzle.map((piece, index) => {
                        return (
                            <>
                                {
                                    type === 'tile' ?
                                        <TilePiece 
                                            key={index}
                                            piece={piece}
                                            image={puzzle.photoUrl}
                                            id={index}
                                            size={pieceSize}
                                        />
                                    :
                                        <PolyPiece 
                                            key={index}
                                            piece={piece}
                                            image={puzzle.photoUrl}
                                            id={index}
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
            {
                puzzleDone ? 
                    <div className="puzzle-done">
                        Congratulations! Puzzle Completed!
                    </div> : ''
            }
        </>
    )
}