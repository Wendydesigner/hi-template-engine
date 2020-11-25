const tpl = require('../engine');
describe('数据渲染', () => {
    test('普通数据渲染ok',() => {
        const res = new tpl().compile('<p>{{data.name}}</p>', {name:"hello world"});
        expect(res).toBe("<p>hello world</p>")
    });
    test('普通数据+过滤器lower渲染ok',() => {
        const res = new tpl().compile('<p>{{data.name|lower}}</p>', {name:"HELLO world"});
        expect(res).toBe("<p>hello world</p>")
    });
    test('普通数据+过滤器upper渲染ok',() => {
        const res = new tpl().compile('<p>{{data.name|upper}}</p>', {name:"Hello world"});
        expect(res).toBe("<p>HELLO WORLD</p>")
    });
})