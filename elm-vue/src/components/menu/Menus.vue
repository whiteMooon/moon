<template>
  <div class="menu">
    <div class="tit">
      <Head>
        <div slot="left">
          <i class="el-icon-arrow-left back" @click="goBack"></i>
        </div>
        <div slot="center">{{ title }}</div>
        <div slot="right"></div>
      </Head>
      <div class="nav">
        <el-button @click="flag = !flag">Click Me</el-button>
      </div>
      <div class="bg">
        <el-collapse-transition>
          <div v-show="flag">
            <div class="transition-box menus"></div>
          </div>
        </el-collapse-transition>
      </div>
      <transition name="el-fade-in-linear">
        <div v-show="flag" class="transition-box bg_blur"></div>
      </transition>
    </div>

    <!-- 内容 -->
    <div class="cont">
      <div class="title">
        <i class="el-icon-s-shop"></i>
        <p>附近商家</p>
      </div>
      <div class="shop" v-for="(item,key) in shop" :key="key">
        <div class="img">
          <img :src="'//elm.cangdu.org/img/'+item.image_path" alt />
        </div>
        <div class="artical">
          <div class="name">
            <div>
              <p>品牌</p>
              <p>{{ item.name }}</p>
            </div>
            <p v-for="(item,key) in item.supports" :key="key">{{ item.icon_name }}</p>
          </div>
          <div class="rate">
            <div>
              <p>
                <el-rate
                  v-model="item.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
              </p>
              <p>月售{{ item.rating_count }}</p>
            </div>
            <div>
              <p>{{ item.delivery_mode.text }}</p>
              <p>{{ item.supports[1].name }}</p>
            </div>
          </div>
          <div class="agent">
            <div>
              <p>￥{{ item.float_minimum_order_amount }}起送</p>
              <p>/ {{ item.piecewise_agent_fee.tips }}</p>
            </div>
            <div>
              <p>{{ item.distance }}</p>
              <p>/</p>
              <p class="color">{{ item.order_lead_time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/head/Head";
import { menuTypes } from "@/utill/req";
import { elmHomeShoies } from "@/utill/req";
export default {
  name: "Menus",
  components: { Head },
  data() {
    return {
      title: "",
      info: [],
      flag: false,
      shop: [],
      geohash: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async data() {
      this.geohash = localStorage.getItem("geohash");
      this.geohash.split();
      var arr = this.geohash.split(",");
      var latitude = arr[0].split('"')[1];
      var longitude = arr[1].split('"')[0];
      console.log(latitude);
      console.log(longitude);
      const res = await menuTypes({
        latitude: latitude,
        longitude: longitude
      });
      // console.log(res);
      this.info = res.data;
    },
    async shoies() {
      this.geohash = localStorage.getItem("geohash");
      this.geohash.split();
      var arr = this.geohash.split(",");
      var latitude = arr[0].split('"')[1];
      var longitude = arr[1].split('"')[0];
      const res = await elmHomeShoies({
        latitude: latitude,
        longitude: longitude,
        offset: 0,
        limit: 20
      });
      console.log(res);
      this.shop = res.data;
    }
  },
  created() {
    this.title = this.$route.query.name;
    this.data();
    this.shoies();
  }
};
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tit {
  width: 100%;
  height: auto;
}
.back {
  font-size: 0.4rem;
}
.nav {
  width: 100%;
  height: 0.75rem;
  border-bottom: 0.01rem solid #e1e1e1;
  background: white;
  display: flex;
}
.bg{
  position: absolute;
  width:100%;
  z-index: 999;
}
.bg_blur{
  width:100%;
  height: 100%;
  position: absolute;
  background:black;
  opacity: 0.5;
  z-index: 998;
}
.menus {
  margin-bottom: 10px;
  width: 100%;
  height: 7.2rem;
  background-color: white;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  margin-right: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.cont {
  width: 100%;
  flex: 1;
  background: white;
  overflow: auto;
}
.title {
  width: 100%;
  height: 0.7rem;
  background: white;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  font-size: 0.26rem;
  color: #666;
  i {
    margin-right: 0.15rem;
    font-size: 0.36rem;
  }
}
.shop {
  width: 100%;
  height: 2.1rem;
  border-bottom: 0.01rem solid #e1e1e1;
  display: flex;
  align-items: center;
  padding: 0 0.2rem;
}
.img {
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.2rem;
}
.artical {
  flex: 1;
  height: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name {
  width: 100%;
  display: flex;
  > div {
    width: 4rem;
    display: flex;
    font-size: 0.28rem;
    align-items: center;
    color: #222;
    font-weight: 600;
    p:nth-child(1) {
      width: 0.56rem;
      height: 0.3rem;
      border-radius: 0.03rem;
      background: #ffdf30;
      font-size: 0.24rem;
      line-height: 0.3rem;
      text-align: center;
      margin-right: 0.1rem;
    }
  }
  > p {
    flex: 1;
    font-size: 0.2rem;
    color: #666;
    text-align: right;
  }
}
.rate {
  width: 100%;
  font-size: 0.26rem;
  display: flex;
  align-items: center;
  > div:nth-child(1) {
    width: 4rem;
    display: flex;
    font-size: 0.22rem;
    color: #555;
  }
  > div:nth-child(2) {
    flex: 1;
    display: flex;
    font-size: 0.22rem;
    color: #555;
    font-size: 0.1rem;
    p:nth-child(1) {
      width: 0.9rem;
      height: 0.24rem;
      color: white;
      background: #2e8ee7;
      text-align: center;
      line-height: 0.24rem;
      border-radius: 0.05rem;
    }
    p:nth-child(2) {
      width: 0.8rem;
      height: 0.24rem;
      color: white;
      border: #2e8ee7 solid 0.01rem;
      text-align: center;
      color: #2e8ee7;
      line-height: 0.24rem;
      border-radius: 0.05rem;
      margin-left: 0.1rem;
    }
  }
}
.agent {
  display: flex;
  width: 100%;
  justify-content: space-between;
  > div {
    font-size: 0.16rem;
    color: #666;
    display: flex;
    .color {
      color: #2e8ee7;
    }
  }
}
</style>

<style lang="scss">
.el-rate {
  width: 1.4rem !important;
  .el-rate__item {
    width: 0.2rem !important;
    .el-rate__icon {
      font-size: 0.12rem !important;
      margin-right: 0px !important;
    }
  }
}
</style>