<template>
  <div class="allCity">
    <List v-for="(item,key) in info" :key="key" :index="item" :list="list"></List>
  </div>
</template>

<script>
import { allCity } from "@/utill/req";
import List from "@/components/home/List";
export default {
  name: "allCity",
  components:{ List },
  data() {
    return {
      info: [],
      list: []
    };
  },
  methods: {
    async data() {
      const res = await allCity({});
      console.log(res);
      this.info = Object.keys(res.data).sort();
      this.list = res.data
    }
  },
  created() {
    this.data();
  }
};
</script>

<style lang="scss" scoped>
.allCity {
  width: 100%;
  height: auto;
  margin-top: 0.2rem;
  border-top: 0.03rem solid #e1e1e1;
  border-bottom: 0.03rem solid #e1e1e1;
}
.title {
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  padding: 0 0.2rem;
  font-size: 0.28rem;
  background: white;
  border-bottom: 0.01rem solid #e1e1e1;
}
.list {
  list-style-type: none;
  width: 100%;
  background: white;
  height: auto;
}
</style>