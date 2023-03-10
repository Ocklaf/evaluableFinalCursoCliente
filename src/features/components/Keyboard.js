import '../../styles/keyboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { letterClicked, deleteLetter, changeErrorMsg } from '../reducers/wordleSlice'
import { checkWord } from '../thunks'

function Keyboard() {

  const dispatch = useDispatch()
  const { words, actualWordIndex, keysColor, loading, gameId } = useSelector(state => state.wordle)
  const firstKeysLine = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const secondKeysLine = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ']
  const thirdKeysLine = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

  function clickOnALetterKey(clickEvent) {
    if (loading) return
    const letter = clickEvent.target.innerText
    dispatch(letterClicked(letter))
  }

  const upperKeyboardLine = firstKeysLine.map(key => <div className={`key ${keysColor[key.toLowerCase()]}`} key={key} onClick={clickOnALetterKey}>{key}</div>)
  const middleKeyboardLine = secondKeysLine.map(key => <div className={`key ${keysColor[key.toLowerCase()]}`} key={key} onClick={clickOnALetterKey}>{key}</div>)
  const lowerKeyboardLine = thirdKeysLine.map(key => <div className={`key ${keysColor[key.toLowerCase()]}`} key={key} onClick={clickOnALetterKey}>{key}</div>)

  function cleanErrorMessage() {
    dispatch(changeErrorMsg(''))
  }

  function verifyLengthOfTheWord() {

    if (loading) return

    cleanErrorMessage()

    let isAllTheSlotsWithLetters = words[actualWordIndex].lettersOfTheWord.indexOf('') === -1

    if (isAllTheSlotsWithLetters) {
      dispatch(checkWord({word: words[actualWordIndex].lettersOfTheWord, id: gameId}))
      return
    }

    dispatch(changeErrorMsg('No hay suficientes letras'))
  }

  function clickedOnDeleteKey() {

    if (loading) return

    dispatch(deleteLetter())
  }

  return (
    <div className="keyboard">
      <div className="keyboard-line">
        {upperKeyboardLine}
      </div>
      <div className="keyboard-line">
        {middleKeyboardLine}
      </div>
      <div className="keyboard-line">
        <div className="command" onClick={verifyLengthOfTheWord}>↵</div>
        {lowerKeyboardLine}
        <div className="command" onClick={clickedOnDeleteKey}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" aria-hidden="true" style={{ width: "20px", height: "30px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z">
          </path>
        </svg>
        </div>
      </div>
    </div>
  )
}

export default Keyboard