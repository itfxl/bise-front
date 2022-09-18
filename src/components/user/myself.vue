<template>
  <div>
    <div class="myself">
      <div class="left">
        <el-form :model="user">
          <el-form-item>
            <el-upload
              class="upload-demo"
              action="http://82.157.247.91:9376/upshow"
              ref="upshow"
              name="imgurl"
              :on-success="success"
              :on-change="changeFile1"
              :data="user"
              :auto-upload="false"
              :show-file-list="false"
            >
              <img id="giftImg1" :src="user.imgurl" />
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
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
    </div>
    <div>
      <button :plain="true" @click="upshow">提交修改</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        phone: "",
        password: "",
        account: "",
        username: "",
        imgurl: "",
        formLabelWidth: "200px",
      },
    };
  },
  mounted() {
    this.user = this.$route.params;
    console.log(this.user);
  },
  methods: {
    upshow() {
      console.log(11111);
      this.$refs.upshow.submit();
    },
    success() {
      this.$notify({
        title: "修改成功",
        message: "已经成功的个人信息",
        type: "success",
      });
    },
    changeFile1(file) {
      var This = this;
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function () {
        this.result;
        This.user.imgurl = this.result;
      };
    },
  },
};
</script>

<style scoped>
.myself {
  width: 70%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.right {
  width: 60%;
  color: white;
}
input{
  text-align: center;
  font-size: 20px;
  width: 400px;
  height: 50px;
  border:1px solid #fff;
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
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button{
  width: 250px;
  color: #fff;
  border:1px solid #fff;
  border-radius: 5px;
  background:rgba(0, 0, 0, 0);
}
button:hover{
  width: 250px;
  color: rgba(104, 104, 253, 0.856);
  border:1px solid rgba(104, 104, 253, 0.856);
  border-radius: 5px;
  background:rgba(0, 0, 0, 0);
}
#giftImg1 {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-top: 20px;
}
</style>