import moment from 'moment';
/**
 * Public file tool
 * @date 2021-10-14
 */

const _toString = Object.prototype.toString;

/**
 * 是否为对象
 * @date 2021-10-14
 * @param {any} obj
 * @returns {any}
 */
const isObject = (obj) => {
    return obj !== null && typeof obj === 'object';
};

/**
 * 是否为数组对象
 * @date 2021-10-14
 * @param {any} obj
 * @returns {any}
 */
const isPlainObject = (obj) => {
    return _toString.call(obj) === '[object Object]';
};

/**
 * 是否为空对象
 * @date 2021-10-14
 * @param {any} value
 * @returns {any}
 */
const isEmptyObject = (value) => {
    return isPlainObject(value) && JSON.stringify(value) === '{}';
};

/**
 * 是否为数组
 * @date 2020-08-04
 * @param {any} value
 * @returns {any}
 */
const isArray = (value) => {
    return Array.isArray(value) || _toString.call(value) === '[object Array]';
};

/**
 * 是否为空数组
 * @date 2021-10-14
 * @param {any} value
 * @returns {any}
 */
const isEmptyArray = (value) => {
    return isArray(value) && value.length === 0;
};

/**
 * 多维数组强制降维
 * @date 2021-10-14
 * @param {any} arr
 * @returns {any}
 */
const flattenDeep = (arr) => {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};

/**
 * 递归
 * @date 2021-10-14
 * @param {any} list：递归的数据源
 * @param {any} opt：参数
 * @param {any} i=0
 * @returns {any}
 */
const recursiveFunc = (list, opt, i = 0) => {
    const { name = 'children', call, isReturn = false } = opt;

    if (!list.length) return list;
    return list.map(item => {
        if (isReturn) item = call && call(item, i);
        if (!isReturn) call && call(item, i);
        if (item[name] && item[name].length > 0) item[name] = recursiveFunc(item[name], opt, i + 1);
        return item;
    });
};

/**
 * 描述：递归方法
 * @date 2021-10-14
 * @param {Array} {arr: 数据源
 * @param {Function} sCall：子数据遍历前的回调
 * @param {Function} cCall：子数据回调
 * @param {Function} eCall：子数据遍历后的回调
 * @param {Array} children: 子数据数组
 * @param {Object} opt：数据对像
 * @param {Array} res：父级数组
 * @param {Number} count}：表示层数变量
 * @param {Array|Object} data：自定义处理的数据返回值
 * @returns {Array}
 */
const func = ({ arr, sCall, cCall, eCall, children = 'children', opt, res, i, data }) => {
    if (!arr || !arr.length) return arr;
    return arr.map((item, index) => {
        const child = item[children];
        const newI = i + 1;
        sCall && sCall({ item, res, index, i, newI, data });
        if (child && child.length) {
            item[children] = func({ arr: item[children], sCall, cCall, eCall, children, opt, res: item, i: newI, data });
            cCall && cCall({ item, res, index, i, newI, data });
        }
        eCall && eCall({ item, res, index, i, newI, data });
        return item;
    });
};

/**
 * 在多维数组中删除指定数据
 * @date 2021-10-14
 * @param {any} treeData：多维数组
 * @param {any} id：需要删除的数据的key
 * @returns {any}
 */
const doDelete = (treeData, id, childrenName = 'children', idKey = 'id') => {
    for (let i = treeData.length; i > 0; i--) {
        if (treeData[i - 1][idKey] == id) {
            treeData.splice(i - 1, 1);
        } else {
            if (treeData[i - 1][childrenName]) {
                doDelete(treeData[i - 1][childrenName], id);
            }
        }
    }
};

/**
 * 字符串是否包含某一字符
 * @date 2021-10-14
 * @param {any} str：字符串
 * @param {any} begin：开始位置
 * @param {any} end：结束位置
 * @param {any} word：字符
 * @returns {Boolen}
 */
const stringStartWith = (str, begin, end, word) => {
    if (str.substring(begin, end).toLowerCase().indexOf(word) == 0) {
        return true;
    }
    return false;
};

/**
 * 字段从一个对像转换另一个对像
 * @date 2021-10-14
 * @param {any} item：要生成的对像item
 * @param {any} arr：要生成的同名字段
 * @param {any} souce：要生成的同名字段
 * @param {any} prev=false：是否覆盖对像值
 * @returns {any}
 */
const createItem = (item, arr, souce, prev = false) => {
    arr.map(ntem => {
        if (Array.isArray(ntem)) {
            item[ntem[0]] = ntem[1] ? souce[ntem[0]] ? moment(souce[ntem[0]]).format('YYYY-MM-DD') : item[ntem[0]] : souce[ntem[0]];
        } else {
            if (!item[ntem] || prev) {
                item[ntem] = souce[ntem];
            }
        }
    });
};

/**
 * 向原对象中新增子对象
 * @date 2021-10-14
 * @param {any} item:原始数据
 * @param {any} newItem：新增数据
 * @param {any} filter=[]：过滤条件
 * @param {any} isReturn=false：是否返回
 * @returns {any}
 */
const createObject = (item, newItem, filter = [], isReturn = false) => {
    const newKeys = Object.keys(newItem);
    const filterKeys = newKeys.filter(stem => !filter.includes(stem));

    filterKeys.forEach(ntem => {
        item[ntem] = newItem[ntem];
    });
    if (isReturn) return item;
};

/**
 * 解析JSON字符串
 * @date 2021-10-14
 * @param {any} item：JSON.parse解析的对像
 * @param {any} isReturn=true：是否JSON.parse还回数据
 * @param {any} isStringify=true：是否JSON.parse还回数据
 * @returns {any}
 */
const parseJson = (item, isReturn = true, isStringify = true) => {
    if (typeof item === 'string') {
        try {
            item = JSON.parse(item);
        } catch (err) {
            item = '';
        }
    }
    if (isReturn) return item;
    if (isStringify) return JSON.stringify(parseJson(item, true), null, 4);
};

/**
 * 处理下载中文乱码
 * @date 2021-10-14
 * @param {any} response：需要处理的返回的数据
 * @param {any} fn=encodeURI
 * @param {any} splitType=';'
 * @returns {any}
 */
const downloadFilename = (response, fn = encodeURI, splitType = ';') => {
    if (!response.headers['content-disposition']) return response;
    const regxname = /^filename/;
    const cds = response.headers['content-disposition'];
    const cdsArr = cds.split(splitType);
    const str = cdsArr.find(item => regxname.test(item));
    const strIndex = cdsArr.findIndex(item => regxname.test(item));
    const filename = str.split('=');
    const newFileText = fn(filename[1]);

    cdsArr[strIndex] = `${filename[0]}=${newFileText}`;
    response.headers['content-disposition'] = cdsArr.join(splitType);
    return response;
};

/**
 * 描述：判断对像属性是否存在
 * @date 2021-10-14
 * @param {any} obj：判断对像
 * @param {any} key：弱要判断的属性
 * @returns {any} boolean
 */
const hasOwnProperty = (obj, key) => {
    // eslint-disable-next-line no-prototype-builtins
    return obj.hasOwnProperty(key);
};

/**
 * 描述： 注册组件
 * @date 2021-10-14
 * @param {any} fileList： 文件列表
 * @param {any} isWebpack=true： 是否是使用webpack打包生成
 * @param {any} list：引入的组件列表
 * @param {any} call：自定义路径分析
 * @param {any} type='/'： 默认分隔符
 * @param {any} typeIndex=1：获取第几个数据
 * @returns {any}
 */
const registerComponents = ({ fileList, isWebpack = true, list, call, type = '/', typeIndex = 1 }) => {
    const obj = {};
    const arr = isWebpack ? fileList.keys() : list;
    arr.map(item => {
        if (isWebpack) {
            const name = item.split(type)[typeIndex].replace(/\.\w+$/, '');
            const conf = fileList(item);
            obj[name] = conf.default || conf;
        } else {
            call(item, obj);
        }
    });
    return obj;
};

/**
 * 描述：还回指定字段对像
 * @date 2021-10-14
 * @param {any} row： 数据源（对像）
 * @param {any} rowKeyArr：需要新生成的字段
 * @returns {any}{}：新数据(对像)
 */
const recordFilter = (row, rowKeyArr) => {
    const obj = {};
    rowKeyArr.map(item => {
        if (hasOwnProperty(row, item)) obj[item] = row[item];
    });
    return obj;
};

/**
 * 描述：跟据字段生成字符串
 * @date 2021-10-14
 * @param {any} obj 数据源（对像）
 * @param {any} arr：需要新生成的字段
 * @param {any} type 分割符号
 * @returns {any}{}：字符串
 */
const mergerStr = ({ obj, arr, type = '' }) => {
    let str = '';
    arr.map(item => {
        if (obj[item]) str += obj[item].trim() + type;
    });
    return str;
};

/**
 * 将字符串首字母转小写
 * @date 2021-10-14
 * @param {any} letter
 * @returns {any}
 */
const firstStrLowerCase = (letter) => {
    const zh = /^[\u4E00-\u9FA5]+$/;
    if (zh.test(letter) || !letter) return letter;
    return letter.charAt(0).toLowerCase() + letter.slice(1);
};

/**
 * 描述: 替换数组字段
 * 1: 将数组字段转换成固定字段
 * 2：将数组字段转换成需要字段
 * @date 2021-10-14
 * @param {Array} {arr:源数组
 * @param {Object} obj={name:'name'：需要替换成name字段
 * @param {String} key:'key'：需要替换成key字段
 * @param {Array} children:'children'}：需要替换成children字段
 * @param {Object} transform={name:'name', 将obj对像中的字段转换成该对像中字段
 * @param {String} key:'key'
 * @param {Array} children:'children'}
 * @param {Boolean} isTransform=false}：是否完全清空，转换前对应字段
 * @param {Object} add}：只copy原有字段生成新字段，添加到数据中，并返回新数组
 *
 * @returns {Array}
 * const oldArr = [{ num: 10, name: 'wjl', age: 100, names: [{ name: '66', age: 100, names: [{ name: '66', age: 100, names: [{ num: 160, name: '66', age: 100 }] }] }] }, { name: 'chl', age: 1000, names: [{ name: '98', age: 10 }] }, { name: 'xd', age: 200, names: [{ name: '77', age: 55 }] }]
    console.log(replaceFields({ arr: oldArr, obj: { name: 'name', key: 'age', children: 'names' } }))
    copy:
    const copy = {name: 'dsc',age: 'num'}
    const arr = [{name: 'wjl',age: 100},{name: 'hl',age: 10}]
 */
const replaceFields = ({ arr, obj = { name: 'name', key: 'key', children: 'children' }, transform = { name: 'name', key: 'key', children: 'children' }, clear = false, copy, call, i }) => {
    const newTransform = { ...obj, ...transform };
    return arr.map(item => {
        const newI = i + 1;
        if (copy && !isEmptyObject(copy)) {
            Array.from(new Set(Object.keys(copy))).map(xtem => {
                if (!item[copy[xtem]]) item[copy[xtem]] = item[xtem];
            });
        } else {
            Object.keys(obj).map(otem => {
                if (item[obj[otem]]) item[newTransform[otem]] = item[obj[otem]];
                if (Array.isArray(item[obj[otem]])) replaceFields({ arr: item[transform[otem]], obj, transform, clear, copy, call, i: newI });
                // 完全清空转化前需要转化的字段
                if (clear) delete item[obj[otem]];
                // 按照指定字段转化时清空转化前的字段
                if (!clear && otem !== obj[otem]) delete item[obj[otem]];
            });
        }
        call && call(item, newI);
        return item;
    });
};
export default {
    _toString,
    isObject,
    isArray,
    isEmptyArray,
    isPlainObject,
    isEmptyObject,
    flattenDeep,
    recursiveFunc,
    doDelete,
    stringStartWith,
    createItem,
    createObject,
    parseJson,
    downloadFilename,
    hasOwnProperty,
    registerComponents,
    recordFilter,
    mergerStr,
    replaceFields,
    firstStrLowerCase,
    func
};