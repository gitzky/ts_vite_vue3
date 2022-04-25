<script setup lang="ts">
  import { ref } from "vue"
  import img from "/src/assets/logo.png"

  defineProps<{ msg: string }>()


  const count = ref(0)
  let a:number = 0
  let deepa = ref(a)
  setTimeout(()=>{
  },1000)

</script>

<template>
  <div>
    <img :src="img" alt="">
    <h1>{{ msg }}</h1>
    <h2 @click="deepa++">{{ deepa }}</h2>

    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>

    <p>See <code>README.md</code> for more information.</p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        Vite Docs
      </a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <button type="button" @click="count++">count is: {{ count }}</button>
  </div>
</template>

<style scoped lang="sass">
a
  color: #42b983

label
  margin: 0 0.5em
  font-weight: bold
code
  background-color: #eee
  padding: 2px 4px
  border-radius: 4px
  color: #304455
h1
  color: red
</style>
