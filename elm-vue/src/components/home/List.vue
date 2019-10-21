<template>
  <div>
    <div class="nav">
      <p>{{ this.index }}</p>
      <p>(按字母排序)</p>
    </div>
    <ul class="city">
        <City v-for="(item,key) in msg" :key="key" :names="item.name" :id="item.id"></City>
    </ul>
  </div>
</template>

<script>
import City from '@/components/home/City'
export default {
  name: "List",
  components:{ City },
  props: ["index", "list"],
  data() {
      return {
          msg:[]
      }
  },
  created() {
      this.msg = this.list[this.index]
  },
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  padding: 0 0.2rem;
  font-size: 0.28rem;
  background: white;
  display: flex;
  border-bottom: 0.01rem solid #e1e1e1;
  >p:nth-child(2){
      color:#666;
      font-size: 0.22rem;
      margin-left:0.2rem;
  }
}
.city{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    background:white;
    margin-bottom:0.2rem;
}
.city>li{
    width:25%;
    height:0.8rem;
    border:0.01rem solid gainsboro;
    font-size: 0.28rem;
    color:#555;
    text-align: center;
    line-height: 0.8rem;
    box-sizing: border-box;
    border-left:none;
    border-top:none;
}
</style>