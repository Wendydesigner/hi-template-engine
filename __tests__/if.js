const tpl = require('../engine');
describe('条件渲染', () => {
    test('hi-if/hi-else渲染ok',() => {
        const res = new tpl().compile('{%hi-if data.num>5%}<p>data.num大于5</p>{%hi-else%}<p>data.num小于5</p>{%/hi-if%}', {num:10});
        expect(res).toBe("<p>data.num大于5</p>")
    });
    test('hi-if/hi-elseif/hi-else渲染ok',() => {
        const res = new tpl().compile('{%hi-if data.num<5%}<p>data.num小于5</p>{%hi-elif data.num>15%}<p>data.num大于15</p>{%hi-else%}<p>data.num大于5，data.num小于15</p>{%/hi-if%}', {num:10});
        expect(res).toBe("<p>data.num大于5，data.num小于15</p>")
    });
})