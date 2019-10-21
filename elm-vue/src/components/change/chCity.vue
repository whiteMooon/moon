<template>
  <div class="city">
    <Head>
      <div slot="left" @click="goBack" class="left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" class="center">{{ info.name }}</div>
      <div slot="right" class="right" @click="goHome">切换城市</div>
    </Head>
    <div class="cont only">
      <el-input placeholder="输入学校、商务楼、地址" class="inp" v-model="txt" clearable></el-input>
      <button @click="find">提交</button>
    </div>
    <div class="content">
      <div class="history" v-show="flag">
        <p class="tit">搜索历史</p>
        <ul>
          <li v-for="(item,key) in msg" :key="key" class="find">
            <router-link :to="'/elmHome/'+item.geohash" tag="div">
              <p>{{ item.name }}</p>
              <p>{{ item.address }}</p>
            </router-link>
          </li>
        </ul>
        <p class="clearHistory" v-show="!this.msg.length">暂无数据</p>
        <p class="clearHistory" v-show="this.msg.length" @click="clearHistory">清空记录</p>
      </div>
      <div v-show="!flag">
        <ul>
          <li v-for="(item,key) in list" :key="key" class="find" @click="getHistory(key)">
            <router-link :to="'/elmHome/'+item.geohash" tag="div">
              <p>{{ item.name }}</p>
              <p>{{ item.address }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/head/Head";
import { city } from "@/utill/req";
import { search } from "@/utill/req";
export default {
  name: "chCity",
  components: { Head },
  data() {
    return {
      info: [],
      flag: true,
      txt: "",
      list: [],
      msg: [],
      record: [],
      id:{},
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push("/home");
    },
    async data() {
      const id = this.$route.query.id;
      const res = await city({}, id);
      console.log(res);
      this.info = res.data;
    },
    async find() {
      if (this.txt == "") {
        alert("输入内容不能为空");
        return false;
      }
      const id = this.$route.query.id;
      const res = await search({
        type: search,
        city_id: id,
        keyword: this.txt
      });
      // console.log(res);
      this.list = res.data;
      this.flag = false;
    },
    getHistory(key,geohash) {
      this.record = this.msg;
      // console.log(this.record);
      this.record.push(this.list[key]);
      // console.log(this.record)
      localStorage.setItem("address", JSON.stringify(this.record));
    },
    clearHistory() {
      localStorage.clear("adress");
      this.msg = [];
    }
  },
  created() {
    this.data();
  },
  mounted() {
    this.msg = JSON.parse(localStorage.getItem("address")) || [];
  }
};
</script>

<style lang="scss">
.only {
  .el-input__inner {
    height: 0.65rem;
    line-height: 0.65rem;
  }
}
</style>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  height: auto;
  width: 100%;
}
.city {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  flex: 1;
  overflow: auto;
}
.el-icon-arrow-left {
  font-size: 0.4rem;
}
.left,
.center,
.right {
  flex: 1;
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
.inp {
  width: 6.75rem;
}
.cont {
  width: 100%;
  height: 2rem;
  background: white;
  margin-top: 0.2rem;
  border: 0.01rem solid #e1e1e1;
  border-left: none;
  border-right: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2rem 0;
  justify-content: space-between;
  button {
    width: 6.75rem;
    height: 0.65rem;
    border-radius: 0.05rem;
    background: #3190e8;
    border: none;
    color: white;
  }
}
.history {
  width: 100%;
  height: auto;
  margin-top: 0.2rem;
  .tit {
    font-size: 0.26rem;
    color: #444;
    padding: 0 0.2rem;
    margin-bottom: 0.24rem;
  }
}
.clearHistory {
  width: 100%;
  height: 0.9rem;
  background: white;
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.9rem;
  color: #444;
}
.find {
  background: white;
  width: 100%;
  height: 1.4rem;
  padding: 0.2rem 0.4rem;
  font-size: 0.3rem;
  color: #222;
  line-height: 0.5rem;
  border-bottom: 0.01rem solid #e1e1e1;
  > p:nth-child(2) {
    font-size: 0.24rem;
    color: #999;
  }
}
</style>