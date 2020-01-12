export default class Timer {
   constructor(obj) {
      this.timer = null
      this.box = null
      this.width = 0
      this.height = 0
      this.opacityArr = ['1', '0.35', '0.15', '0.1', '0.05', '0.025']
      this.initData(obj)
      this.initUI()
      this.startTime()
   }

   initData(obj) {
      let defaultObj = {
         el: null
      }
      for (let key in defaultObj) {
         obj[key] && (defaultObj[key] = obj[key])
      }
      for (let key in defaultObj) {
         this[key] = defaultObj[key]
      }
      this.box = document.querySelector(this.el)
      this.width = parseInt(this.getStyle(this.box, 'width').replace(/(px)/, ''))
      this.height = parseInt(this.getStyle(this.box, 'height').replace(/(px)/, ''))
   }

   initUI() {
      this.box.style.display = 'flex'
      this.box.style.overflow = 'hidden'
      this.baseWidth = parseInt(this.width / 6)
      this.baseHeight = parseInt(this.height / 10)
      for (let i = 0; i < 6; i++) {
         let column = document.createElement('div');
         column.style.cssText = `width:${this.baseWidth}px;height:${this.height}px;display:inline-block;
         transition: all 500ms;`
         this.box.appendChild(column)
         for (let k = 0; k < 10; k++) {
            let baseCell = document.createElement('div')
            baseCell.style.cssText = `width:${this.baseWidth}px;height:${this.baseHeight}px;
            text-align:center;line-height:${this.baseHeight}px;color:#fff;font-size:${this.baseWidth}px;
            opacity:0;`
            baseCell.innerHTML = k
            column.appendChild(baseCell)
         }
      }
      this.columnArr = Array.from(this.box.children)
   }
   updataUI() {
      let currtime = this.formatTime()
      for (let i = 0; i < this.columnArr.length; i++) {
         let offset = -currtime[i] * this.baseHeight
         this.columnArr[i].style.transform = `translateY(${(offset + this.height / 2)}px)`;
         let children = Array.from(this.columnArr[i].children)
         for (let k = 0; k < children.length; k++) {
            let opacity = this.computedOpacity(currtime[i], k)
            children[k].style.opacity = `${opacity}`
         }
      }
   }
   //获取属性
   getStyle(obj, att) {
      return obj.currentStyle?obj.currentStyle[att]:window.getComputedStyle(obj, false)[att]
   }
   //当前时间 [H,H,m,m,s,s]
   formatTime() {
      return [...new Date().toTimeString().slice(0, 8).replace(/:/g, '')]
   }
   //透明度
   computedOpacity(curr, index) {
      return this.opacityArr[Math.abs(curr - index)] || 0

   }
   //销毁计时器
   destroyTime() {
      clearInterval(this.timer)
      this.timer = null
   }
   //开始时间计时
   startTime() {
      this.timer = setInterval(() => {
         this.updataUI()
      }, 200 + Math.E * 10)
   }
}
