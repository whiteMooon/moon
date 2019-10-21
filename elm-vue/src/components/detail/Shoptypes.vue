<template>
  <div class="shoptype">
    <div class="shoptypes">
      <div class="nav">
        <p
          v-for="(item,key) in this.$store.state.nav"
          :key="key"
          :class="{active:index == key}"
          @click="tab(key)"
        >{{ item.name }}</p>
      </div>
      <div class="cont">
        <div
          class="types"
          v-for="(item,key) in this.$store.state.nav"
          :key="key"
          :id="'scroll'+key"
        >
          <div class="title">
            <p>{{ item.name }}</p>
            <span>{{ item.description }}</span>
          </div>
          <div class="shop" v-for="(item,key) in item.foods" :key="key">
            <div class="shop_top">
              <div class="img">
                <img :src="'//elm.cangdu.org/img/'+item.image_path" alt />
              </div>
              <div class="desc">
                <h3>{{ item.name }}</h3>
                <span>{{ item.description }}</span>
                <p>月售{{ item.month_sales }}份 好评率{{ item.satisfy_rate }}%</p>
                <!-- <b>{{ item.activity.image_text }}</b> -->
              </div>
            </div>
            <div class="price">
              <p>
                <span>￥{{ item.specfoods[0].price }}</span> 起
              </p>
              <div>
                <button v-if="item.specifications.length > 0" class="txt">选规格</button>
                <p v-else>
                  <button class="add" v-show="item.__v != 0">-</button>
                  <span style="color:black;margin:0 0.1rem;" v-show="item.__v != 0">{{ item.__v }}</span>
                  <button class="add" @click="flag=!flag,getPlace($event,item)">+</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shopcart">
      <div class="cart">
        <i class="el-icon-shopping-cart-1"></i>
      </div>
      <div class="price_cart">
        <p>￥0.00</p>
        <p>配送费约￥5</p>
      </div>
      <div class="order">去结算</div>
      <ul class="cartlist">
        <li v-for="(item,key) in this.$store.state.cart" :key="key">
          <p>{{ item.name }}</p>
          <b>￥{{ item.price }}</b>
          <div>
            <button class="add">-</button>
            <span style="color:black;margin:0 0.1rem;">{{ item.num }}</span>
            <button class="add">+</button>
          </div>
        </li>
      </ul>
    </div>
    <transition v-on:enter="enter" v-on:after-enter="afterEnter" v-on:before-enter="beforeEnter">
      <div class="box" :style="{left:left,top:top}" v-show="flag"></div>
    </transition>
  </div>
</template>

<script>
import { shopTypes } from "@/utill/req";
export default {
  name: "Shoptypes",
  data() {
    return {
      nav: [],
      index: 0,
      flag: false,
      left: 0,
      top: 0
    };
  },
  methods: {
    async data() {
      var id = localStorage.getItem("id");
      const res = await shopTypes({
        restaurant_id: id
      });
      console.log(res);
      this.$store.commit("data", res.data);
    },
    tab(key) {
      document.getElementById("scroll" + key).scrollIntoView();
      this.index = key;
    },
    beforeEnter(el) {
      el.style.left = this.left;
      el.style.top = this.top;
    },
    enter(el, done) {
      el.offsetLeft;
      el.style.left = 0;
      el.style.top = "13rem";
      el.style.transition = "all 1s";
      done();
    },
    afterEnter(el) {
      this.flag = !this.flag;
    },
    getPlace(e, item) {
      // console.log(e);
      var x = e.clientX;
      var y = e.clientY;
      // console.log(x,y);
      this.left = (x * 2) / 100 - 0.15 + "rem";
      this.top = (y * 2) / 100 - 0.15 + "rem";
      //添加
      var obj = { name: item.name, num: 1, price: item.specfoods[0].price,index:this.index };
      this.$store.commit("addNum", obj);
    }
  },
  created() {
    this.data();
  }
};
</script>

<style lang="scss" scoped>
.shoptype {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.shoptypes {
  width: 100%;
  flex: 1;
  display: flex;
}
.nav {
  width: 1.75rem;
  height: 100%;
  background: #f5f5f5;
  overflow: auto;
  p {
    width: 100%;
    height: 1.25rem;
    border-bottom: 0.01rem solid #e1e1e1;
    text-align: center;
    line-height: 1.25rem;
    font-size: 0.24rem;
    overflow: hidden;
  }
}
.cont {
  flex: 1;
  height: 100%;
  overflow: auto;
  background: white;
}
.types {
  width: 100%;
  height: auto;
}
.title {
  width: 100%;
  height: 1rem;
  font-size: 0.3rem;
  color: #606060;
  padding: 0 0.2rem;
  display: flex;
  line-height: 1rem;
  background: #f5f5f5;
  span {
    font-size: 0.22rem;
    margin-left: 0.2rem;
  }
}
.shop {
  width: 100%;
  height: 2.8rem;
  background: white;
  padding: 0.3rem 0.2rem;
  border-bottom: 0.01rem solid #e1e1e1;
}
.shop_top {
  width: 100%;
  height: 1.7rem;
  display: flex;
  overflow: hidden;
  .img {
    width: 0.95rem;
    height: 0.95rem;
  }
  .desc {
    flex: 1;
    margin-left: 0.2rem;
    display: flex;
    flex-direction: column;
    h3 {
      font-size: 0.32rem;
      color: #555;
    }
    span {
      color: #999;
      font-size: 0.24rem;
      margin-top: 0.15rem;
      margin-bottom: 0.15rem;
    }
    p {
      font-size: 0.26rem;
      color: #666;
    }
  }
}
.price {
  width: 100%;
  height: 0.45rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.2rem;
  font-size: 0.2rem;
  span {
    color: #ff5e00;
    font-size: 0.28rem;
  }
  .txt {
    width: 1rem;
    height: 0.5rem;
    background: #3190e8;
    color: white;
    border-radius: 0.1rem;
    border: none;
    font-size: 0.24rem;
  }
}
.add {
  border-radius: 50%;
  width: 0.4rem;
  height: 0.4rem;
  background: #3190e8;
  color: white;
  border: none;
  font-size: 0.24rem;
}
.shopcart {
  width: 100%;
  height: 0.95rem;
  background: #3d3d3f;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.cart {
  width: 1.08rem;
  height: 1.08rem;
  border-radius: 50%;
  border: 0.02rem solid #444444;
  position: absolute;
  background: #3d3d3f;
  top: -0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0.2rem;
  z-index: 2;
  i {
    font-size: 0.5rem;
    color: white;
  }
}
.price_cart {
  width: 3.5rem;
  height: 100%;
  font-size: 0.3rem;
  color: white;
  font-weight: 600;
  margin-left: 1.65rem;
  display: flex;
  flex-direction: column;
  padding: 0.1rem 0;
  justify-content: space-between;
  > p:nth-child(2) {
    font-size: 0.22rem;
  }
}
.order {
  flex: 1;
  height: 100%;
  font-size: 0.3rem;
  color: white;
  text-align: center;
  line-height: 1.08rem;
  background: #535356;
}
.active {
  background: white;
}
.box {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  background: #2486f2;
}
.cartlist {
  width: 100%;
  height: auto;
  background: white;
  position: absolute;
  list-style-type: none;
  font-size: 0.28rem;
  color: #444;
  bottom: 0.95rem;
  z-index: 1;
  li {
    width: 100%;
    height: 0.9rem;
    display: flex;
    align-items: center;
    border-bottom: 0.01rem solid #e1e1e1;
    justify-content: space-between;
    p {
      margin-left: 0.2rem;
      width: 4rem;
    }
    b {
      color: #ff5e00;
    }
    div {
      flex: 1;
      height: 100%;
      margin-left: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.2rem;
    }
  }
}
</style>