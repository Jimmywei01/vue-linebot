<template>
  <div class="app-main">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style lang="scss">
  .app-main {
    height: 100%;
    padding: 1.5rem;
    background-color: #EFEFEF;
  }
</style>
