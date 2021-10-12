/**
 * Public file tool
 * @date 2019-04-03
 */

const _toString = Object.prototype.toString

/**
 * 是否为对象
 * @date 2020-08-04
 * @param {any} obj
 * @returns {any}
 */
const isObject = (obj) => {
    return obj !== null && typeof obj === 'object'
}

/**
 * 是否为数组对象
 * @date 2020-08-04
 * @param {any} obj
 * @returns {any}
 */
const isPlainObject = (obj) => {
    return _toString.call(obj) === '[object Object]'
}

/**
 * 是否为空对象
 * @date 2020-08-04
 * @param {any} value
 * @returns {any}
 */
const isEmptyObject = (value) => {
    return isPlainObject(value) && JSON.stringify(value) === '{}'
}

/**
 * 是否为数组
 * @date 2020-08-04
 * @param {any} value
 * @returns {any}
 */
const isArray = (value) => {
    return Array.isArray(value) || _toString.call(value) === '[object Array]'
}

/**
 * 是否为空数组
 * @date 2020-08-04
 * @param {any} value
 * @returns {any}
 */
const isEmptyArray = (value) => {
    return isArray(value) && value.length === 0
}

/**
 * 多维数组强制降维
 * @date 2020-08-04
 * @param {any} arr
 * @returns {any}
 */
const flattenDeep = (arr) => {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), [])
}

export {
    _toString,
    isObject,
    isArray,
    isEmptyArray,
    isPlainObject,
    isEmptyObject,
    flattenDeep
}