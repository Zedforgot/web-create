 //网页里塞html标签
 class htmlCreate {
    constructor(children) {
      this.n=0//元素为对象或者单个元素下自增，取n值给每个元素做标记
      this[arguments[1]]=arguments[1]//给最外层元素arguments[1]赋予属性，在appendElement方法中被读取
      this.html(children||[],arguments[1])//给类赋值属性 arguments[1]代表最外层元素
    }
    html(children) {
      for (let i = 0; i < children.length; i++) {
        if (Object.prototype.toString.call(children[i])==='[object Object]') {
          this.n++
          //将文本插入元素中
          for(let key in children[i]){
          if(key.split('|')[0]==='img'){//图片情况下
            this[this.n+JSON.stringify(children[i])]= document.createElement(key.split('|')[0])//属性为对应的img元素
            this[this.n+JSON.stringify(children[i])].src=children[i][key]//children[i][key]为img链接
            this.appendElement(this.n+JSON.stringify(children[i]),arguments[1])
          }else if(key.split('|')[0]==='input'){//输入框情况下
            this[this.n+JSON.stringify(children[i])]= document.createElement(key.split('|')[0])//属性为对应的input元素
            this[this.n+JSON.stringify(children[i])].type=children[i][key].split('|')[0]//children[i][key]为input类型
            this[this.n+JSON.stringify(children[i])].value=children[i][key].split('|')[1]||''//children[i][key]为input value
            this[this.n+JSON.stringify(children[i])].placeholder=children[i][key].split('|')[2]||''//children[i][key]为input placehodel
            this.appendElement(this.n+JSON.stringify(children[i]),arguments[1])
          }else{//非图片与input
            this[this.n+JSON.stringify(children[i])]= document.createElement(key.split('|')[0])//属性为对应的元素
            this.appendElement(this.n+JSON.stringify(children[i]),arguments[1],children[i][key])//children[i][key]文本放入元素中
          }
            }
        } else if(Object.prototype.toString.call(children[i])==='[object Array]'){
          // 元素内含嵌套,数组情况下,将数组中元素放入前一个元素内
           this.html(children[i],typeof children[i-1]==='object'?this.n+JSON.stringify(children[i-1]):this.n+children[i-1])
        }else{// 单个元素,非数组情况下
          this.n++
  this[this.n+children[i]] = document.createElement(children[i].split('|')[0])//属性为对应的标签
          // this.appendElement(children[i],arguments[1])//考虑到需要放入非body内元素中
          this.appendElement(this.n+children[i],arguments[1])//用split切分取html标签方便给className
        }
      }
    }
    appendElement(child, el,text) {
      if(text){
          this[child].innerHTML=text
      }
      if(el){
        this[el].appendChild(this[child])//放入el元素中
      }else{
        document.body.appendChild(this[child])//放入body中
      }
    }
  }
  
    //对应html标签加特定的class类名
  class classNameCreate extends htmlCreate{
    constructor(props) {
      super(props,arguments[1])
      this.cssClassName(this.filterCssName())
    }
    filterCssName(){
      //1过滤n属性
      //2筛选出有|符号的dom元素
      //3过滤掉只有文本内容中有|符号的dom元素
      return Object.keys(this).filter(item=>item!='n'&&item.split(':')[0].indexOf('|')!=-1)
    }
    cssClassName(children){
      console.log(children)
      children.forEach((item) => {
        if(item.split('|')[1]!==''){//如果出现||说明没有className只有ID
          if(item.indexOf('{')==1){//如果元素第二个字符为大括号的话，那么拿到key，给key（dom元素）赋值clss类名
            //拆封元素拿到元素中|符号之后的字符串为元素class类名
  this[item].className=item.split('|')[1].split('"')[0]
          }else{//如果元素无大括号是普通字符串的话，那么拿到|之后字符串，给dom元素赋值clss类名
  
            this[item].className=item.split('|')[1]
        }
          }
        });
    }
  }
    //对应html标签加特定的id名
  class idNameCreate extends classNameCreate{
    constructor(props,dom){
      super(props,dom)
      this.cssIdName(this.filterCssName())
    }
    cssIdName(children){
      children=children.filter(item=>item.replace('|','').split(':')[0].indexOf('|')!=-1)//筛选出有ID的元素
      children.forEach(item=>{
        if(item.indexOf('{')==1){//如果元素第二字符为大括号的话，那么拿到key，给key（dom元素）赋值id名
  this[item].id=item.split('|')[2].split('"')[0]
        }else{//如果元素无大括号是普通字符串的话，那么拿到|之后字符串，给dom元素赋值id类名
            this[item].id=item.split('|')[2]
          }
      })
    }
  }
    class cssCreate{
  constructor(props){
    this.props=props
     
  }
    }
    // class WebCreate extends idNameCreate{
    //   constructor(props,dom){
    //     super(props,dom)
    //   }
    // }