const virtualDataList = (cases) => {
  const virtualDataList = []
  for(let i = 0; i < cases; i++) {
    const data = (Math.random() * 5) - 2
    virtualDataList.push(Math.floor(data))
  }  
  return virtualDataList
}

export { virtualDataList }