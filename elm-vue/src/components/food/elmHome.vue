<template>
  <div class="elmHome">
    <Head>
      <div slot="left" class="left">
        <i class="el-icon-search"></i>
      </div>
      <div slot="center" class="center">{{ adrs.name }}</div>
      <div slot="right" class="right">
        <span>登录</span> |
        <span>注册</span>
      </div>
    </Head>

    <div class="content">
      <!-- 菜单 -->
      <div class="menu">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,key) in info" :key="key">
            <router-link :to="'/menu?name='+item.title" tag="div">
              <div class="menu_cont">
                <div>
                  <img :src="'https://fuss10.elemecdn.com/'+item.image_url" alt />
                </div>
                <p>{{ item.title }}</p>
              </div>
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

      <!-- 内容 -->
      <div class="cont">
        <div class="title">
          <i class="el-icon-s-shop"></i>
          <p>附近商家</p>
        </div>
        <router-link :to="'/detail?id='+item.id" v-for="(item,key) in shop" :key="key" tag="div">
          <div @click="geohash(item.id)" class="shop">
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
        </router-link>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from "@/components/head/Head";
import Foot from "@/components/foot/Foot";
import { elmHomeAds } from "@/utill/req";
import { elmHomeMenu } from "@/utill/req";
import { elmHomeShoies } from "@/utill/req";
export default {
  name: "elmHome",
  components: { Head, Foot },
  data() {
    return {
      info: [],
      adrs: [],
      shop: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true // 允许点击小圆点跳转
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        },
        loop: true,
        slidesPerView: 4,
        slidesPerGroup: 8,
        slidesPerColumn: 2,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  methods: {
    geohash(id) {
      var geohash = this.$route.params.id;
      console.log(id);
      localStorage.setItem("geohash", JSON.stringify(geohash));
      localStorage.setItem("id", JSON.stringify(id));
    },
    async ads() {
      var id = this.$route.params.id;
      const res = await elmHomeAds({}, id);
      // console.log(res);
      this.adrs = res.data;
    },
    async menu() {
      var id = this.$route.params.id;
      const res = await elmHomeMenu({
        geohash: id
      });
      // console.log(res);
      this.info = res.data;
    },
    async shoies() {
      var id = this.$route.params.id;
      var arr = id.split(",");
      var latitude = arr[0];
      var longitude = arr[1];
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
    this.ads();
    this.menu();
    this.shoies();
  }
};
</script>

<style lang="scss" scoped>
.elmHome {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.left,
.right {
  flex: 1;
}
.center {
  flex: 2;
}
.center {
  text-align: center;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
.content {
  width: 100%;
  flex: 1;
  overflow: auto;
}
.menu {
  width: 100%;
  height: 4.05rem;
  background: white;
  border-bottom: 0.02rem solid #e1e1e1;
  .swiper-container {
    width: 100%;
    height: 90%;
  }
}
.swiper-slide {
  width: 100%;
  height: 40% !important;
}
.menu_cont {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.15rem 0 0 0;
  font-size: 0.24rem;
  color: #555;
  div {
    width: 0.9rem;
    height: 0.9rem;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
.swiper-pagination {
  bottom: -0.25rem;
}
.cont {
  width: 100%;
  height: auto;
  background: white;
  margin-top: 0.2rem;
  border-top: 0.02rem solid #e1e1e1;
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