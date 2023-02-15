import '../../styles/keyboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { letterClicked, deleteLetter, enterKey } from '../reducers/wordSlice'
import { changeErrorMsg } from '../reducers/errorSlice'
//import { addNewWord } from '../reducers/wordsSlice'
import { checkWord, checkLetters } from '../thunks'
import { useEffect } from 'react'

function Keyboard() {
/*importar los loadings aquí*/


  //const keyboard = useSelector(state => state.keyboardState)
  const dispatch = useDispatch()
  const { words,actualIndex, keysColor, loadingCheckWord } = useSelector(state => state.word)
  const { isValid, loadingError } = useSelector(state => state.error)
  const { gameId, loadingGame } = useSelector(state => state.game)

  /*const wordIsLoading = useSelector(state => state.dondetoque.elloading)*/
  /*el del game loading*/

  const block1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const block2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ']
  const block3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

  const upperLine = block1.map(key => <div className={`key ${keysColor[key.toLowerCase()]}`} key={key} onClick={clickOnALetterKey}>{key}</div>)
  const middleLine = block2.map(key => <div className={`key ${keysColor[key.toLowerCase()]}`} key={key} onClick={clickOnALetterKey}>{key}</div>)
  const lowerLine = block3.map(key => <div className={`key ${keysColor[key.toLowerCase()]}`} key={key} onClick={clickOnALetterKey}>{key}</div>)

  function clickOnALetterKey(e) {
    if (loadingGame || loadingError || loadingCheckWord) return
    
    /*if loading el que sea no hagas nada, return*/
    dispatch(letterClicked(e.target.innerText))

  }

  /*hacer otra función para evitar el funcionamiento del borrar si está algún loading funcionando*/


  function verifyLengthOfTheWord() {
    /*si está loading no haga lo de abajo, return y fuera*/
    if (loadingGame || loadingError || loadingCheckWord) return
    
    dispatch(changeErrorMsg(''))

    if (words[actualIndex].letterOfTheWord.indexOf('') === -1) {
      let joinedWord = words[actualIndex].letterOfTheWord.join('')
      dispatch(checkWord(joinedWord))
     // dispatch(addNewWord())
      return
    }

    dispatch(changeErrorMsg('No hay suficientes letras'))
  }

  function clickedOnDeleteKey() {
    if(loadingGame || loadingError || loadingCheckWord) return

    dispatch(deleteLetter())
  }

  useEffect(() => {
    if (isValid) {

      let arrayWithObjects = words[actualIndex].letterOfTheWord.map((letter, index) => {
        return {
          "position": index,
          "letter": letter.toLowerCase(),
          "id": gameId.id
        }
      })

      /*Aquí hay un console.log*/
     // console.log('arrayOfData', arrayWithObjects)

      dispatch(checkLetters(arrayWithObjects))
    }
  }, [isValid])


  return (
    <div className="keyboard">
      <div className="keyboard-line">
        {upperLine}
      </div>
      <div className="keyboard-line">
        {middleLine}
      </div>
      <div className="keyboard-line">
        <div className="command" onClick={verifyLengthOfTheWord}>↵</div>
        {lowerLine}
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