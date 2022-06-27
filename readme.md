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

九、泛型 < T >

- 泛型是什么

```js
  //示例：
  function identity<T>(value:T):T => value ? value : 0
  const num1:number = identity<Number>(1)  // 1

  // 示例2：
  function identity<T,U>(value:T,msg:U):T {
    console.log(msg)    
    return !!value
  }
  identity<Number,String>(123,'hello 123')
  // 示例3：
  function identity<T,U>(value:T,msg:U) : [T,U] {
    console.log([value,msg])
    return [value,msg]
  }
  identity(1,'hello')
```

- 泛型接口

```js
  interface Ide<V,M> {
    value:V,
    msg:M
  }
  function identity<T,U>(value:T,msg:U) : Ide<T,U> {
    console.log(value+":"+typeof(value))
    console.log(msg+":"+typeof(msg))
    let res:Ide<T,U> = {
      value,
      msg
    }
    return res;
  }
  console.log( identity(1,"hello") ) 
  /*
    1:Number
    hello:String
    {value:1,msg:'hello'}
  */
```


## vite构建工具

一、 创建一个vite项目

```cmd
yarn create vite   #默认创建
yarn create vite app_name --template vue-ts   #指定项目名称和项目类型（vue、vue-ts、react等）

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

#### 导入组件并使用

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

#### 组件传参（prop传参）

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

#### 组件传参（emit传参）

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

#### 组件传参（案例）

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
    onMounted:{

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

#### 组件传参（slot传参,只能单向传递）

- 简单插槽使用

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

- 命名插槽函数

  ```js
  function createSlot(slots){
    return (
      `<div class="container">
        <header>${slots.header}</header>
        <main>${slots.default}</main>
        <footer>${slots.footer}</footer>
      </div>`
    )
  }

  createSlot({
    header:'...',
    default:'...',
    footer:'...'
  })
  
  ```

- 命名插槽的使用

  ```html

  <!-- 
    v-slot:header 等同于 #header

    parent template                    child template
    <father-component>
      <template #header>               <div class="child">
        ...                - - - - >     <slot name="header"></slot>
      </template>                      </div>

      #default表示默认（什么都不加也表示默认比如：<template>...</template）
      <template #default>             <div class="default_slot">
        ...                             <slot/>
      </template>                     </div>
    </father-component>
  -->
  ```

- 插槽的数据传递

  - 子组件向父组件传递数据（普通插槽）

    ```html
    <!-- 父组件 -->
    <script setup>
      import ChildTemp from "./ChildTemp.vue"
    </script>
    <template>

      <!-- 普通写法 -->
      <child-temp v-slot="slotProps">
        {{slotProps.text}}
        {{slotProps.count}}
      </child-temp>

      <!-- 结构赋值写法 -->
      <child-temp v-slot="{text,count}">
        {{ text }}
        {{ count }}
      </child-temp>

    </template>
    
    <!-- 子组件 -->
    <script setup>
      import {ref} from "vue"
      const text = ref("hellow world!")
      const count = ref(1);
      setInterval(()=>{
        count.value++
      },1000)
    </script>
    <template>

      <!-- 普通写法 -->
      <slot :text="text" :count="count" />

      <!-- 使用v-bind 写法-->
      <slot  v-bind="{text.count}" />

    </template>
    ```

  - 子组件向父组件传递数据（命名插槽）

    ```html
    <!-- 父组件 -->
    <script setup>
      import ChildTemp from "./ChildTemp.vue"
    </script>
    <template>
      <child-temp v-slot:content="slotProps">
        <!-- {{ slotProps.name }}  不能解析，name是保留字段无法传递 -->
        {{ slotProps.text }}
        {{ slotProps.count }}
      </child-temp>
    </template>
    
    <!-- 子组件 -->
    <script setup>
      import {ref} from "vue"
      const text = ref("hellow world!")
      const count = ref(1);
      setInterval(()=>{
        count.value++
      },1000)
    </script>
    <template>
      <slot name="content" :text="text" :count="count" />
      <!-- 使用v-bind -->
      <slot name="content" v-bind="{text.count}" />
    </template>
    ```

  - 子组件向父组件传递数据（默认插槽）

    ```html
    <!-- parent -->
    <script setup>
      import {ref,onMonted} from "vue"
      import "Temp" from "./Temp.vue"
    </script>
    <template>
      <Temp v-slot="{x,y}">
        x:{{x}}
        y:{{y}}
      </Temp>
    </template>
  
    <!-- chilld -->
    <script setup>
      import {ref} from "vue"
      const x = ref(0)
      const y = ref(0)
      onMounted:{
        window.addEventListener('mousemove',(e)=>{
          x.value = e.pageX
          y.value = e.pageY
        })
      }
      /*
        这种模式需要引入 onMounted 
        import {onMounted} from "vue"
        onMounted(()=>{
          window.addEventListener('mousemove',(e)=>{
            x.value = e.pageX
            y.value = e.pageY
          })
        })
      */
    </script>
    <template>
      <div>
        <slot v-bind="{x,y}" />
      </div>
    </template>
    ```
#### 组件传参provide(key,value) inject(key,defaultValue) 

- provide(key,value) 祖先组件传参<接收两个参数，key和value>  
- inject(key,defaultValue)  祖先组件传参<接收两个参数，key 和 defaultValue默认参数>

- 使用示例

  ```html
  <!-- 祖先组件 -->

  <!-- setup模式 -->
  <script setup>
    import {ref,provide} from "vue"
    const msg = ref('hello')
    provide(/* key */"msg",/*value*/ msg)
  </script>

  <!-- export default 模式 -->
  <script>
    import {ref,provide} from "vue"
    export default{
      setup(){
        provide(/* key */"msg",/*value*/ "hello")
      }
    }
  </script>

  <!-- 孙子、重孙子组件 -->
  <!-- setup模式 -->
  <script setup>
    import {ref,inject} from "vue"
    const msg = inject('msg','default value')
  </script>
  <!-- export default 模式 -->
  <script>
    import {ref,inject} from "vue"
    export default{
      setup(){
        const msg = inject('msg')
        return msg
      }
    }
  </script>

  ```

- 响应式使用

  ```html
  <script setup>
    import temp from "./temp.vue"
    import {ref,provide} from "vue"
    const a = ref(1)
    const updateA = function(params) {
      a.value = params
    }
    provide("getA",{a,updateA})
  </script>
  <template>
    <temp></temp>
    <div>
      我是父组件的值：{{a}}
    </div>
    <button @click="updateA(++a)">
      父组件更新++
    </button>
  </template>
  <!-- 孙子引用 -->
  <script setup>
    import {ref,inject} from "vue"
    const {a,updateA} = inject("getA")
  </script>
  <template>
    <div>
      我是子组件的值:{{a}}
    </div>
    <button @click="updateA(a*2)">
      子组件更新2x
    </button>
  </template>
  ```

- readonly()函数 祖父组件的值只读
  
  ```html
  <script setup>
    import {ref,provide,readonly} from "vue"
    conts a = ref(1)
    provide('a',readonly(a))// 孙子组件只能只读a的值
  </script> 
  ```

- 使用Symbol()创建唯一provide·key
  
  ```js
    //  keys.js 
    export const key_1 = Symbol()
    export const key_2 = Symbol()
  ```

  ```html
  <script setip>
    import {key_1} from "./keys.js"
    import {provide} from "vue"
    provide(key_1,"hello")
  </script>

  <!-- 孙子组件 -->
  <script setip>
    import {key_1} from "./keys.js"
    import {inject} from "vue"
    const key = inject(key_1)
  </script>

  ```

#### 异步组件，使用defineAsyncComponent()函数

  ```js
  // 基础使用
  import {defineAsyncComponent} from "vue"
  const pageA = defineAsyncComponent(()=>{
    import('./pageA.vue')
  })

  //高级使用
  const Foo = defineAsyncComponent({
    loader:()=>import('./Foo.vue'),
    loadingComponent:loadingComponent, // loading组件 
    delay:200,// 延迟200毫秒加载loading
    ErrorComponent:ErrorComponent,//加载失败组件
    timeout:3000 //请求超过3000ms失败显示错误组件， 默认infinity
  })

  ```

#### 内置组件

- transition过渡
  
  ```html
  <!-- 触发条件v-if 或 v-show -->
  <Transition>
    <p v-if="show">hello</p>
  </Transition>
  
  <style lang="less">
    .v-enter-active,
    .v-leave-active{
      transition:opacity 0.5 ease;
    }
    .v-enter-from,
    .v-leave-to{
      opacity:0
    }
  </style>

  ```

  - transition过渡的6个阶段
    - v-enter-from 进入的起始状态
    - v-enter-active 进入的活动状态
    - v-enter-to 进入的结束状态
    - v-leave-from 退出的起始状态
    - v-leave-active 退出的活动状态
    - v-leave-to 退出的结束状态

  - 与Animate.css结合使用
  
  ```html
  <Transition
    name="custom-class"
    enter-active-class="animate_animated animate_tada"
    leave-active-class="animate_animated animate_bounceOut"
  >
    <p v-if="show">hello</p>
  </Transition>
  ```

- TransitionGroup组件
- KeepAlive组件
- Teleport组件

### vue3.0组合使用typescript

#### 使用准备

- IDE支持并设置 推荐使用vsCode并安装volar扩展（使用volar需要禁用vetur）
- 配置tsconfig.json

```json
{
  "compilerOptions":{
    "isolatedModules":true,//Vite使用esbuild来转译typescript
    "strict":true,//使用optionsApi 设置为true
  }
}
```

- 接管模式（vsCode+volar）禁用vetur ctrl+shift+p ->输入built ->选择>extensions ->输入typescript ->禁用工作区 然后重启编辑器打开ts或vue文件时将启用接管模式

#### 一般使用说明

defineComponent() 为了让typescript正确推断组件选项中的类型，我们需要定义组件

  ```html
  <!-- options Api -->
  <script>
    import {defineComponent} from "vue"
    export default defineComponent({
      props:['a'],
      data(){
        return {
          count:1
        }
      },
      created(){

      }
    })
  </script>

  <!-- composition Api -->
  <script>
    import {defineComponent} from "vue"
    export default defineComponent({
      props:{msg:String},
      setup(props){
        props.msg //
      }
    })
  </script>
  ```

  ```html
  <!-- SFC optionsApi -->
  <script  lang="ts">
    import {defineComponent} from "vue"
    export default defineComponent({
      data(){
        return {
          count:1
        }
      }
    })
  </script>
  <template>
    {{count.toFixed(2)}} 
  </template>

  <!-- SFC compositionApi -->
  <script setup lang="ts">
    import {ref} from "vue"
    let count: string | number = ref("1")
  </script>
  <template>
     {{count.toFixed(2)}} <!-- 报错 ,因为count是一个字符串类型 -->
     <!-- {{(count as number).toFixed(2)}} 转换类型可以正常运行 -->
  </template>

  ```

#### compositionApi typescript

- typescript props

```html
<!-- 运行时声明 -->
<script setup lang="ts">
  const props = defineProps({
    foo:{type:String,require:true},
    bar:Number
  })
</script>
<!-- 基于类型的声明 -->
<script setup lang="ts">
  const props = defineProps<{
    foo: srting,
    bar?: number // 可选
  }>()
</script>
```

```html
<!-- props.vue  setup模式 -->
<script setup lang="ts">
  interface Props {
    foo:string,
    bar?:number
  }
  const props = defineProps<Props>()
  // 默认值
  const { foo, bar = 100 } = defineProps<Props>()

</script>
<!-- props.vue  不使用setup模式 -->
<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({
  props:{
    msg:String
  },
  setup(props){
    props.msg // ...
  }
})

</script>

```

- typescript emits

```html
<script setup lang="ts">
// runtime
const emit = defineEmits(['change', 'update'])

// type-based
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```
