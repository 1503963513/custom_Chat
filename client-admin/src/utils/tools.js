export const ClooneDeep = (obj) => {

  const isObject = ((obj) => (typeof obj === 'object' || typeof obj === 'function') && obj != 'null')

  if (!isObject(obj)) {throw new Error('参数不是一个对象')}
  // 判断是数组还是对象
  const newObject = Array.isArray(obj) ? [...obj] : {...obj}

  Object.keys(newObject).forEach((key) => {
    if (isObject(newObject[key])) {
      newObject[key] = ClooneDeep(newObject[key])
    }
  })

  return newObject
}
