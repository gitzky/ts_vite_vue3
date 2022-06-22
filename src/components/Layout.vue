<template>
  <div>
    <HelloWorldVue msg="hello" />
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import HelloWorldVue from './HelloWorld.vue';

</script>