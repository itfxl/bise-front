<template>
  <div>
    <div class="divhouse" @click="addshow = true">
      <div class="divhouse1" style="border: 1px dashed #409eff">
        <div
          style="
            border: 1px dashed #409eff;
            width: 50%;
            height: 1px;
            margin: auto;
            margin-top: 180px;
          "
        ></div>
        <div
          style="
            border: 1px dashed #409eff;
            height: 180px;
            width: 1px;
            margin: auto;
            margin-top: -90px;
          "
        ></div>
      </div>
    </div>
    <div class="divhouse" v-for="i in listall" v-bind:key="i">
      <div class="divhouse1">
        <div class="divhousezt" v-if="i.hstatus == 1"><p>已售</p></div>
        <div class="divhousezt" v-else><p>未售</p></div>
        <img :src="i.imgurl" />
        <div class="divhousetext">
          <div class="text">
            <div class="xiangxi">{{ i.hdescription }}</div>
            <div class="price">{{ i.price }}/{{ i.rtstatus }}</div>
          </div>
          <div class="text1">
            <div class="address">{{ i.address }}</div>
            <div class="time">{{ i.htime }}</div>
            <div class="deldiv">
              <el-button type="text" @click="updatehouse1(i.hid)"
                >修改</el-button
              >
              <div class="del">
                <el-button
                  type="text"
                  style="color: #f56c6c"
                  @click="del(i.hid)"
                >
                  删除
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="添加房屋信息" :visible.sync="addshow">
      <el-form :model="house">
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
              v-if="house.imgurl"
              id="giftImg1"
              slot="trigger"
              size="small"
              :src="house.imgurl"
            />
            <div v-else id="giftImg1">
              <div
                style="
                  border: 1px dashed #409eff;
                  width: 50%;
                  height: 1px;
                  margin: auto;
                  margin-top: 100px;
                "
              ></div>
              <div
                style="
                  border: 1px dashed #409eff;
                  height: 100px;
                  width: 1px;
                  margin: auto;
                  margin-top: -50px;
                "
              ></div>
            </div>
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
    <el-dialog title="修改房屋信息" :visible.sync="update">
      <el-form :model="house">
        <el-form-item>
          <el-upload
            class="upload-demo"
            action="http://localhost:9376/updatehouse"
            ref="uphouse"
            name="imgurl"
            :data="house"
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
        <el-form-item label="房屋描述">
          <el-input v-model="house.hdescription"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="house.price"></el-input>
        </el-form-item>
        <el-form-item label="期限">
          <el-input
            v-model="house.rtstatus"
            placeholder="请填写“天”或“周”或“月”或“年”"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="house.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="update = false">取 消</el-button>
        <el-button :plain="true" type="primary" @click="uphouse"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      listall: [],
      formLabelWidth: "200px",
      addshow: false,
      update: false,
      house: {
        hid: "",
        account: "",
        imgurl: "", //图片
        address: "", //地址
        price: "", //房屋价格
        hdescription: "", //房屋描述
        phone: "",
        rtstatus: "",
      },
    };
  },
  mounted() {
    this.user = this.$route.params;
    this.listalla();
  },
  methods: {
    listalla() {
      console.log(this.user);
      this.axios({
        method: "post",
        url: "http://localhost:9376/houseselect",
        data: {
          account: this.user.account,
        },
      }).then((response) => {
        this.listall = response.data.house;
        console.log(response.data.house);
      });
    },
    success() {
      this.upshow = false;
      this.addshow = false;
      this.$message({
        message: "添加成功",
        type: "success",
      });
      this.listalla();
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
    addhouse() {
      this.house.account = this.user.account;
      this.house.phone = this.user.phone;
      this.$refs.addhouse.submit();
    },
    updatehouse1(hid) {
      this.update = true;
      for (let i = 0; i < this.listall.length; i++) {
        if (hid == this.listall[i].hid) {
          this.house = this.listall[i];
        }
      }
    },
    uphouse() {
      this.$refs.uphouse.submit();
    },
    del(id) {
      this.axios({
        method: "post",
        url: "http://localhost:9376/delhouse",
        data: {
          hid: id,
        },
      }).then((response) => {
        if (response.data.code == 1) {
          this.$notify({
            title: "删除成功",
            message: "已经成功的删除了这条信息",
            type: "success",
          });
          this.listalla();
        }
      });
    },
  },
};
</script>

<style scoped>
.divhousezt {
  text-align: center;
  line-height: 30px;
  font-size: 30px;
  width: 200px;
  margin-left: -60px;
  margin-top: 25px;
  position: fixed;
  color: red;
  float: left;
  background-color: rgba(0, 0, 0, 0.5);
  transform: rotate(-45deg);
}
#giftImg1 {
  width: 250px;
  height: 200px;
  border: 1px dashed #409eff;
}
.divhouse {
  height: 400px;
  width: 25%;
  float: left;
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