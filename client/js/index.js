class A {
    constructor() {
        this.socket = null
        this.addFormEvent()
    }
    addFormEvent() {
        let that = this
        $('.btn1').addEventListener('click', () => {
            that.socket = io("ws://localhost:5001");
            that.socket.emit("conconnect", { name: '小红' }, 5);

            that.socket.on("connection", () => {
                console.log(socket.id); // 输出客户端的id
            });

            that.socket.on("onmessage", (data) => {
                console.log('接收消息', data)
            });
        })

        $('.btn2').addEventListener('click', () => {
            that.socket.emit("onmessage", { name: '客服1' }, $('.inputone').value);
        })

        $('.btn3').addEventListener('click', () => {
            that.socket.emit("befordisconnect", { name: '小红' });
            that.socket.disconnect()
        })
    }
}
new A()