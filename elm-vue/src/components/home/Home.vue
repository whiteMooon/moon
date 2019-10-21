<template>
  <div class="home">
    <Head>
      <div slot="left">ele.me</div>
      <div slot="right"><span>登录</span> | <span>注册</span></div>
    </Head>
    <div class="cont">
        <nowCity></nowCity>
        <hotCity></hotCity>
        <allCity></allCity>
    </div>
  </div>
</template>

<script>
import Head from "@/components/head/Head";
import nowCity from "@/components/home/nowCity";
import hotCity from "@/components/home/hotCity";
import allCity from "@/components/home/allCity";
export default {
  name: "Home",
  components: { Head,nowCity,hotCity,allCity }
};
</script>

<style lang="scss" scoped>
.home{
    width:100%;
    height: 100%;
    background:#f6f6f6;
    display: flex;
    flex-direction: column;
}
.cont{
    flex:1;
    overflow: auto;
    width: 100%;
}
</style>