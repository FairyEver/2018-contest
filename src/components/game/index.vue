<template>
  <div class="game theme-default">
    <div class="title">
      <div class="col logo">2048</div>
      <div class="col btn-group">
        <div class="text">1234</div>
        <div class="btn">OPTIONS</div>
      </div>
      <div class="col btn-group">
        <div class="text">2345</div>
        <div class="btn">RESET</div>
      </div>
    </div>
    <div class="main">
      <div class="board" ref="board" :style="boardStyle">
        <!-- 背景层 -->
        <div class="layer bg">
          <div
            class="cell"
            v-for="item in Math.pow(cellNum, 2)"
            :key="item"
            :style="styleCellInBgLayer(n2xy(item))">
          </div>
        </div>
        <!-- 游戏层 -->
        <div class="layer game">
          <div
            class="cell"
            v-for="item in cells"
            :ref="`game-cell-${item.id}`"
            :key="item.id"
            :style="styleCellInGameLayer(n2xy(item.position), item.level)">
            <template v-if="levelSetting[item.level - 1].text">
              {{levelSetting[item.level - 1].text}}
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="icon-group">
        <i class="icon-circle-up" :class="{active: isUp}" @click="handlerUp"></i>
        <i class="icon-circle-down" :class="{active: isDown}" @click="handlerDown"></i>
        <i class="icon-circle-left" :class="{active: isLeft}" @click="handlerLeft"></i>
        <i class="icon-circle-right" :class="{active: isRight}" @click="handlerRight"></i>
      </div>
    </div>
  </div>
</template>

<script>
const req = require.context('./mixins', false, /\.js$/)
const mixins = req.keys().map(req).map(e => e.default)
export default {
  mixins
}
</script>

<style lang="scss" scoped>
@import './theme/default.scss';
</style>
