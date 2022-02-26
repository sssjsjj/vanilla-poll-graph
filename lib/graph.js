class Graph {
  constructor(id, { data = [], points = 5, barColor = 'black' }) {
    this.data = data
    this.answerMap = new Map([
      ['98', '매우 아니다'],
      ['99', '아니다'],
      ['100', '보통이다'],
      ['101', '그렇다'],
      ['102', '매우 그렇다']
    ])
    this.points = points,
    this.barColor = barColor,

    this.init(id)
  }

  init(id) {
    this.el = document.getElementById(id)
    this.eachAnswerLengthMap = this.eachAnswerLengthMap()
    this.answerFirstKey = this.answerFirstKey()
    this.maxData = this.maxData()
    this.maxPoint = this.maxPoint()
    this.dataAverage = this.dataAverage()

    this.drawGraphic()

    console.log(this)
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

  toPercent(key) {
    const result = []
    const answer = this.eachAnswerLengthMap.get(key)
    const percent = (answer / this.maxPoint) * 100
    result.push(percent.toFixed(1))
    return result
  }

  dataAverage() {
    const eachTotalPercent = this.eachTotalPercent()
    const totalPercent = eachTotalPercent.reduce((acc, crr) => acc += crr)
    const dataAverage = totalPercent / this.data.length
    return dataAverage.toFixed(2)
  }
  
  eachTotalPercent() {
    const caseSize = this.answerMap.size
    const divide = caseSize - 1
    const eachPercent = 100 / divide
    const eachTotalPercent = []    
    for(let i = 0; i < caseSize; i++) {
      const key = this.answerFirstKey + i
      const answerLength = this.eachAnswerLengthMap.get(`${key}`)
      eachTotalPercent.push(answerLength * (eachPercent * i))
    }
    return eachTotalPercent
  }
  newEl(tagName, className) {
    const el = document.createElement(tagName)
    el.classList.add(className)
    return el
  }
  answerFirstKey() {
    return 100 - Math.floor(this.points / 2)
  }
  
  drawGraphic() {
    const elGraphArea = this.newEl('div', 'area-graph')

    elGraphArea.appendChild(this.elPoints())
    elGraphArea.appendChild(this.elGraph())   
    this.el.appendChild(elGraphArea)
    this.el.appendChild(this.elAverage())
  }

  elGraph() {
    const elGraph = this.newEl('dl', 'wrap-graph')
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
    elDataValue.style.width = `${this.toPercent(answer)}%`
    elDataValue.style.backgroundColor = this.barColor
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
      const elPointValue = this.newEl('span', 'value-point')
      elPointValue.innerText = this.points * i
      elPoint.appendChild(elPointValue)
      elPoints.appendChild(elPoint)
    }
    return elPoints
  }

  elAverage() {
    const elAverageWrap = this.newEl('div', 'wrap-average')
    const elAverage = this.newEl('p', 'average')
    const elAverageValue = this.newEl('span', 'value-average')
    elAverage.innerText = '평균'
    elAverageValue.innerText = `${this.dataAverage}%`
    elAverage.appendChild(elAverageValue)
    elAverageWrap.appendChild(elAverage)
    return elAverageWrap
  }
}

export default Graph