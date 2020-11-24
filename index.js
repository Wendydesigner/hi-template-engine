export default class tpl {
    constructor(config) {
        this.signs = {
            dataSign: ['{{', '}}'],
            startSign: ['{%', '%}'],
            endSign: ['{/%', '%}']
        }
        this.syntax = {
            'hi-if': 'if',
            'hi-elif': 'else if',
            'hi-else': 'else',
            'foreach': 'for'
        }
        Object.keys(this.signs).forEach(key => {
            this.signs[key].splice(1, 0, '(.+?)')
            this.signs[key] = new RegExp(this.signs[key].join(''), 'g')
        })
    }
    _filter(str) {}
    _syntax(str) {}
    _compile(str, data) {
        const tpl = str.replace(this.signs.dataSign, )
    }
    compile(str, data) {
        try {
            this._compile(str, data);
        }catch(e){}
    }
}