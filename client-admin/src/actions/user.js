import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
} from './constants'
import { userLogin } from '../api/login'

// 登录成功的方法
export const UserLoginsuccessAction = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
})

// 清空reducer的方法
export const UserLoginerrorAction = (user) => ({
  type: USER_LOGIN_ERROR,
})

// 异步登录的方法
export const loginAsyncActionCreator = (user) => ((dispatch) => {
  userLogin(user)
    .then((resData) => {
      console.log(resData)
      if (resData.code === 200) {
        dispatch(UserLoginsuccessAction(resData.data))
      }
    })
    .catch(() => {
      console.log('失败')
    })
})
