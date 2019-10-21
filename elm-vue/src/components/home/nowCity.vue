<template>
  <div class="nowCity">
    <div class="top_title">
      <p>当前定位城市：</p>
      <p>定位不准时，请在城市列表中选择</p>
    </div>
    <div class="city">
      <router-link :to="'/city?id='+info.id" tag="p">{{ info.name }}</router-link>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import { nowCity } from "@/utill/req";
export default {
  name: "nowCity",
  data() {
    return {
      info: []
    };
  },
  methods: {
    async data() {
      const res = await nowCity({});
      console.log(res);
      this.info = res.data;
    }
  },
  created() {
    this.data();
  }
};
</script>

<style lang="scss" scoped>
.nowCity {
  width: 100%;
  height: 1.7rem;
  background: white;
  border-bottom: 0.03rem solid #e1e1e1;
  display: flex;
  flex-direction: column;
}
.top_title {
  width: 100%;
  height: 0.88rem;
  border-bottom: 0.01rem solid #e1e1e1;
  display: flex;
  align-items: center;
  font-size: 0.28rem;
  color: #444;
  justify-content: space-between;
  padding: 0 0.2rem;
  > p:nth-child(2) {
    font-size: 0.22rem;
    color: #666;
  }
}
.city {
  width: 100%;
  flex: 1;
  font-size: 0.36rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #3190e8;
  p{
    width:100%;
  }
  i {
    font-size: 0.36rem;
    color: #444;
  }
}
</style>