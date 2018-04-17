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
            v-for="item in Math.pow(currentCellNum, 2)"
            :key="item"
            :style="bgCellStyle(cellRowCol(item))">
          </div>
        </div>
        <!-- 游戏层 -->
        <div class="layer game">
          <div
            class="cell"
            v-for="item in cells"
            :key="item.id"
            :style="cellStyle(cellRowCol(item.cell), item.level)">
            <template v-if="currentLevelSetting[item.level].text">
              {{currentLevelSetting[item.level].text}}
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="icon-group">
        <i class="icon-circle-up" :class="{active: isPressUp}" @click="pressUp"></i>
        <i class="icon-circle-down" :class="{active: isPressDown}" @click="pressDown"></i>
        <i class="icon-circle-left" :class="{active: isPressLeft}" @click="pressLeft"></i>
        <i class="icon-circle-right" :class="{active: isPressRight}" @click="pressRight"></i>
      </div>
    </div>
  </div>
</template>

<script>
import hotkeys from 'hotkeys-js'
import _clonedeep from 'lodash.clonedeep'
export default {
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
    levelSetting: {
      type: Array,
      required: false,
      default: () => [
        {
          text: '2',
          bg: '#EEE4DA'
        }, {
          text: '4',
          bg: '#EFE0CD'
        }, {
          text: '8',
          bg: '#F2B17B'
        }, {
          text: '16',
          bg: '#F69465'
        }, {
          text: '32',
          bg: '#FE785C'
        }, {
          text: '64',
          bg: '#FD5733'
        }, {
          text: '128',
          bg: '#FFE564'
        }, {
          text: '256',
          bg: '#FFD24E'
        }, {
          text: '512',
          bg: '#FFE19C'
        }, {
          text: '1024',
          bg: '#FF934E'
        }, {
          text: '2048',
          bg: '#FF2D00'
        }
      ]
    }
  },
  data () {
    return {
      // [从参数获得] 几乘几的格子
      currentCellNum: 0,
      // [从参数获得] 格子间距
      currentCellMargin: 0,
      // [从参数获得] 等级设置
      currentLevelSetting: [],
      // [计算获得] 格子尺寸
      cellWidth: 0,
      // [mounted后取值] 棋盘尺寸
      boardWidth: 0,
      // 记录刚才用户的输入
      isPressUp: false,
      isPressDown: false,
      isPressLeft: false,
      isPressRight: false,
      // game 层的方块
      cells: []
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
    }
  },
  methods: {
    // 初始化
    init () {
      // 获取用户设置
      this.currentCellNum = this.cellNum
      this.currentCellMargin = this.cellMargin
      this.currentLevelSetting = _clonedeep(this.levelSetting)
      // 获取尺寸
      this.boardWidth = this.$refs.board.offsetWidth
      // 计算尺寸
      this.cellWidth = (this.boardWidth - this.currentCellMargin * (this.currentCellNum + 1)) / this.currentCellNum
      // 注册按键
      this.keyRegister()
      // 生成第一个方块
      this.newCell()
    },
    // 注册按键
    keyRegister () {
      hotkeys(this.keyUp, event => {
        event.preventDefault()
        this.pressUp()
      })
      hotkeys(this.keyDown, event => {
        event.preventDefault()
        this.pressDown()
      })
      hotkeys(this.keyLeft, event => {
        event.preventDefault()
        this.pressLeft()
      })
      hotkeys(this.keyRight, event => {
        event.preventDefault()
        this.pressRight()
      })
    },
    // 输入 index 输出 这个index对应的x和y
    cellRowCol (index) {
      return {
        x: (index - 1) % this.currentCellNum,
        y: parseInt((index - 1) / this.currentCellNum)
      }
    },
    // [背景层cell] 输入 x和y 返回这个位置的样式
    bgCellStyle ({x, y}) {
      return {
        width: `${this.cellWidth}px`,
        height: `${this.cellWidth}px`,
        left: `${this.currentCellMargin + x * (this.cellWidth + this.currentCellMargin)}px`,
        top: `${this.currentCellMargin + y * (this.cellWidth + this.currentCellMargin)}px`
      }
    },
    // [游戏层cell] 输入 x和y 返回这个位置的样式
    cellStyle ({x, y}, level) {
      return {
        width: `${this.cellWidth}px`,
        height: `${this.cellWidth}px`,
        left: `${this.currentCellMargin + x * (this.cellWidth + this.currentCellMargin)}px`,
        top: `${this.currentCellMargin + y * (this.cellWidth + this.currentCellMargin)}px`,
        backgroundColor: this.currentLevelSetting[level].bg
      }
    },
    // 生成一个方块
    newCell () {
      this.cells.push({
        // 位置
        cell: 2,
        // 唯一ID
        id: 0,
        // 等级
        level: 0
      })
    },
    // [上] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    pressUp () {
      console.log('pressUp')
      this.isPressUp = true
      setTimeout(() => {
        this.isPressUp = false
      }, 100)
    },
    // [下] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    pressDown () {
      console.log('pressDown')
      this.isPressDown = true
      setTimeout(() => {
        this.isPressDown = false
      }, 100)
    },
    // [左] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    pressLeft () {
      console.log('pressLeft')
      this.isPressLeft = true
      setTimeout(() => {
        this.isPressLeft = false
      }, 100)
    },
    // [右] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    pressRight () {
      console.log('pressRight')
      this.isPressRight = true
      setTimeout(() => {
        this.isPressRight = false
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './theme/default.scss';
</style>
