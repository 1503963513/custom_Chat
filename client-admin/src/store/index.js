import {createStore, applyMiddleware} from 'redux'
import rootReducers from '../reducers/index'
// 异步actions
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
// 创建数据持久化
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// 持久化配置
const persistConfig = {
  key: 'rootChat',
  storage,
  blacklist: ['socket'],
}

// 数据持久化第三歩 处理根reducer，（rootRenducer）
const myPersistReducer = persistReducer(persistConfig, rootReducers)

const loggerMiddleware = createLogger()

// 创建store
const store = createStore(
  myPersistReducer, // 数据持久化第四歩，替换原先的reducer
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    // loggerMiddleware, // 一个很便捷的 middleware，用来打印 action 日志
  ),
)

// 数据持久化第五歩，处理store
const persistor = persistStore(store)
export {store, persistor}
