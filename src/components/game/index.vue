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
        <div class="layer game">
          <div
            class="cell"
            v-for="item in cells"
            :ref="`game-cell-${item.id}`"
            :key="item.id"
            :style="cellStyle(cell2xy(item.cell), item.level)">
            <!-- 方块内是文字 -->
            <template v-if="levelSetting[item.level - 1].text">
              {{levelSetting[item.level - 1].text}} {{item.id}}
              <!-- {{item.cell}} -->
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
import _clonedeep from 'lodash.clonedeep'

import log from './_log'
import transform from './_transform'
import cellStyle from './_cellStyle'
import canMove from './_canMove'
import cell from './_cell'
import handler from './_handler'
import key from './_key'
import tools from './_tools'

export default {
  mixins: [
    log,
    transform,
    cellStyle,
    canMove,
    cell,
    handler,
    key,
    tools
  ],
  props: {
    // 几乘几的格子
    cellNum: {type: Number, required: false, default: 4},
    // 格子之间的间距
    cellMargin: {type: Number, required: false, default: 6},
    // 按键
    keyUp: {type: String, required: false, default: 'up'},
    keyDown: {type: String, required: false, default: 'down'},
    keyLeft: {type: String, required: false, default: 'left'},
    keyRight: {type: String, required: false, default: 'right'},
    // 等级设置
    levelSetting: {
      type: Array,
      required: false,
      default: () => [
        {text: '2', bg: '#EEE4DA'},
        {text: '4', bg: '#EFE0CD'},
        {text: '8', bg: '#F2B17B'},
        {text: '16', bg: '#F69465'},
        {text: '32', bg: '#FE785C'},
        {text: '64', bg: '#FD5733'},
        {text: '128', bg: '#FFE564'},
        {text: '256', bg: '#FFD24E'},
        {text: '512', bg: '#FFE19C'},
        {text: '1024', bg: '#FF934E'},
        {text: '2048', bg: '#FF2D00'}
      ]
    },
    // 游戏设置 在游戏开始的时候有多少个方块
    gameStartCellNum: {type: Number, required: false, default: 2}
  },
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
      this.newCell(1)
      this.newCell(2)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './theme/default.scss';
</style>
