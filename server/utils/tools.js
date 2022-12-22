
class Tool {
    constructor() {

    }
    static filterValueISfalse(obj) {
        let newObj = {}
        for (const key in obj) {
            if(obj[key]) {
               newObj[key] = obj[key]
            }
        }
        return newObj
    }
}

module.exports = Tool
