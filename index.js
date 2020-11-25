
class tpl {
    constructor(config) {
        this.signs = {
            dataSign: ['{{', '}}'],
            startSign: ['{%', '%}'],
            endSign: ['{%/', '%}']
        }
        this.Filters = {
            upper: str =>`${str}.toUpperCase()`,
            lower: str => `${str}.toLowerCase()`
        } 
        Object.keys(this.signs).forEach(key => {
            this.signs[key].splice(1, 0, '(.+?)')
            this.signs[key] = new RegExp(this.signs[key].join(''), 'g')
        })
    }
    _filter(str) {
        const arr = str.split('|').map(s=>s.trim());
        const data = arr[0];
        const filters = arr.slice(1);
        const val = filters.reduce((total, item) => {
            if (!this.Filters[item]) {
                throw new Error(`没有${item}过滤器`)
                return;
            }
            return this.Filters[item](total);
        }, data);
        return `'+(${val})+'`;
    }
    _syntax(str) {
        const arr = str.trim().split(/\s+/)
        let exp = str;
        if (arr[0] === 'hi-if') {
            // if (xx) {
            exp = `if ( ${arr.slice(1).join(' ')} ) {`
            console.log(exp);
        } else if (arr[0] === 'hi-else') {
            // } else {
            exp = `} else {`
        } else if (arr[0] === 'hi-elif') {
            // } else if (xx) {
            exp = `} else if ( ${arr.slice(1).join(' ')} ) {`
        } else if (arr[0] === 'each') {
            // for (var index = 0, len = xx.length; index < len; index++) {
            exp = `for (var index = 0, len = ${arr[1]}.length; index < len; index++) {var item = ${arr[1]}[index]`
        }
        return exp;
    }
    _compile(str, data) {
        const tpl = str.replace(/[\r\n]/g, '').replace(this.signs.dataSign, (match, p)=> {
            const filter = p.indexOf('|');
            if(filter !== -1) {
                const res = this._filter(p)
                return res;
            } else {
                return `'+(${p})+'`;
            };
        })
        console.log(tpl);
        tpl = tpl.replace(this.signs.startSign, (match, p) => {
            const res = p.replace('&gt;', '>').replace('&lt;', '<');
            console.log(res);
            res = this._syntax(res);
            console.log(res);
            return `' `+ res + ` tpl += '`;
        }).replace( this.signs.endSign, () => {
            return '}';
        })
        console.log(tpl);
        return new Function('data', `var tpl='${tpl}';  return tpl;`)(data)
        // .replace(/\&\*\&(.*?)\&\*\&/g, (match, p) =>  String.fromCharCode(p));
        return new Function('data', `var tpl='${tpl}';  return tpl;`)(data)
    }
    compile(str, data) {
        try {
           return this._compile(str, data);
        }catch(e){}
    }
}
export default tpl;