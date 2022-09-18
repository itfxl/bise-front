<template>
  <div>
    <div class="divhouse" v-for="i in listall" v-bind:key="i">
      <div class="divhouse1">
        <img :src="i.imgurl" />
        <div class="divhousetext">
          <div class="text">
            <div class="xiangxi">{{ i.hdescription }}</div>
            <div class="price">{{ i.price }}/{{i.rtstatus}}</div>
          </div>
          <div class="text1">
            <div class="address">{{ i.address }}</div>
            <div class="time">{{ i.htime }}</div>
            <div class="deldiv">
              <el-button type="text" :plain="true" @click="addorder(i.hid)"
                >联系购买</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      listall: [],
    };
  },
  mounted() {
    this.listhouse();
    this.user = this.$route.params;
    console.log(this.user);
  },
  methods: {
    listhouse() {
      this.listall = [];
      this.axios({
        method: "post",
        url: "http://localhost:9376/houseselect",
        data: {},
      }).then((response) => {
        console.log(response.data.house);
        for (let index = 0; index < response.data.house.length; index++) {
          if (response.data.house[index].hstatus == 0) {
            this.listall.push(response.data.house[index]);
          }
        }
      });
    },
    addorder(id) {
      this.axios({
        method: "post",
        url: "http://localhost:9376/addorder",
        data: {
          hid: id,
          account: this.user.account,
        },
      }).then((response) => {
        if (response.data.code == 1) {
          this.$message({
            message: "购买成功",
            type: "success",
          });
        } else if (response.data.code == 0) {
          this.$message.error("购买失败");
        }
      });
      this.listhouse();
    },
  },
};
</script>

<style scoped>
.div1 {
  height: 100%;
  width: 100%;
}
.divhouse1 {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  height: 90%;
  margin: auto;
  width: 75%;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  overflow: hidden;
}
.divhouse1:hover {
  transition: all 0.3s;
  z-index: 10;
  box-shadow: 0px 0px 20px rgba(34, 30, 30, 0.719);
}
.divhouse1 > img {
  height: 70%;
  width: 100%;
}
.divhousetext {
  transform: translateY(-8px);
  height: 100%;
  width: 100%;
  font-size: 15px;
}
.xiangxi {
  color: rgb(0, 0, 0);
  height: 100%;
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.text {
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text1 {
  height: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.price {
  color: rgb(110, 110, 110);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex: 2;
}
.address {
  color: rgb(110, 110, 110);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex: 4;
}
.time {
  color: rgb(110, 110, 110);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex: 4;
}
.deldiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex: 3;
}
.del {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex: 1;
}
.divhouse {
  height: 400px;
  width: 25%;
  float: left;
}
</style>