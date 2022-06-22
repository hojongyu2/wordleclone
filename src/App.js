import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { useState } from 'react';
import './App.css';
import { answerList, wordList } from './wordleWords';
import { useEffect } from 'react';

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

const letters = [
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"
]


//get Random String
const pickWordAnswer = () => {
  let random = [...answerList]
  let randomWord = random[Math.floor(Math.random() * random.length)]
  // console.log(randomWord)
  return randomWord
}
const defaultRandomWord = pickWordAnswer()

//remaining chances
let life = 6

function App() {

  const [wordleGuessList, setWordleGuessList] = useState(JSON.parse(JSON.stringify(defaultGuessList)))
  // const [letterGuess, setLetterGuess] = useState('')

  const keyList = [...defaultKeyList]
  
  const [wordleGuessIndex, setWordleGuessIndex] = useState(0)
  const [wordleLetterIndex, setWordleLetterIndex] = useState(0)
  const [wordleAnswer, setWordleAnswer] = useState(defaultRandomWord)
  const [gameState, setGameState] = useState("playing") //"playing", "won", "lost"
  
  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [wordleLetterIndex, wordleGuessIndex]);
  

  const handleKeyPress = (key) => {
    
    const wordleGuessListCopy = JSON.parse(JSON.stringify(wordleGuessList))
    console.log(wordleGuessListCopy[0].join(''))
    
    if (key === "backspace") {
      wordleGuessListCopy[wordleGuessIndex][wordleLetterIndex-1] = ''
      setWordleLetterIndex(wordleLetterIndex - 1)
      setWordleGuessList(wordleGuessListCopy)
      return;
    }
    
    if (key === "enter" ){

      //if your answer is less than 5 letters, then alert
      if(wordleLetterIndex < 5){
        alert('Word has to be 5 letters')
        return;
      }

      //if you get it right, set gamestate to WON
      if(wordleGuessListCopy[wordleGuessIndex].join('') === defaultRandomWord){
        setGameState('won')
        return;
      
      //
      }else if (wordleGuessListCopy[wordleGuessIndex].join('') !== defaultRandomWord){
        setWordleGuessIndex(wordleGuessIndex + 1)
        setWordleLetterIndex(0)
        life -= 1

        if (life === 0){
          setGameState('lost')
        }


        return;
      }
  
      return;
    }
    //set number of letter maximam of 5
    if (wordleLetterIndex === 5){
      setWordleLetterIndex(5)
      return;
    }
    
    
    

    
    wordleGuessListCopy[wordleGuessIndex][wordleLetterIndex] = key

    setWordleGuessList(wordleGuessListCopy)

    setWordleLetterIndex(wordleLetterIndex + 1)
    
    console.log("handleKeyPress ", key)
  
    // setWordleGuessList([[]])
    
    
  }

  return (
    <div className="App" >
      <header className="App-header">
        <WordleGridHead />
        <div>{gameState}</div>
        <div>remaining chances: {life}</div>
        <div>{defaultRandomWord}</div>
        <WordleGrid
          wordleGuessList={wordleGuessList}
        />
        <WordleKeyboard
          keyList={keyList}
          handleKeyPress={handleKeyPress}
          //props code in order to reach down to very bottom of the child function
        />
        <pickWordAnswer/>
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
  // const  {wordleGuessList} = props
  return (
    <div className="wordle-grid">
      {props.wordleGuessList.map((wordleGuess, index) => {
        return (
          <GuessRow key = {`wordleGuess-${index}`} wordleGuess={wordleGuess} />
        )
      })}
    </div>
  )
}

const GuessRow = (props) => {
  return (
    <div className="wordle-grid-row">
      {props.wordleGuess.map((wordleLetter, index) => {
        return (
          <GuessLetter key = {`wordleLetter-${index}`} wordleLetter = {wordleLetter} />
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
      {props.keyList.map((keyBoardRow, index) => {
        return (
          <KeyboardRow key={`keyboard-row-${index}`} keyBoardRow={keyBoardRow} handleKeyPress={props.handleKeyPress}/>
        )
      })}
    </div>
  )
}
const KeyboardRow = (props) => {
  return (
    <div className="keyboard-grid-row">
      {props.keyBoardRow.map((keyBoardKey, index) => {
        return (
          <KeyboardLetter key={`keyboard-letter-${index}`} keyBoardKey={keyBoardKey} handleKeyPress={props.handleKeyPress}/>
        )
      })}
    </div>
  )
}
const KeyboardLetter = (props) => {
  return (
    <div className="keyboard-grid-letter" onClick={()=>{

      console.log("triggered key press ", props.keyBoardKey)

      props.handleKeyPress(props.keyBoardKey)
    }}>
      {props.keyBoardKey}
    </div>
  )
}

export default App;