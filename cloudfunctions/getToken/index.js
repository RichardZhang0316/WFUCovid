// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//引入request-promise用于做网络请求
var request = require('request-promise');

function getToken() {
  return new Promise((resolve, reject) => {
    request('https://ourwayforward.wfu.edu/wp-json/wp/v2/powerbi/getToken')
      .then(function (res) {
        resolve(res.slice(1, -1))
      })
  })
}

function getMwcToken(token) {
  return new Promise(resolve => {
    request({
        url: 'https://wabi-us-east2-redirect.analysis.windows.net/explore/reports/43602a56-3597-4d1e-8ab8-0cb0f55d0609/modelsAndExploration?preferReadOnlySession=true',
        method: "GET",
        json: true,
        headers: {
          "Authorization": "Bearer " + token,
        }
      })
      .then(function (res) {
        resolve(res['exploration']['mwcToken'])
      })
  })
}

//启动
var run_spider = new Promise(function (resolve, reject) {
  resolve();
});

// 云函数入口函数
exports.main = async (event, context) => {
  return await run_spider.then(getToken).then(getMwcToken)
}