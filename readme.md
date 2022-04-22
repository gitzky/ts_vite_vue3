# typescript + vite + vue3 构建一个标准化前端项目
  
## typescript 相关基础

一、基础数据类型

``` js
// string  字符串类型  
var str:string = 'hello word'
// number  数字类型  
var num:number = 123
//boolean  布尔类型  
var bool:boolean = false
```

二、数组数据类型  元素类型之后加[]/或数组泛型

```js
// []  数字数组类型 
var arr:number[]= [1,2,3]  
//[]  字符串数组类型  
var arr:string[] = ["b","a","c"]
//Array<number>  泛型数字数组类型
var arr:Array<number> = [1,2,3]
//Array<string>  泛型字符串数组类型
var arr:Array<string> =  ["a",'b',"c"]
```

三、元组 数据类型  元素的类型进行约束，对应位置的类型必须一致

```js
  var arr:[string,number] = ["a",1]
```

四、枚举类型  enum  用于定义数值集合  

```js
enum Sex = {Male,female} let m:Sex = Sex.Male console.log(m) // 0 返回下标
enum Color = {Red=1,yellow=3,green}; var g:Color = Color.green; console.log(g) //4
```
  
五、any类型  表示任意值

```js
var a:any = 1; a = 2; a = false;  var arr:any = [1,3,4]; arr[1] = "a";
```

六、void  类型  表示一个方法没有返回值

```js
function fn():void{console.log('hello word')}
```

七、null 和 undefined 其他任何类型（包括void）的子类型，可以赋值给其他类型，赋值后类型变为null或undefined
注意：如果启用严格空校验（--strictNullChecks） null 和 undefined 只能赋值给void 或 本身对应的类型

```js
//不启用严格空校验
var a:string = "hello word"; a = null   // 不报错
//启用严格空校验（--strictNullChecks）
var a:number = 1; a = null // 报错
//启用严格空校验，但是用null或undefined 约束了就不报错 
var a:number | null | undefined  = 1; a = null // 不报错
```

八、never 类型 包括（null和undefined）的子类型；表示不会出现的值 ；表示声明never类型的变量只能被never类型所赋值。在函数中通
常表现为抛出异常或无法执行到终点（如无限循环）

 ```js
 var a:never; 
  var b:number; 
  a = 123 // 报错  
  a = (()=> {throw new Error('error')})() // 运行正常
  b = (()=>{throw new Error('error')})() // 运行正常  never 类型是任何类型的子类型
  function error(msg:string):never{
    throw new Error('error:',msg)
  }
  function loop():never {
    while(true){}
  }
```

## vite构建工具

一、 创建一个vite项目

```cmd
  yarn create vite   #默认创建
  yarn create vite app_name --template vue   #指定项目名称和项目类型（vue、vue-ts、react等）

  cd app_name  #进入根目录
  npm install  #安装依赖
  npm run dev | npx vite | npx vite --port 8080 指定启动app的端口  #运行app  
```

## vue3

### tsconfig.json 相关配置
