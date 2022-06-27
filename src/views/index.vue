<template>
  <div>{{ a }}</div>
  <button @click="addNum">a++</button>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
const a = ref(0)
const b: string = false
const addNum = function () {
  a.value++
}



</script>