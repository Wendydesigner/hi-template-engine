
const tpl = require('./engine.js');
const data = {
    name: 'LEARNING template',
    desc: '实现一款小型模版引擎',
    num: 12,
    list: ['vue', 'react', 'angular']
}
const text = document.getElementById('template').innerHTML;
document.getElementById('showResult').innerHTML = new tpl().compile(text,data);