<template>
  <div>
    <div class="divhouse" v-for="i in listall" v-bind:key="i">
      <div class="needhouse">
        <img :src="i.imgurl" />
        <div class="needhouseright">
          <div class="needtop">
            <font class="left">需求：</font>
            <div class="right"><font >{{i.need}}</font></div>
          </div>
          <div class="needcenter">
            <font class="left">需求地址：</font>
            <font>{{i.address}}</font>
          </div>
          <div class="needbuttom">
            <font class="left">联系方式：</font>
            <font>{{i.phone}}</font>
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
      listall: [],
    };
  },
  mounted() {
    this.listalla();
  },
  methods: {
    listalla() {
      this.axios({
        method: "post",
        url: "http://82.157.247.91:9376/selecthousecated",
        data: {},
      }).then((response) => {
        this.listall = response.data.housecateds;
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
.needhouseright{
  width: 58%;
  font-size: 25px;
  color: #fff;
}
.needhouseright div{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left{
  width: 150px;
}
.right{
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
</style>