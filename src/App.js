
import { useState } from 'react';
import './App.css';

const defaultGuessList = [
  ["","","","",""],
  ["","","","",""],
  ["","","","",""],
  ["","","","",""],
  ["","","","",""],
  ["","","","",""],
  ]

function App() {

  const [wordleGuesslist, setWordleGuessList] = useState([...defaultGuessList])
   
  // const [letterGuess, setLetterGuess] = useState('')

  // const [keyList, setKeyList] = useState ([
  //   ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  //   ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  //   ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
  //   ])

  return (
    <div className="App">
      <header className="App-header">
        <WordleGridHead/>
        <WordleGrid
          wordleGuesslist={wordleGuesslist}
        />
        <WordleKeyboard/>
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
  return(
    <div className="wordle-grid">
      {props.wordleGuesslist.map((wordleGuess)=>{
        return(
          <GuessRow wordleGuess={wordleGuess}/>
        )
      })}
    </div>
  )
}

const GuessRow = (props) => {
  return (
    <div className="wordle-grid-row">
      {props.wordleGuess.map((wordleLetter)=>{
        return(
          <GuessLetter wordleLetter={wordleLetter}/>
        )
      })}
    </div>  
  )
}
const GuessLetter = (props) => {
  return (
    <div className='wordle-grid-letter'>
      {props.wordleLetter}
    </div>
  )
}

const WordleKeyboard = (props) =>{
  
  return (
    <div>
      WordleKeyboard
    </div>
  )
}

//componentize
export default App;
