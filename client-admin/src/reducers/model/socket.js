import {
  SOCKET_SUCCESS,
  SOCKET_FAIL,
  SOCKET_UPMSG,
} from '../../actions/constants'
import { ClooneDeep } from '../../utils/tools'
let map = new Map()
const initState = {
  $Socket: null,
  siderMsgs: [],
}


const reducer = (state = initState, {type, payload}) => {
  let copy = ClooneDeep(state)

  switch (type) {
  case SOCKET_SUCCESS:
    copy.$Socket = payload
    return copy

  case SOCKET_FAIL:
    copy.$Socket = null
    return copy

  case SOCKET_UPMSG:
    copy.siderMsgs = payload
    return copy

  default:
    return copy
  }
}

export default reducer

