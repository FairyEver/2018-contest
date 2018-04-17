<template>
  <div class="page">
    <div class="game-box">
      <game></game>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    game: () => import('@/components/game')
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: cadetblue;
  .game-box {
    height: 500px;
    width: 300px;
  }
}
</style>
