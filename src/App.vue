<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
}
</script>

<style>

#app {
  font-family: STXinwei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 36px;
  background: url(./image/beijin.jpg);
  background-size: cover;
  height: 100vh;
  width: 100%;
  background-size: 100%;
  overflow: auto;
}
#app::-webkit-scrollbar {
  width: 5px;
}
#app::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
}
#app::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  border-radius: 0;
  background: rgba(255, 255, 255, 0.1);
}
input[type=file] {
  display: none;
}
*{
  margin: 0;
  padding: 0;
}
</style>
