import './style.less'

const {log, warn, dir} = console;

const n = 24;
const m = 21;

const ln = 4;
const lm = 4;


let index = 1;

const item = document.getElementById('item')
const wrapper = document.getElementById('wrapper') 
const view = document.getElementById('view_wrapper')

let target = null;
const delete_btn = document.getElementById('delete_btn')
delete_btn.onclick = () => {
    if (target) 
    view.removeChild(target);
    target = null;
}

function getStyle(attr) {
    if (this.currentStyle) {
        return this.currentStyle[attr]
    } else {
        return getComputedStyle(this)[attr]
    }
}



// view.onclick = (e) => {
//     const el = e.target;
//     if(el.className === 'hightlight') {
//         console.log(el)
//         target = el;
//     }
// }

view.onmousedown = (e) => {
    const el = e.target;
    if(el.className === 'hightlight') {
        target = el;

    }
}

item.onmousedown = (e) => {
    const ln = parseInt(document.getElementById('ln').value) || 4;
    const lm = parseInt(document.getElementById('lm').value) || 4;
    let x = e.clientX;
    let y = e.clientY;
    let hascreate = false;
    let left = parseInt(getStyle.bind(item)( 'left'), 10)
    let top = parseInt(getStyle.bind(item)('top'), 10);
    const highlight = document.createElement('div')
    
    wrapper.onmousemove = (e) => {
        const moveX = e.clientX - x;
        const moveY = e.clientY - y;
        item.style.left = moveX + left + 'px'; 
        item.style.top = moveY + top + 'px'; 

        // 判断鼠标位置，确定高亮
        const cx = e.clientX
        const cy = e.clientY
        // 判断鼠标是否在画布内部

        // view.offsetLeft 和 clientLeft 获取的是相对父元素的位置
        const viewleft = view.getBoundingClientRect().left
        const viewwidth = view.offsetWidth
        const viewtop = view.getBoundingClientRect().top
        const viewheight = view.offsetHeight

        const sw = viewwidth / n // 单个格子宽度
        const sh = viewheight / m // 单个格子高度
        if (
            cx > viewleft
            && cy > viewtop
            && cx < (viewleft + viewwidth)
            && cy < (viewtop + viewheight)
        ) {
            // 计算 匹配位置
            // 计算鼠标相对画布的位置
            const vl = cx - viewleft; // 鼠标相对画布远点的x偏移量
            const vt = cy - viewtop; // 鼠标相对于画布原点的y偏移量
            // 计算最佳匹配的格子
            const tx = parseInt(vl / sw) 
            const ty = parseInt(vt / sh)

            const sx = tx + ln > n ? n - ln : tx;
            const sy = ty + lm > m ? m - lm : ty;
            // console.log(sx + '~' + sy)
            // 创建一个高亮
            if (!hascreate) {
                hascreate = true; // 避免重复创建
                target = highlight
                highlight.className = 'hightlight';
                // warn(sx)
                highlight.style.width = ln * sw + 'px';
                highlight.style.height = lm * sh + 'px';
                highlight.style.left = sx * sw + 'px';
                highlight.style.top = sy * sh + 'px';
                highlight.style.zIndex = index;
                highlight.innerHTML = index
                highlight.style.background = `rgb(${Math.random()*255},${Math.random()*255}, ${Math.random()*255})`
                index ++;
                highlight.dataset.ln = ln;
                highlight.dataset.lm = lm;
                highlight.dataset.sx = sx;
                highlight.dataset.sy = sy;
                view.append(highlight)


            } else {
                highlight.style.left = sx * sw + 'px';
                highlight.style.top = sy * sh + 'px';
                highlight.dataset.sx = sx;
                highlight.dataset.sy = sy;
            }
            
        }

    }

    wrapper.onmouseup = (e) => {
        log('up')
        wrapper.onmousemove = null
        item.style.left = left + 'px'; 
        item.style.top = top + 'px'; 
    }
    
    wrapper.onmouseout = (e) => {
        log('out')
        item.style.left = left + 'px'; 
        item.style.top = top + 'px'; 
    }
}




