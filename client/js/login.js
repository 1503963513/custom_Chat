class Login {
    constructor() {
        this.socket = null
        this.addFormEvent()
    }
    addFormEvent() {
        let that = this
        let params = {
            name: '小明',
            source: 1,
            sourcePage: 1,
            phone: 13128656212,
            customerService: null
        }
        $('.btn1').addEventListener('click', ()=>{
            that.socket = io("ws://localhost:5001");
            that.socket.emit("conconnect", params, 5);

            that.socket.on("connection", () => {
                console.log(socket.id); // 输出客户端的id
            });
            that.socket.on("onmessage", (data) => {
                console.log('接收消息', data)
            });
        })

        $('.btn2').addEventListener('click', ()=>{
            that.socket.emit("onmessage", params, $('.inputone').value);
        })

        $('.btn3').addEventListener('click', ()=>{
            that.socket.emit("befordisconnect", params);
            that.socket.disconnect()
        })
        // $('.form').addEventListener('submit', (e)=>{
        //     e.preventDefault()
        //     const values = Tool.getFormValues(e)
        //     console.log(values)
        //     axios.get({
        //         url: baseUrl + '/user',
        //         data: values,
        //     }).then((res)=>{
        //         console.log(res)
        //     })
        // })
        // $('.formed').addEventListener('submit', (e)=>{
        //     e.preventDefault()
        //     const values = Tool.getFormValues(e)
        //     axios.post({
        //         url: baseUrl + '/user',
        //         data: values,
        //     }).then((res)=>{
        //         console.log(res)
        //     })
        // })
    }
}
new Login