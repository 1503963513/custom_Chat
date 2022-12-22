// 1.引入express模块
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
app.use(cors())

mongoose.connect('mongodb://localhost:27017/test').then((result) => {
    console.log('数据库连接成功')
}).catch((err) => {
    console.log('数据库连接失败', err)
})

// sokect #ifdef
const { createServer } = require('http')
const { Server } = require('socket.io')
const httpServer = createServer(app)
const io = new Server(httpServer, {cors: true})

let socketCustomerService = [] // 医生
let socketCustomerServiceMap = new Map()
let socketUserList = [] // 用户
let socketUserListMap = new Map()
io.on('connection', (socket) => {
   // 连接通信 连接人数
    socket.on("conconnect", (another) => {
        // 判断是客服还是用户
        if(another.identity === 1) { // identity  1 客服
            another.piperNum = 0
            let result = false
            for (let i = 0; i < socketCustomerService.length; i++) {
                let item = socketCustomerService[i]
                if(item.phone === another.phone) {
                    result = true
                    socketCustomerService[i] = another
                    socket.emit('onmessage', { code: 400, data: '', message: '当前客服在线'}) 
                }
            }
            !result && socketCustomerService.push(another)
            result && socketCustomerServiceMap.set(another.phone, socket)
        } else {
            if(!socketCustomerService.length) {
                socket.emit('onmessage', { code: 400, data: '', message: '当前没有在线客服'}) 
            } else{
                let result = false
                for (let i = 0; i < socketUserList.length; i++) {
                    let item = socketUserList[i]
                    if(item.phone === another.phone) {
                        result = true
                        socketUserList[i] = another
                        socket.emit('onmessage', { code: 400, data: '', message: '当前用户在线'}) 
                    }
                }
                !result && socketUserList.push(another)
                result && socketUserListMap.set(another.phone, socket)
            }
        }
    });

    // 事件
    socket.on("onmessage", (another, data) => {
        // console.log(another, data)
        // console.log(socketUserListMap.keys())
        if(another.identity === 1) {
            
        } else {
            if(socketUserList.some((item)=> item.phone === another.phone)) {
                
            }
            console.log(another, data)
        }
        // if(!!socketUserListMap.get(another.phone)) {
        //     socketUserListMap.get(another.phone).emit('onmessage', {code: 200, data})
        // } else {
        //     socket.emit('onmessage', { code: 400, message: '当前用户不在线'})
        // }
    });

    // 1.0 监听断开事件 断开前
    socket.on('befordisconnect', (data) => {
        // if(!!socketUserListMap.get(data.name)) {
        //     socketUserListMap.delete(data.name)
        // }
    })
    // 1.1 断开
    socket.on('disconnect', (reason) => {
        console.log('断开连接', reason)
    })
})

io.listen(5001, () => {
    console.log('服务器正在5001端口号运行....');
})
// 启动socket #ifndef

var userRouter = require('./pubilc/router')
var infoRouter = require('./pubilc/inforouter')
//通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json())
// 通过 express.urlencoded() 这个中间件，来解析表单中的 url-encoded 格式的数据
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))   //托管静态资源

app.use('/public/user',userRouter)
app.use('/public/info',infoRouter)


// 设置监听
app.listen(8527,()=>console.log("服务器运行于: http://localhost:8527/"))

