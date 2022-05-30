# typescript + vite + vue3 构建一个标准化前端项目

## typescript 相关基础

一、基础数据类型

```js
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

## vue3.0

### 一、vue3.0 和 vue2.0区别

- 使用Api 有区别
  - vue2.0: 只能使用Options Api  ( 以“组件实例”的概念为中心（this指向实例）)
  - vue3.0: 可以使用Options API和Composition API  (核心是直接在函数范围内声明反应状态变量，并将来自多个函数的状态组合在一起以处理复杂性)
- 生命周期 有区别
  - vue2.0: beforeCreate->Created->beforeMount->onMounted->beforeUpdate->updated->beforeDestroy->Destroyed
  - vue3.0: beforeCreate->Created->beforeMount->onMounted->beforeUpdate->updated->beforeUnMount->unMounted
- 双向数据绑定原理 有区别
  - vue2.0: 利用Object.defineProperty()对数据劫持结合发布者订阅模式实现双向绑定
  - vue3.0: 利用Es6的Proxy() Api 对数据代理

### 二、构建一个基于 Composition API 的 vue3.0 实例

```html
  <!-- 模式一 -->
  <script setup>
    import {ref,reactive,onMounted} from "vue"
    const a = ref(0)
    const b = reactive({value:1})
    onMounted(()=>{
      console.log(a.value) // 0
      console.log(b.value) // 1
    })
  </script>
  <template>
    <!-- 模板中自动展开 响应数据 -->
    <h2>{{a}}</h2>
    <h2>{{b.value}}</h2>
  </template>

    <!-- 模式二 -->
  <script>
    import {ref,reactive,onMounted} from "vue"
    export default {
      setup(){
        const a = ref(0)
        const b = reactive({value:1})
        onMounted(()=>{
          console.log(a.value,b.value)
        })
        return {a,b}
      }
    }
  </script>
  <template>
    <!-- 模板中自动展开 响应数据 -->
    <h2>{{a}}</h2>
    <h2>{{b.value}}</h2>
  </template>
```

### 三、vue3.0 基于 Composition API 的组件

- 导入组件并使用

  ```html
    <!-- 模式1 -->
    
    <!-- 父组件 -->
    <script setup>
      import ChildTemp from "./ChildTemp.vue"
    </script>
    <template>
      <child-temp></child-temp>
    </template>
    <!-- 子组件 -->
    <script setup>
      import {ref} from "vue"
      const a = ref('hello word!')
    </script>
    <template>
      <!-- 模板中自动展开 响应数据 -->
      <h3>{{a}}</h3>
    </template>
    
    <!-- 模式2 -->
    
    <!-- 父组件 -->
    <script>
      import ChildTemp from "./ChildTemp.vue"
      export default{
        components:{
          ChildTemp
        }
      }
    </script>
    <template>
      <child-temp></child-temp>
    </template>
    <!-- 子组件 -->
    <script>
      import {ref} from "vue"
      const a = ref('hello word!')
    </script>
    <template>
      <!-- 模板中自动展开 响应数据 -->
      <h3>{{a}}</h3>
    </template>

  ```

- 组件传参（prop传参）
  - script setup 模式

    ```js
      // props传参的方式：
      // 数组式：
      const props = defineProps(['a','b','c'])
      // 对象式: 
      const props = defineProps({a:String,b:Number,c:Array,d:Boolean})
    ```

  - script 模式

    ```js
    export default{
      props:['a','b','c'],
      props:{a:String,b:Number,c:Array,d:Boolean},
      setup(props){
        console.log(props.a)
      }
    }
    ```
  - typescript 模式

    ``` html
    <script setup lang="ts">
      defineProps<{
        a?:String,
        b?:Number
      }>()
    </script>
    ```
  - props 传入校验
    
    ```js
      defineProps({
        a:String,
        b:{
          type:Number, // Srting,Number,Boolean,Array,Object,Date,Function,Symbol
          require:true
        },
        c:{
          type:Boolean,
          require:true,
          default:false
        },
        d:{
          type:Object,
          default(rawProps){
            return {message:'hellow'}
          }
        },
        e:{
          validator(value){
            return ['success','warning','danger'].includes(value)
          }
        },
        f:[Srting,Boolean,Number]
      })
    ```
- 组件传参（emit传参）

  - script setup 模式

  ```html
    <!-- 子组件 -->
    <script setup>
      // 数组式
      const emits = defineEmits(["submit"])
      // 对象式
      const emits = defineEmits({
        submit(payload){
          return true
        }
      })
      // 触发
      onMounted(){
        emits('submit',1234)
      }
    </script>
  ```
  - script 模式

  ```html
    <!-- 子组件 -->
    <script>
      // 数组式
      const emits = defineEmits(["submit"])
     
      export default{
        setup(props,ctx){
          ctx.emit('submit')
        },
        // 触发
        onMounted(){
          emits('submit',1234)
        }
      }
      
    </script>
  ```
  - typescript 模式
  
  ```html
    <script setup lang="ts">
      const emits = defineEmits<{
        (e:'change',id:'number'):void
        (e:'update',value:'string'):void
      }>()
    </script>

  ```

  - emit 传参校验
  
  ```html
    <script setup>
      const emits = defineEmits({
        click:null, // no validation
        submit:({email,password})=>{
          if(email&&password){
            return true
          } else {
            console.warning('Invalid submit event payload')
            return false
          }
        }

      })

      const submitForm = function (email,password) {
        emits('submit',{email,password })
      }
    </script>
  ```

- 组件传参（案例）
  ```html

    <template>
      <!-- 模板中自动展开 响应数据 -->
      <child-temp :a="a" @submit="submit"></child-temp>
    </template>

    <!-- 父组件 模式1 -->
    <script setup>
      import ChildTemp from "./ChildTemp.vue"
      import {ref} from "vue"
      const a = ref('hello word!')
      const submit = function(data){
        console.log(data)
      }
    </script>
     <!-- 父组件 模式2 -->
    <script>
      import ChildTemp from "./ChildTemp.vue"
      import {ref} from "vue"
      export default{
        components:{
          ChildTemp
        },
        setup(){
          const a = ref(123)\
          const submit = function(params){
            console.log(params)
          }
        }
      }
    </script>
    

    <template>
      <!-- 模板中自动展开props -->
      <h3>{{a}}</h3>
      <button @click="emit('submit','我是子组件的数据')">提交数据</button>
    </template>

    <!-- 子组件 模式1 -->
    <script setup>
      const props = defineProps(['a'])
      console.log(props.a)
      const emit = defineEmits(['submit'])
      onMounted(){

      }
    </script>
    <!-- 子组件 模式2 -->
    <script>
      export default {
        emits:['submit'],
        setup(props,ctx){
          ctx.emit('submit')
        }
      }
    </script>


  ```
  ```html
  <!-- 模式1案例 -->
  <script setup>
    import {ref} from "vue";
    const props = defineProps(["title"])
    const emits = defineEmits(["submit"])
    const a = ref(0)
    onMounted:{
      let timer = setInterval(()=>{
        a.value++;
        emits('submit',123)
        if (a.value>=100) {
          clearInterval(timer)
        }
      },1000)  
    }
  </script>	
  <template>
  <div>
    {{a}}
    <br/>
    {{title}}
    <br/>
    <button @click="$emit('submit')">
      按钮
    </button>
  </div>
  </template>
  
  ```
  ```html
  <!-- 模式2案例 -->
    <script>
      import {ref} from "vue";
      export default {
        props:["title"],
        emits:["submit"],
        setup(props,ctx) {
          let a = ref(0);
          onMounted:{
            let timer = setInterval(()=>{
              a.value++;
              ctx.emit('submit')
              if (a.value>=100) {
                clearInterval(timer)
              }
            },1000)
          }
          return {a}
        },
      }
    </script>	

    <template>
      <div>
        {{a}}
        {{title}}
        <button @click="$emit('submit')">
          按钮
        </button>
      </div>
    </template>
  ```
   

  
- 组件传参（slot传参,只能单向传递）

  ```html
    <!-- 父组件 -->
    <script setup>
      import ChildTemp from "./ChildTemp.vue"
      import {ref} from "vue"
      const a = ref('hello word!')
    </script>
    <template>
      <!-- 模板中自动展开 响应数据 -->
      <child-temp>{{a}}</child-temp>
    </template>
    <!-- 子组件 -->
    <template>
      <slot/>
    </template>
  ```













