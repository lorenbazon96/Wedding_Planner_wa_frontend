<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  min-height: 100vh;
  background: url("@/assets/background.png") no-repeat center center fixed;
  background-size: cover;
}

nav {
  padding: 30px;
}
</style>
