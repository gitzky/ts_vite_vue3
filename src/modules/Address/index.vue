<!-- 修建地址 -->
<script setup lang="ts">
const Address = {
  addr: '聚贤人家',
  addrType: '新小区',
  peopleTypes: '普通|年轻人多|中年人|老年人多',
  peopleNumber: '10000',
  price: '20000每年',
}

</script>

<template>
  <div class="container">
    <p>addr:{{ Address.addr }}</p>
    <p>addrType:{{ Address.addrType }}</p>
    <p>peopleTypes:{{ Address.peopleTypes }}</p>
    <p>peopleNumber:{{ Address.peopleNumber }}</p>
    <p>price:{{ Address.price }}</p>
  </div>
</template>