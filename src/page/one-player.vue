<template>
  <div class="game-page">
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
.game-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .game-box {
    height: 400px;
    width: 300px;
  }
}
</style>
