<template>
  <div class="detail">
    <div>
      <Head>
        <div slot="left">
          <i class="el-icon-arrow-left back" @click="goBack"></i>
        </div>
      </Head>
      <div
        class="head-blur"
        :style="'background-image:url('+img+title.image_path+');'+'background-size: 100% 4.6rem;filter: blur(0.15rem);'"
      ></div>
      <div class="head">
        <div class="img">
          <img :src="img+title.image_path" />
        </div>
        <div class="txt">
          <b>{{ title.name }}</b>
          <p>
            <span>商家配送</span> /
            <span>分钟送达</span> /
            <span>配送费约￥{{ title.float_delivery_fee }}</span>
          </p>
          <p>公告：{{ title.promotion_info }}</p>
        </div>
        <div class="arrow">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="nav">
        <router-link to="/detail/shoptypes" active-class="active" tag="p">商品</router-link>
        <router-link to="/detail/shoprecent" active-class="active" tag="p">评价</router-link>
      </div>
    </div>
    <div class="cont">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Head from "@/components/head/Head";
import { detailTop } from "@/utill/req";
export default {
  name: "Detail",
  components: { Head },
  data() {
    return {
      info: [],
      title: [],
      img: "//elm.cangdu.org/img/",
      id: ""
    };
  },
  methods: {
    goBack() {
      this.$router.push("/elmHome/" + this.id);
    },
    async data() {
      var id = localStorage.getItem("id");
      const res = await detailTop({}, id);
      console.log(res);
      this.title = res.data;
    }
  },
  created() {
    this.data();
  },
  mounted() {
    this.id = JSON.parse(localStorage.getItem("geohash")) || [];
  }
};
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.head[data-v-642e396f] {
  background: rgba(0, 0, 0, 0);
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 0.92rem;
}
.back {
  font-size: 0.4rem;
  color: #444;
}
.head-blur {
  float: left;
  width: 100%;
  height: 2.2rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
.head {
  width: 100%;
  height: 2.3rem;
  display: flex;
  padding: 0 0.2rem;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(173, 177, 194, 0.8);
  .img {
    width: 1.35rem;
    height: 1.35rem;
    border-radius: 0.05rem;
    overflow: hidden;
  }
}
.txt {
  margin-left: 0.2rem;
  width: 5.4rem;
  height: 1.4rem;
  padding: 0.1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  b {
    color: white;
    font-size: 0.36rem;
  }
  p {
    font-size: 0.24rem;
    color: white;
  }
}
.arrow {
  font-size: 0.4rem;
  color: white;
}
.nav {
  width: 100%;
  height: 1.05rem;
  background: white;
  display: flex;
  font-size: 0.3rem;
  color: #555;
  border-bottom: 0.01rem solid #e1e1e1;
  p {
    flex: 1;
    text-align: center;
    line-height: 1.05rem;
  }
}
.active {
  color: #3190e8;
  border-color: #3190e8;
  border-bottom: 0.03rem solid;
}
.cont {
  width: 100%;
  flex: 1;
  overflow: auto;
}
</style>