<template>
  <div>
    <div class="div" style="position: relative">
      <div class="daohan">
        <el-menu
          default-active="1-5"
          class="el-menu-vertical-demo"
          collapse="true"
          background-color="#F2F6FC"
        >
          <el-menu-item index="1" @click="myshow = true">
            <i><img :src="form.imgurl" /></i>
            <span slot="title">我的个人信息</span>
          </el-menu-item>
          <el-menu-item index="2" @click="usermagemt()">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="3" @click="housemagemt()">
            <i class="el-icon-s-home"></i>
            <span slot="title">房屋管理</span>
          </el-menu-item>
          <el-menu-item index="4" @click="housecatedment()">
            <i class="el-icon-copy-document"></i>
            <span slot="title">房屋猎聘管理</span>
          </el-menu-item>
          <el-menu-item index="5" @click="orderment()">
            <i class="el-icon-shopping-cart-1"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="6" @click="addshow = true">
            <i class="el-icon-plus"></i>
            <span slot="title">添加房屋信息</span>
          </el-menu-item>
          <el-menu-item index="7" @click="logoff">
            <i class="el-icon-error"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="center">
      <router-view></router-view>
    </div>
    <el-dialog title="我的个人信息" :visible.sync="myshow">
      <el-image
        style="width: 100px; height: 100px; border-radius: 50%"
        :src="form.imgurl"
        :preview-src-list="srcList"
      />
      <p>账号：{{ form.account }}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="myshow = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加房屋信息" :visible.sync="addshow">
      <el-form :model="form">
        <el-form-item>
          <el-upload
            class="upload-demo"
            action="http://localhost:9376/addhouse"
            ref="addhouse"
            name="imgurl"
            :data="house"
            :on-success="success"
            :on-change="changeFile1"
            :auto-upload="false"
            :show-file-list="false"
          >
            <img
              id="giftImg1"
              slot="trigger"
              size="small"
              :src="house.imgurl"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="房屋描述" :label-width="formLabelWidth">
          <el-input v-model="house.hdescription"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="house.price"></el-input>
        </el-form-item>
        <el-form-item label="期限" :label-width="formLabelWidth">
          <el-input
            v-model="house.rtstatus"
            placeholder="请填写“天”或“周”或“月”或“年”"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="house.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addshow = false">取 消</el-button>
        <el-button type="primary" @click="addhouse">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myshow: false,
      inforshow: false,
      upshow: false,
      addshow: false,
      form: {
        account: "", //账号
        imgurl: "", //头像
      },
      house: {
        id: "",
        imgurl: "", //图片
        address: "", //地址
        price: "", //房屋价格
        hdescription: "", //房屋描述
        rtstatus: "",
      },
      imageurl: {},
      formLabelWidth: "150px",
    };
  },
  mounted() {
    this.form = this.$route.params;
  },
  methods: {
    housemagemt() {
      this.$router.push({ name: "zhuye", params: this.form });
    },
    usermagemt() {
      this.$router.push({ name: "usergli", params: this.form });
    },
    addhouse() {
      this.$refs.addhouse.submit();
    },
    housecatedment(){
      this.$router.push({ name: "hcatedment", params: this.form });
    },
    orderment(){
      this.$router.push({ name: "ordermentguanli", params: this.form });
    },
    changeFile(file) {
      var This = this;
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function () {
        this.result;
        This.form.imgurl = this.result;
      };
    },
    changeFile1(file) {
      var This = this;
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function () {
        this.result;
        This.house.imgurl = this.result;
      };
    },
    success() {
      this.upshow = false;
      this.addshow = false;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    submitForm() {
      this.myshow = false;
    },
    logoff() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.center {
  overflow: hidden;
  width: 100%;
  height: 100vh;
}
#giftImg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
#giftImg1 {
  width: 250px;
  height: 200px;
}
.daohan {
  transform: translateY(60%);
  position: fixed;
  z-index: 2000;
}
i > img {
  height: 30px;
  border-radius: 50%;
}
.main {
  transform: translateY(10vh);
  height: 90vh;
  overflow: auto;
  width: 100%;
}

.content {
  height: 100%;
  width: 95%;
  float: right;
}
.content1 {
  height: 100%;
  width: 100%;
}
.mymodal {
  background: red;
  height: 600px;
  width: 400px;
  float: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.transition-box {
  margin-bottom: 10px;
  width: 800px;
  height: 600px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.tangchuang {
  display: flex;
  position: absolute;
  top: 10%;
  transform: translateX(-50%);
  left: 50%;
}
</style>