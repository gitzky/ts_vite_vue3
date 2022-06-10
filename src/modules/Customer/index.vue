<script setup lang="ts">
var d = 0
var d_list: string = []
var t = setInterval(() => {
  d++
  document.querySelector("h1").innerHTML = '第' + d + '天'
  let aa = fn()
  document.querySelector("span").innerHTML += aa + ',  '

  d_list.push(aa)
  console.log(d_list)
  if (d >= 365) {
    clearInterval(t)
    var tt = 0
    d_list.forEach((n) => {
      tt += n
    })
    document.querySelector("h2").innerHTML = tt
    console.log("总计", tt)
  }

}, 1)
var fn = function () {
  var c_b = parseInt(20000 / 365 + 30)
  var p_n = parseInt(Math.random() * 70 + 30)
  var needlist = [{
    price: 3, // 利润：小3 中5 大10
    size: "small"
  }, {
    price: 5,
    size: "middle"
  }, {
    price: 10,
    size: "big"
  }]
  var customers = []
  var i = 0
  var total = 0
  while (i < p_n) {
    let n = Math.random() * 3
    let index = parseInt(n.toString())
    let need = needlist[index]
    total += need.price
    customers.push({
      name: `customer_${i + 1}`,
      need: need.size,
      price: need.price,
    })
    i++
  }
  return total - c_b
}
</script>

<template>
  <div class="container"></div>
</template>

<!--  
模拟经营系统 
选址 -> 建设 -> 生产 -> 出售 -> 售后 -> 结算
                |       |
                |<------|

经营品类 + 消费对象 + 投入成本 => 系统规模

B端<成本>
C端<流量 | 折损>

-->
