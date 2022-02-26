import Graph from './lib/Graph'
import { virtualDataList } from './src/js/virtualDataList'


const graph1 = new Graph('graph1', {
  data: virtualDataList(100),
  barColor: 'cornflowerblue'
})
const graph2 = new Graph('graph2', {
  data: virtualDataList(100),
  barColor: 'salmon'
})
const graph3 = new Graph('graph3', {
  data: virtualDataList(100),
  barColor: 'khaki'
})