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
            :style="bgCellStyle(cellRowCol(item))">
          </div>
        </div>
        <!-- 游戏层 -->
        <div class="layer game">
          <div
            class="cell"
            v-for="item in cells"
            :ref="`game-cell-${item.id}`"
            :key="item.id"
            :style="cellStyle(cellRowCol(item.cell), item.level)">
            <!-- 方块内是文字 -->
            <template v-if="levelSetting[item.level - 1].text">
              {{levelSetting[item.level - 1].text}}
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
import hotkeys from 'hotkeys-js'
import _clonedeep from 'lodash.clonedeep'
import _difference from 'lodash.difference'
import _random from 'lodash.random'
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
      cellCount: 0
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
        const {x, y} = this.cellRowCol(cell.cell)
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
      for (let i = 0; i < this.gameStartCellNum; i++) {
        this.newCell()
      }
    },
    // 注册按键
    keyRegister () {
      hotkeys(this.keyUp, event => {
        event.preventDefault()
        this.handlerUp()
      })
      hotkeys(this.keyDown, event => {
        event.preventDefault()
        this.handlerDown()
      })
      hotkeys(this.keyLeft, event => {
        event.preventDefault()
        this.handlerLeft()
      })
      hotkeys(this.keyRight, event => {
        event.preventDefault()
        this.handlerRight()
      })
    },
    // 输入 index 输出 这个index对应的x和y
    cellRowCol (index) {
      return {
        // 行
        x: parseInt((index - 1) / this.cellNum),
        // 列
        y: (index - 1) % this.cellNum
      }
    },
    // [背景层cell] 输入 x和y 返回这个位置的样式
    bgCellStyle ({x, y}) {
      return this.xy2style(x, y)
    },
    // [游戏层cell] 输入 x和y 返回这个位置的样式
    cellStyle ({x, y}, level) {
      return {
        ...this.xy2style(x, y),
        backgroundColor: this.levelSetting[level - 1].bg
      }
    },
    // [背景层cell] 为 bgCellStyle 和 cellStyle 提供基础样式，根据传入的行列数据返回位置数据
    xy2style (x, y) {
      return {
        width: `${this.cellWidth}px`,
        height: `${this.cellWidth}px`,
        left: `${this.cellMargin + y * (this.cellWidth + this.cellMargin)}px`,
        top: `${this.cellMargin + x * (this.cellWidth + this.cellMargin)}px`
      }
    },
    // 生成一个方块 生成的方块暂时只能是2 (等级是1)
    newCell () {
      console.group('newCell')
      const useful = _difference([...Array(Math.pow(this.cellNum, 2))].map((e, i) => i + 1), this.cells.map(e => e.cell))
      const cell = {
        cell: useful[_random(useful.length - 1)], // 位置
        id: this.cellCount++, // 唯一ID
        level: 1 // 等级
      }
      this.cells.push(cell)
      this.logCell(cell, 'add a new cell')
      this.logCellGrid()
      console.groupEnd()
    },
    // [移动检查] 检查是否可以向上移动
    canMoveUp () {
      return new Promise((resolve, reject) => {
        // 打印矩阵
        this.logCellGrid()
        // 找符合要求的节点
        // 第一行省略
        for (let row = 1; row < this.cellNum; row++) {
          for (let col = 0; col < this.cellNum; col++) {
            // 首先这个 cell 不可以是 0, 因为要找的是有值的格子
            if (this.cellsGrid[row][col] !== 0) {
              // 以下情况符合
              // 这个格子上面的格子是空的
              // 这个格子上面的格子和这个格子是一样的
              if (this.cellsGrid[row - 1][col] === 0) {
                this.logCell(this.cellsGrid[row][col], 'this cell can move up ，because the upper position of it is empty :')
                return resolve()
              } else if (this.cellsGrid[row - 1][col].level === this.cellsGrid[row][col].level) {
                this.logCell(this.cellsGrid[row][col], 'this cell can move up , because the value in its upper position is the same as itself :')
                return resolve()
              }
            }
          }
        }
        return reject(new Error('no cell can move up !'))
      })
    },
    // [移动检查] 检查是否可以向下移动
    canMoveDown () {
      return new Promise((resolve, reject) => {
        // 打印矩阵
        this.logCellGrid()
        // 找符合要求的节点
        // 省略最下面一行
        for (let row = 0; row < this.cellNum - 1; row++) {
          for (let col = 0; col < this.cellNum; col++) {
            // 首先这个 cell 不可以是 0, 因为要找的是有值的格子
            if (this.cellsGrid[row][col] !== 0) {
              // 以下情况符合
              // 这个格子下面的格子是空的
              // 这个格子下面的格子和这个格子是一样的
              if (this.cellsGrid[row + 1][col] === 0) {
                this.logCell(this.cellsGrid[row][col], 'this cell can move down ，because the lower position of it is empty :')
                return resolve()
              } else if (this.cellsGrid[row + 1][col].level === this.cellsGrid[row][col].level) {
                this.logCell(this.cellsGrid[row][col], 'this cell can move down , because the value in its lower position is the same as itself :')
                return resolve()
              }
            }
          }
        }
        return reject(new Error('no cell can move down !'))
      })
    },
    // [移动检查] 检查是否可以向左移动
    canMoveLeft () {
      return new Promise((resolve, reject) => {
        // 打印矩阵
        this.logCellGrid()
        // 找符合要求的节点
        // 省略最左边一列
        for (let row = 0; row < this.cellNum; row++) {
          for (let col = 1; col < this.cellNum; col++) {
            // 首先这个 cell 不可以是 0, 因为要找的是有值的格子
            if (this.cellsGrid[row][col] !== 0) {
              // 以下情况符合
              // 这个格子左面的格子是空的
              // 这个格子左面的格子和这个格子是一样的
              if (this.cellsGrid[row][col - 1] === 0) {
                this.logCell(this.cellsGrid[row][col], 'this cell can move left ，because the left side position of it is empty :')
                return resolve()
              } else if (this.cellsGrid[row][col - 1].level === this.cellsGrid[row][col].level) {
                this.logCell(this.cellsGrid[row][col], 'this cell can move left , because the value in its left side position is the same as itself :')
                return resolve()
              }
            }
          }
        }
        return reject(new Error('no cell can move left !'))
      })
    },
    // [移动检查] 检查是否可以向右移动
    canMoveRight () {
      return new Promise((resolve, reject) => {
        // 打印矩阵
        this.logCellGrid()
        // 找符合要求的节点
        // 省略最右边一列
        for (let row = 0; row < this.cellNum; row++) {
          for (let col = 0; col < this.cellNum - 1; col++) {
            // 首先这个 cell 不可以是 0, 因为要找的是有值的格子
            if (this.cellsGrid[row][col] !== 0) {
              // 以下情况符合
              // 这个格子右面的格子是空的
              // 这个格子右面的格子和这个格子是一样的
              if (this.cellsGrid[row][col + 1] === 0) {
                this.logCell(this.cellsGrid[row][col], 'this cell can move right ，because the right side position of it is empty :')
                return resolve()
              } else if (this.cellsGrid[row][col + 1].level === this.cellsGrid[row][col].level) {
                this.logCell(this.cellsGrid[row][col], 'this cell can move right , because the value in its right side position is the same as itself :')
                return resolve()
              }
            }
          }
        }
        return reject(new Error('no cell can move right !'))
      })
    },
    // [上] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    handlerUp () {
      this.logKey('handlerUp')
      // 点亮下面的指示灯 并隔一段时间后熄灭
      this.isUp = true
      setTimeout(() => {
        this.isUp = false
      }, 100)
      this.canMoveUp()
        .then(() => {
          console.log('can')
        })
        .catch(err => console.warn(err))
    },
    // [下] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    handlerDown () {
      this.logKey('handlerDown')
      // 点亮下面的指示灯 并隔一段时间后熄灭
      this.isDown = true
      setTimeout(() => {
        this.isDown = false
      }, 100)
      this.canMoveDown()
        .then(() => {
          console.log('can')
        })
        .catch(err => console.warn(err))
    },
    // [左] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    handlerLeft () {
      this.logKey('handlerLeft')
      // 点亮下面的指示灯 并隔一段时间后熄灭
      this.isLeft = true
      setTimeout(() => {
        this.isLeft = false
      }, 100)
      this.canMoveLeft()
        .then(() => {
          console.log('can')
        })
        .catch(err => console.warn(err))
    },
    // [右] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    handlerRight () {
      this.logKey('handlerRight')
      // 点亮下面的指示灯 并隔一段时间后熄灭
      this.isRight = true
      setTimeout(() => {
        this.isRight = false
      }, 100)
      this.canMoveRight()
        .then(() => {
          console.log('can')
        })
        .catch(err => console.warn(err))
    },
    // [调试] 打印一个黑色的块 主要是用来显示进行了哪种操作
    logKey (text) {
      console.log(`%c${text}`, 'font-size: 20px; font-weight: bold; padding: 10px; background-color: #333; border-radius: 4px; color: #FFF;')
    },
    // [调试] 打印矩阵
    logCellGrid (title = 'now cellsGrid is :') {
      console.group(title)
      console.log('|', Array(this.cellNum).fill('-').join('---'), '|')
      this.cellsGrid.forEach(row => {
        console.log('|', row.map(e => e.level ? e.level : e).join('   '), '|')
        console.log('|', Array(this.cellNum).fill('-').join('---'), '|')
      })
      console.groupEnd()
    },
    // [调试] 打印单个 cell
    logCell (cell, title) {
      console.group(title)
      console.table([_clonedeep(cell)])
      const el = this.$refs[`game-cell-${cell.id}`]
      if (el) {
        console.log('the cell in document is :')
        console.log(el[0])
      }
      console.groupEnd()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './theme/default.scss';
</style>
