<template>
    <div class="error_container">
      <div class="header-Img"></div>
      <div class="error_info">
        <h1>404</h1>
        <h3>We couldn't find this page.</h3>
      </div>
      <el-button type="danger" round class="error_btn" @click="home">RETURN LOGIN
      </el-button>
    </div>
</template>

<script>
export default {
  name: 'Page404',
  methods: {
    home () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='scss' scoped>
.header-Img {
  position: relative;
  background-image: url("../../assets/img/pexels-pixabay2.jpg");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  height: 450px;
}

.error_info {
  display: flex;
  justify-content: space-evenly;
  max-width: 1200px;
  margin: 0 auto;
  h1 {
    font-size: 150px;
  }
  h3 {
    align-self: center;
    font-size: 30px;
  }
}

.error_btn {
  display: block;
  margin: 0 auto;
}

@media screen and (max-width: 650px) {
  .error_info {
    flex-direction: column;
  }
  h1 {
    text-align: center;
  }
  h3 {
    text-align: center;
  }
}

</style>
