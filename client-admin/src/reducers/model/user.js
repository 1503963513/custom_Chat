import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
} from '../../actions/constants'
import { ClooneDeep } from '../../utils/tools'

const initState = {
  userInfo: null,
  role: null,
  token: null,
}


const reducer = (state = initState, {type, payload}) => {
  let copy = ClooneDeep(state)

  switch (type) {
  case USER_LOGIN_SUCCESS:
    copy.userInfo = payload
    copy.role = payload
    copy.token = payload
    return copy

  case USER_LOGIN_ERROR:
    copy.userInfo = null
    copy.role = null
    copy.token = null
    return copy

  default:
    return state
  }
}

export default reducer
