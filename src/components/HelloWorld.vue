<script setup lang="ts">
import { ref } from "vue"
import img from "/src/assets/logo.png"
defineProps<{ msg: string }>()
let a: number = 0
let deepa = ref(a)

let x: string | number = 1
let count = ref(x)

</script>

<template>
  <div>
    <img :src="img" alt="">
    <h1>{{ msg }}</h1>

    <h2 @click="deepa++">{{ deepa }}</h2>

    <h2>{{ (x as number).toFixed(2) }}</h2>
    <button type="button" @click="count++">count is: {{ count }}</button>
  </div>
</template>

<style scoped lang="less">
a {
  color: #42b983
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

h1 {
  color: red
}
</style>
