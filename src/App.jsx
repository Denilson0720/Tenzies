import { useState } from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Dice from './Components/Dice'
import './App.css'
import React from 'react'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)
  // make new state gameActive, setGameActive, to start the timer and display all the dice
  const [gameActive, setGameActive] = useState(false)

  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue){
          setTenzies(true)
      }
  }, [dice])

  React.useEffect(()=>{
    // console.log('game has started')  
  },[gameActive])

  function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }
  
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }
  
  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
      die : generateNewDie()            
    }))
    setCount(oldCount=>oldCount+1)
    
  }
  function newGame(){
    setTenzies(false);
    setDice(allNewDice())
    setCount(0)
  }
  function holdDice(id) {
    // change the isHeld property of that die based off the id
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }
  function startGame(){
    setGameActive(oldState=>!oldState)
  }

  const diceElements = dice.map(die => (
      <Dice 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          // onClick and then run the holdDice function 
          holdDice={() => holdDice(die.id)}
      />
  ))
  // hard coding default values except id
  const emptyElements = dice.map(die=>(
    <Dice
      key={die.id}
      value={0}
      isHeld={false}
    />
  ))
  
  
  return (
        <main>
          {/* <button onClick={startGame}>Reset game</button> */}
          {/* if tenzies game is won/true, display confetti component */}
          {tenzies && <Confetti/>}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
          <p className='instructions'>Try to do it in the least amount of rolls!</p>
       
          {/* conditional render of dice, press button to switch gameActive to true to start
           game timer and display dice values */}
          {gameActive?
          <>
          <h4 className='count'>Roll Count: {count}</h4>
          <div className="dice-container">
              {diceElements}
          </div>
          <button 
              className="button-container" 
              onClick={tenzies?newGame:rollDice}
          >
              {tenzies ? "New Game" : "Roll"}
          </button>
          </>
          :
          <>
          <button 
            className='button-container'
            onClick={startGame}
          >
            Start Game
          </button>
          <div className='dice-container'>
            {emptyElements}
          </div>
          </>

          }
        </main>
  )
}

export default App
