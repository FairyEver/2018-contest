import _clonedeep from 'lodash.clonedeep'
import _random from 'lodash.random'
import _get from 'lodash.get'
export default {
  data () {
    return {
      // cell 数据 一维数组表示 视图根据这个数据改变
      cells: [],
      // cell 数据 二维数组表示
      // cells 由 cellsGrid 得到
      // 上面的过程不可逆向
      cellsGrid: [],
      // 产生一个 cell 就累加1
      cellId: 0
    }
  },
  methods: {
    // 新建一个 cell
    cellCreat ({position = 0, level = 1} = {}) {
      // 得到现在所有还可以用的位置
      const usefulPostion = () => {
        const available = [].concat(...this.cellsGrid).reduce((all, e, index) => {
          if (e === 0) {
            all.push(index + 1)
          }
          return all
        }, [])
        return available[_random(available.length - 1)]
      }
      // 位置
      const _position = position || usefulPostion()
      // 位置转坐标
      const {x, y} = this.n2xy(_position)
      // 设置 cellsGrid
      this.cellsGrid[x][y] = {
        level: level,
        id: this.cellId++
      }
      // 打印
      this.__printCellsGrid()
    },
    // 初始化一个空的 cellsGrid
    cellsGridInit () {
      const row = Array(this.cellNum).fill(0)
      this.cellsGrid = [...Array(this.cellNum)].map(e => _clonedeep(row))
      // 打印
      this.__printCellsGrid('初始化后')
    },
    // 更新 cellsGrid => cells
    updateView () {
      this.cells = [].concat(...this.cellsGrid).map((e, index) => ({
        position: index + 1,
        id: e.id,
        level: e.level
      })).filter(e => e.level)
      // 打印
      this.__printCells()
    },
    // [移动检查] 检查是否可以向上移动
    canMoveUp () {
      return new Promise((resolve, reject) => {
        // 打印矩阵
        this.__printCellsGrid()
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
                this.__printCell(this.cellsGrid[row][col], 'this cell can move up ，because the upper position of it is empty :')
                return resolve()
              } else if (this.cellsGrid[row - 1][col].level === this.cellsGrid[row][col].level) {
                this.__printCell(this.cellsGrid[row][col], 'this cell can move up , because the value in its upper position is the same as itself :')
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
        this.__printCellsGrid()
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
                this.__printCell(this.cellsGrid[row][col], 'this cell can move down ，because the lower position of it is empty :')
                return resolve()
              } else if (this.cellsGrid[row + 1][col].level === this.cellsGrid[row][col].level) {
                this.__printCell(this.cellsGrid[row][col], 'this cell can move down , because the value in its lower position is the same as itself :')
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
        this.__printCellsGrid()
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
                this.__printCell(this.cellsGrid[row][col], 'this cell can move left ，because the left side position of it is empty :')
                return resolve()
              } else if (this.cellsGrid[row][col - 1].level === this.cellsGrid[row][col].level) {
                this.__printCell(this.cellsGrid[row][col], 'this cell can move left , because the value in its left side position is the same as itself :')
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
        this.__printCellsGrid()
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
                this.__printCell(this.cellsGrid[row][col], 'this cell can move right ，because the right side position of it is empty :')
                return resolve()
              } else if (this.cellsGrid[row][col + 1].level === this.cellsGrid[row][col].level) {
                this.__printCell(this.cellsGrid[row][col], 'this cell can move right , because the value in its right side position is the same as itself :')
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
      this.printKey('handlerUp')
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
      this.printKey('handlerDown')
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
      this.printKey('handlerLeft')
      // 点亮下面的指示灯 并隔一段时间后熄灭
      this.isLeft = true
      setTimeout(() => {
        this.isLeft = false
      }, 100)
      this.canMoveLeft()
        .then(() => {
          // 向左移动
          // 判断一个位置是否可以成为目的位置的标准
          // 1 这个位置应该是空的
          // 2 这个位置或者和移动的元素一样
          // 3 之间不能有东西
          for (let row = 0; row < this.cellNum; row++) {
            for (let col = 1; col < this.cellNum; col++) {
              // 找到一个非空位置
              if (this.cellsGrid[row][col] !== 0) {
                // 找这个位置左侧的位置
                for (let _col = 0; _col < col; _col++) {
                  // 通过的情况 1 这个位置为0 并且没有障碍物
                  // 通过的情况 2 这个位置和移动的对象一样 并且没有障碍物
                  if (this.cellsGrid[row][_col] === 0 && this.unobstructedRow(row, col, _col)) {
                    // this.moveCell(row, col, row, _col)
                    continue
                  } else if (_get(this.cellsGrid[row][_col], 'level', 'new') === _get(this.cellsGrid[row][_col], 'level', 'old') && this.unobstructedRow(row, col, _col)) {
                    // this.removeCell(row, _col)
                    // this.moveCell(row, col, row, _col)
                    // this.sumCell(row, _col)
                    continue
                  }
                }
              }
            }
          }
          // 添加一个 cell
          this.cellCreat()
          // 更新视图
          this.updateView()
        })
        .catch(err => console.warn(err))
    },
    // [右] 不管是触摸 还是按键 还是点击 最后触发的都是这里的方法
    handlerRight () {
      this.printKey('handlerRight')
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
    }
  }
}
