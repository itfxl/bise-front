<template>
  <div>
    <div class="divhouse">
      <div class="needhouse" @click="addshow = true">
        <div
          style="border: 1px dashed #fff; width: 50%; margin-left: 25%"
        ></div>
        <div
          style="
            border: 1px dashed #fff;
            height: 50%;
            width: 1px;
            margin: auto;
            margin-left: -25%;
          "
        ></div>
      </div>
    </div>
    <div class="divhouse" v-for="i in listall" v-bind:key="i">
      <div class="needhouse">
        <img :src="i.imgurl" />
        <div class="needhouseright">
          <div class="needtop">
            <font class="left">需求：</font>
            <div class="right">
              <font>{{ i.need }}</font>
            </div>
          </div>
          <div class="needcenter">
            <font class="left">需求地址：</font>
            <font>{{ i.address }}</font>
          </div>
          <div class="needbuttom">
            <font class="left">联系方式：</font>
            <font>{{ i.phone }}</font>
          </div>
          <el-button type="text" :plain="true" style="color: #f56c6c" @click="delhousecated(i.id)">删除</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="房屋猎聘信息" :visible.sync="addshow">
      <div class="right1">
        <div class="right2">
          <div>需求：</div>
          <input type="text" v-model="housecateds.need" />
        </div>
        <div class="right2">
          <div>需求地址：</div>
          <input type="text" v-model="housecateds.address" />
        </div>
        <div class="right2">
          <div>联系方式：</div>
          <input type="text" v-model="housecateds.phone" />
        </div>
      </div>
      <el-button :plain="true" type="primary" @click="addhousecated"
        >确 定</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      housecateds: {
        need: "",
        address: "",
        phone: "",
      },
      user: {},
      listall: [],
      addshow: false,
    };
  },
  mounted() {
    this.user = this.$route.params;
    this.listalla();
  },
  methods: {
    listalla() {
      this.listall = [];
      this.axios({
        method: "post",
        url: "http://82.157.247.91:9376/selecthousecated",
        data: {},
      }).then((response) => {
        for (let index = 0; index < response.data.housecateds.length; index++) {
          if (response.data.housecateds[index].account == this.user.account) {
            this.listall.push(response.data.housecateds[index]);
          }
        }
      });
    },
    addhousecated() {
      this.axios({
        method: "post",
        url: "http://82.157.247.91:9376/addhousecated",
        data: {
          account: this.user.account,
          address: this.housecateds.address,
          need: this.housecateds.need,
          phone: this.housecateds.phone,
        },
      }).then((response) => {
        if (response.data.code == 1) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.addshow = false;
        } else {
          this.$message.error("添加失败");
          this.addshow = false;
        }
        this.listalla();
      });
    },
    delhousecated(id) {
      this.axios({
        method: "post",
        url: "http://82.157.247.91:9376/delhousecated",
        data: {
          id: id,
        },
      }).then((response) => {
        if (response.data.code == 1) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$message.error("删除失败");
        }
        this.listalla();
      });
    },
  },
};
</script>

<style scoped>
.divhouse {
  height: 250px;
  width: 50%;
  float: left;
  border-radius: 10px;
}
.needhouse {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  height: 90%;
  width: 90%;
  border: 1px solid #fff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.needhouse img {
  width: 40%;
  height: 100%;
}
.needhouseright {
  width: 58%;
  font-size: 25px;
  color: #fff;
}
.needhouseright div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  width: 150px;
}
.right {
  width: 250px;
  height: 100px;
  overflow: auto;
}
.right::-webkit-scrollbar {
  width: 5px;
}
.right::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
}
.right::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  border-radius: 0;
  background: rgba(255, 255, 255, 0.1);
}
.right1 {
  margin: auto;
  width: 70%;
  color: rgb(0, 0, 0);
}
input {
  text-align: center;
  font-size: 20px;
  width: 400px;
  height: 50px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0);
}
input:hover {
  width: 400px;
  height: 50px;
  font-size: 20px;
  color: rgba(104, 104, 253, 0.856);
  border: 1px solid rgba(104, 104, 253, 0.856);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0);
}
.right2 {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>