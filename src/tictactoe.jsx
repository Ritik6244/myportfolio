import React, { useEffect, useState } from 'react'
import { RotateCcw, Sparkles, Trophy } from 'lucide-react'
import './tictactoeStyle.css'

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

function winnerOf(board) {
  for (const line of winningLines) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return { player: board[a], line }
  }
  return null
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('X')
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })
  const [round, setRound] = useState(1)
  const [notice, setNotice] = useState('')
  const result = winnerOf(board)
  const isDraw = !result && board.every(Boolean)
  const finished = Boolean(result || isDraw)

  useEffect(() => {
    if (result) {
      setScores((current) => ({ ...current, [result.player]: current[result.player] + 1 }))
      setNotice(`${result.player === 'X' ? 'Ritik' : 'Newton'} takes the round!`)
    } else if (isDraw) {
      setScores((current) => ({ ...current, draws: current.draws + 1 }))
      setNotice('A lovely little draw.')
    }
  }, [result?.player, isDraw])

  const play = (index) => {
    if (board[index] || finished) return
    const next = [...board]
    next[index] = turn
    setBoard(next)
    setTurn(turn === 'X' ? 'O' : 'X')
  }

  const nextRound = () => {
    setBoard(Array(9).fill(null))
    setTurn(round % 2 ? 'O' : 'X')
    setRound((value) => value + 1)
    setNotice('')
  }

  const newGame = () => {
    setBoard(Array(9).fill(null))
    setTurn('X')
    setScores({ X: 0, O: 0, draws: 0 })
    setRound(1)
    setNotice('')
  }

  const status = result
    ? <><Trophy size={16} /> {notice}</>
    : isDraw
      ? <><Sparkles size={16} /> {notice}</>
      : <><span className={`turn-symbol ${turn.toLowerCase()}`}>{turn}</span> {turn === 'X' ? 'Ritik' : 'Newton'}'s turn</>

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header>
        <a className="brand" href="#top" aria-label="Playful home"><span className="brand-mark">R</span><span>playful</span></a>
        <div className="round-pill"><span className="pulse" /> ROUND {round} <span className="round-divider" /> BEST OF FUN</div>
        <button className="new-game" onClick={newGame}><RotateCcw size={16} /> New game</button>
      </header>

      <section className="game-layout" aria-label="Tic tac toe game">
        <aside className="player-card player-x">
          <div className="avatar ritik">R</div>
          <div className="player-copy"><p>PLAYER ONE</p><h2 style={{ color: 'var(--yellow)' }}>Ritik</h2><span className="player-token x-token">X</span></div>
          <div className="score-block"><span>SCORE</span><strong>{scores.X}</strong></div>
        </aside>

        <section className="game-center">
          <div className={`status ${finished ? 'finished' : ''}`}>{status}</div>
          <div className="board" role="grid" aria-label="Tic tac toe board">
            {board.map((cell, index) => (
              <button key={index} className={`cell ${cell ? cell.toLowerCase() : ''} ${result?.line.includes(index) ? 'winner' : ''}`} onClick={() => play(index)} role="gridcell" aria-label={cell ? `${cell} on square ${index + 1}` : `Empty square ${index + 1}`}>
                {cell && <span>{cell}</span>}
              </button>
            ))}
          </div>
          <div className="under-board">
            <span>FIRST TO THREE WINS</span>
            <button onClick={nextRound}>{finished ? 'Next round' : 'Reset round'} <span>↗</span></button>
          </div>
        </section>

        <aside className="player-card player-o">
          <div className="avatar newton">N</div>
          <div className="player-copy"><p>PLAYER TWO</p><h2 style={{ color: 'var(--yellow)' }}>Newton</h2><span className="player-token o-token">O</span></div>
          <div className="score-block"><span>SCORE</span><strong>{scores.O}</strong></div>
        </aside>
      </section>

      <footer className="game-footer">
        <span>Made for a little friendly competition</span>
        <div className="draw-count"><i /> DRAWS <b>{scores.draws}</b></div>
      </footer>
    </main>
  )
}
