<template>
  <div class="hotCity">
    <div class="title">热门城市</div>
    <div class="city">
      <router-link :to="'/city?id='+item.id" tag="p" v-for="(item,key) in info" :key="key">{{ item.name }}</router-link>
    </div>
  </div>
</template>

<script>
import { hotCity } from "@/utill/req";
export default {
  name: "hotCity",
  data() {
    return {
      info: []
    };
  },
  methods: {
    async data() {
      const res = await hotCity({});
      // console.log(res);
      this.info = res.data;
    }
  },
  created() {
    this.data();
  }
};
</script>

<style lang="scss" scoped>
.hotCity {
  width: 100%;
  height: 2.4rem;
  border-top: 0.03rem solid #e1e1e1;
  background: white;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
}
.title {
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.28rem;
  padding: 0 0.2rem;
  color: #444;
}
.city {
  width: 100%;
  flex: 1;
  font-size: 0.26rem;
  display: flex;
  flex-wrap: wrap;
  p {
    width: 25%;
    height: 50%;
    border: 0.01rem solid #e1e1e1;
    text-align: center;
    line-height: 0.8rem;
    color: #3190e8;
  }
  > p:nth-child(1) {
    border-left: none;
  }
  > p:nth-child(2) {
    border-left: none;
  }
  > p:nth-child(3) {
    border-left: none;
  }
  > p:nth-child(4) {
    border-left: none;
    border-right: none;
  }
  > p:nth-child(5) {
    border-top: none;
    border-left: none;
  }
  > p:nth-child(6) {
    border-left: none;
    border-top: none;
  }
  > p:nth-child(7) {
    border-left: none;
    border-top: none;
  }
  > p:nth-child(8) {
    border-left: none;
    border-right: none;
    border-top: none;
  }
}
</style>