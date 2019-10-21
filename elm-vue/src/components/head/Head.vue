<template>
  <div class="head">
    <slot name="left" class="left"></slot>
    <slot name="center" class="center"></slot>
    <slot name="right" class="right"></slot>
  </div>
</template>

<script>
export default {
  name: "Head"
};
</script>

<style lang="scss" scoped>
.head{
  display: flex;
  width:100%;
  height: 0.92rem;
  background: #3190e8;
  align-items: center;
  padding:0 0.2rem;
  justify-content: space-between;
  font-size: 0.36rem;
  font-weight: 500;
  color:white;
}
.right{
  font-size: 0.28rem;
}
</style>