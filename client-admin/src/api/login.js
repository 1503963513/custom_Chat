import API from './constants'
import request from '../utils/request'

// 登录
export const userLogin = (params) => request({
  url: API.USER_LOGIN,
  method: 'post',
  data: params,
})
// 注册
export const userRegister = (params) => request({
  url: API.USER_REGISTER,
  method: 'post',
  data: params,
})
