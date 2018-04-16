<template>
  <div>
    <game></game>
  </div>
</template>

<script>
export default {
  components: {
    game: () => import('@/components/game')
  }
}
</script>

