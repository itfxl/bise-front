<template>
  <div>
    <div class="zhuye">
      <div class="daohan">
        <div class="name">{{ left }}</div>
        <div class="information">
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
          <el-button type="primary" icon="el-icon-search" @click="handleSelect">搜索</el-button>
          <div class="daohanright">{{ right }}</div>
        </div>
      </div>
      <div class="main">
        <div class="div1">
          <div class="divhouse" v-for="i in listall" v-bind:key="i.index">
            <div class="divhouse1">
              <img :src="i.imgurl" />
              <div class="divhousetext">
                <div class="text">
                  <div class="xiangxi">{{i.account}}</div>
                  <div class="price">{{i.username}}</div>
                </div>
                <div class="text1">
                  <div class="address">{{i.phone}}</div>
                  <div class="deldiv">
                    <el-button type="text" @click="updatehouse1(i.id)">修改</el-button>
                    <div class="del">
                      <el-button type="text" style="color: #f56c6c" @click="del(i.id)">
                        删除
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="修改用户" :visible.sync="update">
      <div class="right">
        <div class="right1">
          <div>账号</div>
          <input type="text" v-model="user.account" />
        </div>
        <div class="right1">
          <div>昵称</div>
          <input type="text" v-model="user.username" />
        </div>
        <div class="right1">
          <div>电话</div>
          <input type="text" v-model="user.phone" />
        </div>
        <div class="right1">
          <div>密码</div>
          <input type="password" v-model="user.password" />
        </div>
      </div>
      <el-button :plain="true" type="primary" @click="upuser()"
        >确 定</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user:{},
      left: "雅舍房屋租售管理系统",
      right: "关于我们",
      state: "", //搜索框
      restaurants: [],
      timeout: null,
      update: false,
      listall:[],
    };
  },
  mounted() {
    this.listAll();
    this.listhouse();
  },
  methods: {
    listhouse(){
      this.axios({
        method: "post",
        url: "http://localhost:9376/userselect",
        data:{},
      }).then((response) => {
        this.listall = response.data.users;
        console.log(this.listall);
      });
    },
    updatehouse1(id){
      this.update = true;
      console.log(id);
      for (let i = 0; i < this.listall.length; i++) {
        if(id == this.listall[i].id){
          this.user = this.listall[i];
          console.log(this.listall[i]);
        }
      }
    },
    upuser(){

    },
    del(id) {
      this.axios({
        method: "post",
        url: "http://localhost:9376/deluser",
        data:{
          hid: id
        },
      }).then((response) => {
        if(response.data.code == 1){
          this.$notify({
            title: "删除成功",
            message: "已经成功的删除了这条信息",
            type: "success",
          });
          this.listhouse();
          this.listAll();
        }
      });
    },
    listAll() {
      this.axios({
        method: "post",
        url: "http://localhost:9376/userselect",
        data:{
        },
      }).then((response) => {
        for (var i = 0; i < response.data.users.length; i++) {
          console.log(response.data.users);
          this.restaurants.push({ value:response.data.users[i].account,address:response.data.users[i].username});
        }
      });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      });
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        );
      };
    },
    handleSelect() {
      this.axios({
        method: "post",
        url: "http://localhost:9376/userselect",
        data:{
          account: this.state
        },
      }).then((response) => {
        this.listall = response.data.users;
        console.log(response.data.users);
      });
    },
  },
  
};
</script>

<style scoped>
input{
  text-align: center;
  font-size: 20px;
  width: 400px;
  height: 50px;
  border:1px solid #000;
  border-radius: 5px;
  background:rgba(0, 0, 0, 0);
}
input:hover{
  width: 400px;
  height: 50px;
  font-size: 20px;
  color: rgba(104, 104, 253, 0.856);
  border:1px solid rgba(104, 104, 253, 0.856);
  border-radius: 5px;
  background:rgba(0, 0, 0, 0);
}
.right1{
  font-size: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#giftImg1 {
  width: 250px;
  height: 200px;
}
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
.zhuye {
  color: white;
}
.zhongjing{
  width: 10vh;
  height: 100%;
  z-index: 2000;
  position: fixed;
}
.daohan {
  text-align: center;
  width: 100%;
  padding: 14px 0;
  background-color: transparent;
  z-index: 2000;
  position: fixed;
}
.main{
  transform: translateY(10vh);
  margin-left: 6%;
  height: 90vh;
  width: 94%;
  overflow:auto
}
.main::-webkit-scrollbar {
  width: 5px;
}
.main::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
}
.main::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  border-radius: 0;
  background: rgba(255, 255, 255, 0.1);
}
.daohan > .name {
  height: 60px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 8px;
  text-indent: 8px;
  float: left;
  margin-left: 10%;
}
.information {
  height: 60px;
  width: 500px;
  float: right;
  margin-right: 10%;
  z-index: 1;
}
.information > .daohanright {
  height: 40px;
  font-size: 28px;
  float: right;
  margin-top: 10px;
}
.information > .el-autocomplete {
  width: 250px;
  float: left;
}
</style>