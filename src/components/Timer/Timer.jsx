import React, { useState, useEffect } from 'react'
import './Timer.scss'

export default function Timer ({ pause }) {

    const [time, setTime] = useState(0)

    function padNum (num) {
        return num < 10 ? '0' + num : num
    }

    function updateDisplay () {
        const minutes = padNum(Math.floor(time/60))
        const seconds = padNum(Math.floor(time%60))
        return `${minutes}:${seconds}`
    }

    useEffect(() => {
        if (!pause) {
            const interval = setInterval(() => {
                setTime(time + 1)
            }, 1000)

            return function cleanUp () {
                clearInterval(interval)
            }
        }
    })

    return (
        <div className="timer-display">{updateDisplay()}</div>
    )
}