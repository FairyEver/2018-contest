export default {
  props: {
    // 几乘几的格子
    cellNum: {type: Number, required: false, default: 4},
    // 格子之间的间距
    cellMargin: {type: Number, required: false, default: 6},
    // 设置 等级
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
    // 设置 在游戏开始的时候有多少个方块
    gameStartCellNum: {type: Number, required: false, default: 2}
  }
}
