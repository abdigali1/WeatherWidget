<template>
  <div class="wrapper">
    <WeatherWidget />
  </div>
</template>

<script>

import WeatherWidget from "@/components/WeatherWidget.vue";
export default {
  name: "Home",
  components: {
    WeatherWidget
  }
};
</script>
<style lang="scss" scoped>
  .wrapper {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(0deg, rgb(192,132,116) 0%, rgb(133,102,137) 50%, rgb(50,74,134) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
