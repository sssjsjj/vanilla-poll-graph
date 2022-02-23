/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./lib/Graph.js ***!
  \**********************/
/*
- 생성자 함수로 작업할 것.
- 하나의 문항(타이틀)을 가진다.
- 선택지는 5개이다. 3개인 케이스도 가능하도록 하면 좋을 것 같다.
- -2, -1, 0, 1, 2로 값을 받도록 하고 해당 값에 대한 명칭(매우아니다, 그렇다 등)은 타입에 따라 나누고 싶다.
- 최대값 바탕 - 5단위로 표시선을 그려준다. 단위는 설정할 수 있도록 하면 좋겠다. 노출여부도.
- 전체 평점을 백분율로 노출.

받을 값들은
그래프타입, 타이틀, 답변 타입, 표시선 단위,

로직 순서는
그래프 라벨 삽입 > 데이터 라벨 삽입 > 데이터 라벨 당 값 계산 후 삽입 > 값 평점 구하여 노출 > 제일 높은 테이터값에 해당하는 포인트 최대값 계산 > 최대값 기반으로 포인트 및 라인 삽입 > 
*/
class Graph {
  constructor(id, { label = '', data = [], points = 5 }) {
    this.label = label
    this.data = data
    this.answerMap = new Map([
      ['98', '매우 아니다'],
      ['99', '아니다'],
      ['100', '보통이다'],
      ['101', '그렇다'],
      ['102', '매우 그렇다']
    ])
    this.points = points
    
    this.init(id)
  }

  init(id) {
    this.el = document.getElementById(id)
    this.eachAnswerLengthMap = this.eachAnswerLengthMap()
    this.maxData = this.maxData()
    this.maxPoint = this.maxPoint()
    this.dataAverage = this.dataAverage()
    this.drawHTML()

    console.log(this)
  }
  newEl(tagName, className) {
    const el = document.createElement(tagName)
    el.classList.add(className)
    return el
  }
  drawHTML() {
    const elGraphArea = this.newEl('div', 'area-graph')
    // append
    elGraphArea.appendChild(this.elGraph())
    elGraphArea.appendChild(this.elPoints())
    elGraphArea.appendChild(this.elAverage())       
    this.el.appendChild(elGraphArea)
  }

  elGraph() {
    const elGraph = this.newEl('dl', 'graph')
    const elMainLabel = this.elMainLabel()
    const elAnswerWrap = this.elAnswerWrap()
    // append
    elGraph.appendChild(elMainLabel)
    elGraph.appendChild(elAnswerWrap)
    // return
    return elGraph
  }

  elMainLabel() {
    const elMainLabel = this.newEl('dt', 'label-main')
    const strMainLabel = this.el.dataset.graph
    elMainLabel.innerText = strMainLabel
    // return
    return elMainLabel
  }

  elAnswerWrap() {    
    const elAnswerWrap = this.newEl('div', 'wrap-answer')
    for(const answer of this.answerMap.keys()) {
      const elAnswer = this.newEl('dd', 'answer')
      elAnswer.appendChild(this.elAnswerLabel(answer))
      elAnswer.appendChild(this.elDataArea(answer))
      elAnswerWrap.appendChild(elAnswer)
    }
    return elAnswerWrap
  }

  elDataArea(answer) {
    const elDataArea = this.newEl('span', 'area-data')
    const elDataValue = this.newEl('span', 'value-data')
    elDataValue.innerText = this.eachAnswerLengthMap.get(answer)
    elDataArea.appendChild(elDataValue)
    return elDataArea
  }

  elAnswerLabel(answer) {
    const elAnswerLabel = this.newEl('span', 'label-answer')
    elAnswerLabel.innerText = this.answerMap.get(answer)
    return elAnswerLabel
  }

  elPoints() {
    const elPoints = this.newEl('ul', 'points')
    const pointsNum = this.maxPoint / this.points

    for(let i = 0; i <= pointsNum; i++) {
      const elPoint = this.newEl('li', 'point')
      elPoint.innerText = this.points * i
      elPoints.appendChild(elPoint)
    }
    return elPoints
  }

  elAverage() {
    const elPoints = this.newEl('ul', 'points')
    return elPoints
  }


  eachAnswerLengthMap() {
    const result = new Map()
    for(const data of this.data) {
      const key = `${100 + data}`
      result.get(key) === undefined
        ? result.set(key, 0)
        : result.set(key, result.get(key) + 1)      
    }
    return result
  }

  maxData() {
    const maxData = Math.max(...this.eachAnswerLengthMap.values())
    return maxData
  }
  
  maxPoint() {
    const rest = this.maxData % this.points
    const gap = rest === 0 ? 0 : this.points - rest
    const maxPoint = this.maxData + gap
    return maxPoint
  }
  
  dataAverage() {
    // -2 = 0
    // -1 = 25
    // 0 = 50
    // 1 = 75
    // 2 = 100
    const dataLength = this.data.length
    const caseSize = this.answerMap.size
    const divide = caseSize - 1
    const eachPercent = 100 / divide
    const cases = []
    for(let i = 0; i < caseSize; i++) {
      eachPercent
    }
    
    // return dataAverage
  }
}

const graph1 = new Graph('graph1', {
  data: [-1, -1, -1, -2, -2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, -1, -1, -1, -2, -2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2,-1, -1, -1, -2, -2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, -1, -1, -1, -2, -2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2,-1, -1, -1, -2, -2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, -1, -1, -1, -2, -2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2,-1, -1, -1, -2, -2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, -1, -1, -1, -2, -2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2]
  // answers: {},
  // points: 5,
})

// const graph1 = new Graph('graph1', {
//   label: ['오늘 먹은 메뉴는 맛있었나요?', '직원들의 서비스는 만족스러우셨나요?'],
//   data: [
//     [-1, -1, -1, -2, -2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
//     [-1, -1, -1, -1, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2]
//   ],
//   // answers: {},
//   // points: 5,
// })
// module.exports = graph
/******/ })()
;
//# sourceMappingURL=bundle.js.map