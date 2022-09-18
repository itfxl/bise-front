<template>
  <div>
    <div class="top">
      <div class="topleft">雅舍房屋租售管理系统</div>
      <div class="topright">
        <img :src="user.imgurl" />
      </div>
    </div>
    <div class="centent">
      <el-carousel :interval="3000" type="card" height="60vh">
        <el-carousel-item v-for="item in house" :key="item.index">
          <img :src="item.imgurl" height="100%" width="100%" />
          <h3>{{ item.hdescription }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="buttom">
      <div class="buttomcenter">
        <el-menu
          id="elmenu"
          :default-active="activeIndex"
          background-color="#303133"
          text-color="#ffffff"
          active-text-color="#ffffff"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item id="elmenuitem" index="1" @click="orderment"
            >订单管理</el-menu-item
          >
          <el-menu-item id="elmenuitem" index="2" @click="newhouse"
            >最新房屋</el-menu-item
          >
          <el-menu-item id="elmenuitem" index="3" @click="housecooperated"
            >房屋猎聘</el-menu-item
          >
          <el-menu-item id="elmenuitem" index="6" @click="housecatedment"
            >猎聘信息管理</el-menu-item
          >
          <el-menu-item id="elmenuitem" index="4" @click="housement1"
            >房屋管理</el-menu-item
          >
          <el-menu-item id="elmenuitem" index="5" @click="myself"
            >个人信息</el-menu-item
          >
        </el-menu>
      </div>
      <div class="buttomb">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      houses: [],
      house: [],
    };
  },
  mounted() {
    this.housesall();
    this.user = this.$route.params;
    this.$router.push({ name:"newhouse", params: this.user});
  },
  methods: {
    housesall() {
      this.axios({
        method: "post",
        url: "http://82.157.247.91:9376/houseselect",
        data: {},
      }).then((response) => {
        this.houses = response.data.house;
        for (let index = 0; index < 4; index++) {
          this.house.push(response.data.house[index]);
        }
      });
    },
    orderment() {
      this.$router.push({ name: "orderment", params: this.user });
    },
    newhouse() {
      this.$router.push({ name: "newhouse", params: this.user });
    },
    housecooperated() {
      this.$router.push({ name: "housecooperated", params: this.user });
    },
    housecatedment(){
      this.$router.push({ name: "housecatedment", params: this.user });
    },
    housement1() {
      this.$router.push({ name: "housement", params: this.user });
    },
    myself() {
      this.$router.push({ name: "myself", params: this.user });
    },
  },
};
</script>

<style scoped>
.top {
  height: 80px;
  width: 100%;
  z-index: 2000;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topleft {
  width: 40%;
}
.topright {
  margin-right: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top img {
  height: 50px;
  width: 50px;
  border-radius: 50px;
}
.centent {
  width: 90%;
  margin: auto;
  padding-top: 100px;
}
.el-carousel__item h3 {
  color: #ffffff;
  opacity: 0.75;
  width: 80%;
  margin: auto;
  margin-top: -100px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.buttom {
  width: 80%;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.buttomcenter {
  width: 620px;
  margin: auto;
}
.buttomb {
  width: 100%;
  overflow: hidden;
}
</style>