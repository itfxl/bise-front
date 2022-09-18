<template>
  <div class="indexa">
    <div class="index">
      <div class="indextop">
        <div class="daohanleft">{{ left }}</div>
      </div>
      <div class="indexzhong">
        <div class="touxiang">
          <img src="http://82.157.247.91:9376/image/touxiang.jpg" class="touxiangmr" />
        </div>
        <div class="from">
          <div class="zhanghao">
            <img src="http://82.157.247.91:9376/image/yonghu.png" />
            <el-input
              v-model="userData.account"
              placeholder="请输入账号"
            ></el-input>
          </div>
          <div class="mima">
            <img src="http://82.157.247.91:9376/image/mima.png" />
            <el-input
              placeholder="请输入密码"
              v-model="userData.password"
              show-password
            ></el-input>
          </div>
          <el-button class="button2" @click="zhuce">注册</el-button>
          <el-link  type="primary" :underline="false" @click="login">已经有账号，前往登录</el-link>
        </div>
      </div>
      <div class="indexbottom">
        <div class="daohanright">{{ right }}</div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: "雅舍房屋租售管理系统",
      right: "关于我们",
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
    zhuce() {
      this.axios({
        method: "post",
        url: "http://82.157.247.91:9376/userzhuce",
        data: {
          account: this.userData.account,
          password: this.userData.password,
        },
      }).then((response) => {
        if (response.data.code == 1) {
          this.$message({
            message: '注册成功，请重新登录',
            type: 'success'
          });
          this.$router.push("/");
        }else if(response.data.code == 0){
          this.$message.error('注册失败，已经有该账号，请重新注册');
        }
      });
    },
    login(){
      this.$router.push("/");
    }
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
  height: 35%;
}
.from {
  height: 65%;
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
  float: right;
  height: 50px;
  width: 100px;
  border-radius: 0.5em;
  border: none;
  font-size: 25px;
  letter-spacing: 8px;
  text-indent: 8px;
  color: white;
  background-color: rgba(0, 202, 67, 0.856);
  margin-right: 150px;
}
.touxiangmr {
  height: 80px;
  width: 80px;
  margin-top: 20px;
  border-radius: 50%;
}
</style>
