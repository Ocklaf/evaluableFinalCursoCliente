import '../../styles/letter.css'
import { useDispatch, useSelector } from 'react-redux'

import { selectSlotOnClick } from '../reducers/wordSlice'

function Letter(props) {
  const { id, value, isSelected, color } = props

  /*Me traigo el index de la línea en la que estamos jugando */

  const dispatch = useDispatch()
 
  return (
    <div className="letter" onClick={() => dispatch(selectSlotOnClick(id))}>
      <div className={`slot ${isSelected ? 'selected': ''} ${color}`}>
        <p>{value}</p>
      </div>
    </div>
  )
}

export default Letter