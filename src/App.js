
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { useState } from 'react';
import './App.css';

const defaultGuessList = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
]
const defaultKeyList = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
]

function App() {

  const [wordleGuesslist, setWordleGuessList] = useState([...defaultGuessList])

  // const [letterGuess, setLetterGuess] = useState('')

  const keyList = [...defaultKeyList]
  // console.log(keyList)

  return (
    <div className="App">
      <header className="App-header">
        <WordleGridHead />
        <WordleGrid
          wordleGuesslist={wordleGuesslist}
        />
        <WordleKeyboard
          keyList={keyList}
        />
      </header>
    </div>
  );
}

const WordleGridHead = () => {
  return (
    <h1 className='Wordle-Head'>
      Wordle Clone
    </h1>
  )
}
const WordleGrid = (props) => {
  // object destructure
  // const  {wordleGuesslist} = props
  return (
    <div className="wordle-grid">
      {props.wordleGuesslist.map((wordleGuess) => {
        return (
          <GuessRow wordleGuess={wordleGuess} />
        )
      })}
    </div>
  )
}

const GuessRow = (props) => {
  return (
    <div className="wordle-grid-row">
      {props.wordleGuess.map((wordleLetter) => {
        return (
          <GuessLetter wordleLetter={wordleLetter} />
        )
      })}
    </div>
  )
}
const GuessLetter = (props) => {
  return (
    <div className='wordle-grid-letter' style={{backgroundColor:'grey'}}>
      {props.wordleLetter}
    </div>
  )
}

const WordleKeyboard = (props) => {
  return (
    <div className="keyboard-grid">
      {props.keyList.map((keyBoard) => {
        return (
          <KeyboardRow keyBoard={keyBoard} />
        )
      })}
    </div>
  )
}
const KeyboardRow = (props) => {
  return (
    <div className="keyboard-grid-row">
      {props.keyBoard.map((keyBoardRow) => {
        return (
          <KeyboardLetter keyBoardRow={keyBoardRow}/>
        )
      })}
    </div>
  )
}
const KeyboardLetter = (props) => {
  return (
    <div className="keyboard-grid-letter">
      {props.keyBoardRow}
    </div>
  )
}


//componentize
export default App;
