const fs = require('fs');
const chalk = require('chalk');

/**
 * 转义函数
 * @param {String} html 模板字符串
 * @return {String} 转义后的模板字符串
 */
function escape (html) {
    // 只转义了关键的字符，有更多字符可以转义的
    return String(html)
        .replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * 模板字符串预编译
 * @param {String} str 模板字符串
 * @return {Function} 编译函数
 */
function complie (str) {
    let tpl = str.replace(/<%=\s*([\s\S]+?)\s*%>/g, (match, code) => {
        // 字符转义
        return `\` + escape(${code}) + \``;
    }).replace(/<%-\s*([\s\S]+?)\s*%>/g, (match, code) => {
        // 字符不转义，不安全
        return `\` + ${code} + \``;
    }).replace(/<%\s*([\s\S]+?)\s*%>/g, (match, code) => {
        // if else for 等表达式
        return `\`; ${code} tpl += \``;
    }).replace(/`\n/g, '`')  // 去掉多余的尾空行，引入<%= %> 后可能出现的
    .replace(/\n`/g, '`');   // 去掉多余的前空行，引入<%= %> 前可能出现的
    
    // 万恶的 with 的用武之地
    tpl = `with(obj) {let tpl = \`${tpl}\`; return tpl;}`;
    // 万恶的 Function(like eval) 的用武之地
    return new Function('obj', tpl);
}

/**
 * 渲染数据
 * @param {Function} complieFn 编译函数
 * @param {String} data 传入的数据
 */
function render (complieFn, data) {
    return complieFn(data);
}

/**
 * 输出到控制台
 * @param {String} before 模板字符串
 * @param {String} after 输出字符串
 */
function print (before, after) {
    console.log(chalk.blue('<<<<<<< before render'));
    console.log(before);
    console.log(chalk.blue('======='));
    console.log(after);
    console.log(chalk.blue('>>>>>>> after render'));
}

/**
 * 入口函数
 */
function main () {
    const arguments = process.argv.slice(2);
    const filename = arguments[0];
    if (!filename) {
        console.log('Please type filename!\nSuch as `node render zph.html`');
        process.exit(0);
    }
    
    let rawStr = fs.readFileSync(filename, {encoding: 'utf-8'});
    let compliedStr = render(complie(rawStr), {username: 'zphhhhh'});
    
    print(rawStr, compliedStr);
}

main();
