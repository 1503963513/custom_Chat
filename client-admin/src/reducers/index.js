import { combineReducers } from 'redux'
import userReducer from './model/user'
import socketReducer from './model/socket'

export default combineReducers({
  user: userReducer,
  socket: socketReducer,
})
