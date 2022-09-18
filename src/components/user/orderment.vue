<template>
  <div>
    <div class="divhouse" v-for="i in listall" :key="i.index">
      <div class="divhouse1">
        <img :src="i.imgurl" />
        <div class="divhousetext">
          <div class="text">
            <div class="xiangxi">{{ i.hdescription }}</div>
            <div class="price">{{ i.price }}/{{ i.rtstatus }}</div>
          </div>
          <div class="text1">
            <div class="address">{{ i.address }}</div>
            <div class="time">{{ i.phone }}</div>
            <div class="deldiv">
              <el-button type="text" :plain="true" @click="seorder(i.id)"
                >完成订单</el-button
              >
              <el-button type="text" :plain="true" @click="delorder(i.hid)"
                >订单删除</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="订单完成" :visible.sync="addshow">
      <div class="right1">
        <div class="right2">
          <div>对租房体验评价：</div>
          <input type="text" v-model="evaluation" />
        </div>
      </div>
      <el-button :plain="true" type="primary" @click="uporder"
        >确 定</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      addshow: false,
      evaluation:'',
      listall: [],
      hid:''
    };
  },
  mounted() {
    this.user = this.$route.params;
    this.listall1();
    console.log(this.listall);
  },
  methods: {
    listall1() {
      this.listall =[];
      this.axios({
        method: "post",
        url: "http://82.157.247.91:9376/orderselect",
        data: {
          account: this.user.account,
        },
      }).then((response) => {
        for (let index = 0; index < response.data.orders.length; index++) {
          if (response.data.orders[index].state == 1) {
            this.listall.push(response.data.orders[index]);
          } else if (response.data.orders[index].state == 0) {
            this.listall.push(response.data.orders[index]);
          }
        }
      });
    },
    delorder(hid) {
      this.axios({
        method: "post",
        url: "http://82.157.247.91:9376/delorder",
        data: {
          hid: hid,
          account: this.user.account,
          state: "2",
        },
      }).then((response) => {
        if (response.data.code == 1) {
          this.$notify({
            title: "删除订单成功",
            message: "已经成功的删除了这条信息",
            type: "success",
          });
          this.listall1();
        }
        this.listall1();
      });
    },
    seorder(hid) {
      this.addshow = true;
      this.hid = hid;
    },
    uporder(){
      this.axios({
        method: "post",
        url: "http://82.157.247.91:9376/uporder",
        data: {
          id: this.hid,
          account: this.user.account,
          state: "1",
          evaluation: this.evaluation
        },
      }).then((response) => {
        if (response.data.code == 1) {
          this.$notify({
            title: "订单完成",
            message: "订单已经完成，也作出评价",
            type: "success",
          });
          this.listall1();
        }
        this.listall1();
      });
    }
  },
};
</script>

<style scoped>
.divhouse {
  height: 400px;
  width: 25%;
  float: left;
  /* border: 1px dashed rgb(97, 95, 95); */
  border-radius: 10px;
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
</style>