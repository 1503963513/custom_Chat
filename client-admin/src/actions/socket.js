import {
  SOCKET_SUCCESS,
  SOCKET_FAIL,
  SOCKET_UPMSG,
} from './constants'

// 登录成功的方法
export const SocketSuccessAction = (info) => ({
  type: SOCKET_SUCCESS,
  payload: info,
})
// 登录成功的方法 消息更新
export const SocketSuccessMsgAction = (info) => ({
  type: SOCKET_UPMSG,
  payload: info,
})

// 登录成功的方法
export const SocketFailAction = () => ({
  type: SOCKET_FAIL,
})
