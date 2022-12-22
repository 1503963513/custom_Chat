var baseUrl = 'http://localhost:8527/public'

// 节点函数
const $ = (s)=> document.querySelector(s) 
const $$ = (s)=> document.querySelectorAll(s) 

// 取值函数
class Tool {
    constructor(value) {
        console.log('测试', value)
    }
    static getFormValues(dom) {
        let giensing = {}
        const forFarom = (dom) => {
            Array.from(dom.target?.children??dom.children).forEach((item)=>{ 
                if(item.name) {
                    giensing[item.name] = item.value
                }
                if(Array.from(item.children).length) {
                    return forFarom(item)
                }
            })
            return giensing
        }
        return forFarom(dom)
    }
}