const path = require('path');

module.exports = {
  // 해당 파일 대상으로 웹팩이 빌드를 수행
  entry: './lib/Graph.js', 
  output: {
    // path.resolve() - 인자로 넘어온 경로들을 조합하여 유효한 파일 경로를 만들어주는 Node.js API
    path: path.resolve(__dirname, 'dist/js'), // output 저장될 경로
    /* 
      Filename Options
      - [name].bundle.js : 결과 파일 이름에 entry 속성을 포함하는 옵션
        >> main.bundle.js
      - [id].bundle.js : 결과 파일 이름에 웹팩 내부적으로 사용하는 모듈 ID를 포함하는 옵션
        >> main.bundle.js
      - [name].[hash].bundle.js : 매 빌드시 마다 고유 해시 값을 붙이는 옵션
        >> main.d73da0c94c84b435cf5a.bundle.js
      - [chunkhash].bundle.js : 웹팩의 각 모듈 내용을 기준으로 생생된 해시 값을 붙이는 옵션
        >> 0cceb15872bc1b4a25af.bundle.js
    */
    filename: 'bundle.js' // output 파일 이름
  },
  // 로더(Loader)는 웹팩이 웹 애플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와주는 속성
  // 엔트리나 아웃풋 속성과는 다르게 module라는 이름을 사용
  module: {
    rules: [
      {
        test: /\.js$/, //로더를 적용할 파일 유형 (일반적으로 정규 표현식 사용)
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: { // 해당 파일에 적용할 로더의 이름
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
      }
    ],
    // 플러그인(plugin)은 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성.
    // 로더랑 비교하면 로더는 파일을 해석하고 변환하는 과정에 관여하는 반면, 플러그인은 해당 결과물의 형태를 바꾸는 역할.
    // 플러그인의 배열에는 생성자 함수로 생성한 객체 인스턴스만 추가될 수 있습니다.
    // plugins: []
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
}