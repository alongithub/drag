import './style.less'

const {log, warn, dir} = console;

const n = 24;
const m = 10;

const ln = 4;
const lm = 10

const item = document.getElementById('item')
const wrapper = document.getElementById('wrapper') 
const view = document.getElementById('view')


function getStyle(attr) {
    if (this.currentStyle) {
        return this.currentStyle[attr]
    } else {
        return getComputedStyle(this)[attr]
    }
}

item.onmousedown = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    let hascreate = false;
    let left = parseInt(getStyle.bind(item)( 'left'), 10)
    let top = parseInt(getStyle.bind(item)('top'), 10);

    const leftlowitem = document.createElement('div')
    const rightlowitem = document.createElement('div')
    wrapper.onmousemove = (e) => {
        const moveX = e.clientX - x;
        const moveY = e.clientY - y;
        item.style.left = moveX + left + 'px'; 
        item.style.top = moveY + top + 'px'; 

        // 判断鼠标位置，确定高亮
        const cx = e.clientX
        const cy = e.clientY
        // 判断鼠标是否在画布内部

        const viewleft = view.offsetLeft
        const viewwidth = view.offsetWidth
        const viewtop = view.offsetTop
        const viewheight = view.offsetHeight

        const sw = viewwidth / n
        const sh = viewheight / m
        if (
            cx > view.offsetLeft
            && cy > view.offsetTop 
            && cx < (viewleft + viewwidth)
            && cy < (viewtop + viewheight)
        ) {
            // 计算 匹配位置
            // 计算鼠标相对画布的位置
            const vl = cx - viewleft;
            const vt = cy - viewtop;
            // 计算最佳匹配的格子
            const s = parseInt(vl / sw)

            const slt = s + ln > n ? n - ln : s;
            const srt = s + ln > n ? n : s + ln;
            console.log(slt + '~' + srt)
            // 创建一个高亮
            if (!hascreate) {
                hascreate = true; // 避免重复创建
                const highlight = document.createElement('div')
                highlight.className = 'hightlight';
                highlight.style.flex = ln;

                
                leftlowitem.className = 'lowlight';
                leftlowitem.style.flex = slt;

                
                rightlowitem.className = 'lowlight';
                rightlowitem.style.flex = n - ln - slt;
                view.append(leftlowitem)
                view.append(highlight)
                view.append(rightlowitem)
            } else {
                leftlowitem.style.flex = slt;
                rightlowitem.style.flex = n - ln - slt;
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




