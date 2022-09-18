<template>
  <div class="indexa">
    <div class="index">
      <div class="indextop">
        <div class="daohanleft">{{ left }}</div>
      </div>
      <div class="indexzhong">
        <div class="touxiang">
          <img src="http://localhost:9376/image/touxiang.jpg" class="touxiangmr" />
        </div>
        <div class="from">
          <div class="zhanghao">
            <img src="http://localhost:9376/image/yonghu.png" />
            <el-input
              v-model="userData.account"
              placeholder="请输入账号"
            ></el-input>
          </div>
          <div class="mima">
            <img src="http://localhost:9376/image/mima.png" />
            <el-input
              placeholder="请输入密码"
              v-model="userData.password"
              show-password
            ></el-input>
          </div>
          <button :plain="true" class="button2" @click="login">管理</button>
          <button :plain="true" class="button3" @click="userlogin">用户</button>
          <el-button type="text" @click="centerDialogVisible = true">忘记密码</el-button>
          <el-button type="text" @click="apply">注册</el-button>
        </div>
      </div>
      <div class="indexbottom">
        <div class="daohanright">{{ right }}</div>
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="xiuzhanghao">
        <el-input
          v-model="userData.account"
          placeholder="请输入你想修改的账号"
        ></el-input>
      </div>
      <div class="xiumima">
        <el-input
          placeholder="请输入你想修改的密码"
          v-model="userData.password"
          show-password
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button :plain="true" type="primary" @click="xiugai">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: "雅舍房屋租售管理系统",
      right: "关于我们",
      centerDialogVisible: false,
      userData: {
        account: "",
        password: "",
      },
      code: 0,
    };
  },
  mounted() {
    
  },
  methods: {
    login() {
      this.axios({
        method: "post",
        url: "http://localhost:9376/adminlogin",
        data: {
          account: this.userData.account,
          password: this.userData.password,
        },
      }).then((response) => {
        if (response.data.code == 1) {
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          this.$router.push({ name:"zhuye", params: response.data.admin});
        }else if(response.data.code == 0){
            this.$message.error('账号或者密码错误');
        }
      });
    },
    userlogin(){
      this.axios({
        method: "post",
        url: "http://localhost:9376/userlogin",
        data: {
          account: this.userData.account,
          password: this.userData.password,
        },
      }).then((response) => {
        console.log(response);
        if (response.data.code == 1) {
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          this.$router.push({ name:"userzhuye", params: response.data.userData});
        }else if(response.data.code == 0){
            this.$message.error('账号或者密码错误');
        }
      });
    },
    xiugai(){
      this.axios({
        method: "post",
        url: "http://localhost:9376/zhucexiugai",
        data: {
          account: this.userData.account,
          password: this.userData.password,
        },
      }).then((response) => {
        if (response.data.code == 1) {
          this.centerDialogVisible = false;
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }else if(response.data.code == 0){
          this.$message.error('修改失败，没有该账号');
        }
      });
    },
    apply() {
      this.$router.push("/zhuche");
    },
  },
};
</script>

<style scoped>
.indexa {
  background: url(../image/beijin.jpg);
  background-size: cover;
  height: 100vh;
  width: 100%;
  
  background-size: 100%;
}
.index {
  height: 500px;
  width: 400px;
  margin: auto;
  color: white;
  transform: translateY(125px);
  background: rgba(0, 0, 0, 0.63);
  font-weight: bold;
  border-radius: 1em;
  letter-spacing: 8px;
  text-indent: 8px;
  font-size: 20px;
  vertical-align: middle;
  text-align: center;
}
.indextop {
  height: 12%;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}
.indexzhong {
  height: 76%;
}
.indexbottom {
  height: 12%;
  border-bottom-right-radius: 1em;
  border-bottom-left-radius: 1em;
}
.daohanleft {
  height: 40px;
  width: 100%;
  font-size: 28px;
  float: left;
  margin-top: 10px;
}
.daohanright {
  height: 40px;
  width: 100%;
  font-size: 28px;
  float: left;
  margin-top: 10px;
}

.touxiang {
  height: 30%;
}
.from {
  height: 70%;
}
.xiuzhanghao {
  width:80%;
  margin: auto;
}
.xiumima {
  width:80%;
  margin: auto;
  transform: translateY(20px);
}
.zhanghao {
  height: 35%;
}
.zhanghao img {
  float: left;
  height: 40px;
  margin-left: 35px;
  margin-top: 20px;
  opacity: 0.9;
}
.zhanghao > .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 250px;
  margin-top: 20px;
  margin-left: -28px;
}
.mima {
  height: 35%;
}
.mima img {
  float: left;
  height: 40px;
  margin-left: 35px;
  margin-top: 20px;
  opacity: 0.9;
}
.mima > .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 250px;
  margin-top: 20px;
  margin-left: -28px;
}
.button2 {
  float: left;
  height: 50px;
  width: 100px;
  border-radius: 0.5em;
  border: none;
  font-size: 20px;
  letter-spacing: 8px;
  text-indent: 8px;
  color: white;
  background-color: rgba(0, 202, 67, 0.856);
  margin-left: 80px;
}
.button3 {
  float: right;
  height: 50px;
  width: 100px;
  border-radius: 0.5em;
  border: none;
  font-size: 20px;
  letter-spacing: 8px;
  text-indent: 8px;
  color: white;
  background-color: rgba(0, 202, 67, 0.856);
  margin-right: 80px;
}
.touxiangmr {
  height: 80px;
  width: 80px;
  margin-top: 20px;
  border-radius: 50%;
}
</style>
