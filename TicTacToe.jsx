/* eslint-disable react-hooks/immutability */
import React, { useState } from 'react'
import './TicTacToe.css'
import circle_icon from '../assets/circle.png'
import cross_icon from '../assets/cross.png'

let data = ["", "", "", "", "", "", "", "", ""]

const TicTacToe = () => {

    const [count, setCount] = useState(0)
    const [lock, setLock] = useState(false)
    const [winner, setWinner] = useState("")

    const toggle = (e, num) => {
        if (lock || data[num] !== "") return;

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src=${cross_icon} alt="cross" />`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src=${circle_icon} alt="circle" />`;
            data[num] = "o";
        }

        setCount(count + 1);
        checkWin();
    }

    const checkWin = () => {

        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];

        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;

            if (data[a] && data[a] === data[b] && data[b] === data[c]) {
                won(data[a]);
                return;
            }
        }

        // Draw condition
        if (!data.includes("")) {
            setWinner("Draw!");
            setLock(true);
        }
    };

    const won = (player) => {
        setLock(true);
        setWinner(player === "x" ? "Cross Wins!" : "Circle Wins!");
    }

    const resetGame = () => {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        setLock(false);
        setWinner("");

        // Clear UI manually (since you're using innerHTML)
        const boxes = document.querySelectorAll(".boxes");
        boxes.forEach(box => box.innerHTML = "");
    }

    return (
        <div className='container'>
            <h1 className='title'>Tic Tac Toe</h1>

            <div className="announcement">
                {winner && <h2>{winner}</h2>}
            </div>

            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>

            <button className="reset" onClick={resetGame}>
                Reset Game
            </button>
        </div>
    )
}

export default TicTacToe