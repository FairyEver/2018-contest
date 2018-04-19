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
            :style="bgCellStyle(cell2xy(item))">
          </div>
        </div>
        <!-- 游戏层 -->
        <!-- <div class="layer game">
          <div
            class="cell"
            v-for="item in cells"
            :ref="`game-cell-${item.id}`"
            :key="item.id"
            :style="cellStyle(cell2xy(item.cell), item.level)">
            <template v-if="levelSetting[item.level - 1].text">
              {{levelSetting[item.level - 1].text}} {{item.id}}
            </template>
          </div>
        </div> -->
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
import _clonedeep from 'lodash.clonedeep'

import _props from './_props'
import _style from './_style'

export default {
  mixins: [
    _props,
    _style
  ],
  data () {
    return {
      // [计算获得] 格子尺寸
      cellWidth: 0,
      // [mounted后取值] 棋盘尺寸
      boardWidth: 0,
      // 记录刚才用户的输入
      isUp: false,
      isDown: false,
      isLeft: false,
      isRight: false,
      // game 层的方块
      cells: [],
      // 记录产生了多少个cell
      cellCount: 0,
      // 存放一次操作后，发生了变化的位置
      roundChanged: []
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    // 棋盘样式
    boardStyle () {
      return {
        height: `${this.boardWidth}px`
      }
    },
    // 当前 cells 的 grid 形式
    cellsGrid () {
      const row = Array(this.cellNum).fill(0)
      let grid = [...Array(this.cellNum)].map(e => _clonedeep(row))
      this.cells.forEach(cell => {
        const {x, y} = this.cell2xy(cell.cell)
        grid[x][y] = _clonedeep(cell)
      })
      return grid
    }
  },
  methods: {
    // 初始化
    init () {
      // 获取尺寸
      this.boardWidth = this.$refs.board.offsetWidth
      // 计算尺寸
      this.cellWidth = (this.boardWidth - this.cellMargin * (this.cellNum + 1)) / this.cellNum
      // 注册按键
      this.keyRegister()
      // 根据设置生成初始的cell
      // for (let i = 0; i < this.gameStartCellNum; i++) {
      //   this.newCell()
      // }
      // this.newCell(1)
      // this.newCell(1)
      // this.newCell(2)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './theme/default.scss';
</style>
