// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//引入request-promise用于做网络请求
var request = require('request-promise');

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function getDayData(mwcToken) {
  return new Promise(resolve => {
    request({
        url: 'https://7a5bf1c6ac334308bed3eaadd68e7e0e.pbidedicated.windows.net/webapi/capacities/7A5BF1C6-AC33-4308-BED3-EAADD68E7E0E/workloads/QES/QueryExecutionService/automatic/public/query',
        method: "POST",
        body: {"version":"1.0.0","queries":[{"Query":{"Commands":[{"SemanticQueryDataShapeCommand":{"Query":{"Version":2,"From":[{"Name":"p","Entity":"public_release1_metrics_14_rpt_vw","Type":0}],"Select":[{"Column":{"Expression":{"SourceRef":{"Source":"p"}},"Property":"Date"},"Name":"public_release1_metrics_14_rpt_vw.Date"},{"Aggregation":{"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"p"}},"Property":"NumPositiveTest"}},"Function":0},"Name":"Sum(public_release1_metrics_14_rpt_vw.NumPositiveTest)"},{"Column":{"Expression":{"SourceRef":{"Source":"p"}},"Property":"Category"},"Name":"public_release1_metrics_14_rpt_vw.Category"}],"OrderBy":[{"Direction":1,"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"p"}},"Property":"Date"}}}]},"Binding":{"Primary":{"Groupings":[{"Projections":[0,1]}]},"Secondary":{"Groupings":[{"Projections":[2]}]},"DataReduction":{"DataVolume":4,"Primary":{"Window":{"Count":200}},"Secondary":{"Top":{"Count":60}}},"Version":1},"ExecutionMetricsKind":1}}]},"CacheKey":"{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"p\",\"Entity\":\"public_release1_metrics_14_rpt_vw\",\"Type\":0}],\"Select\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p\"}},\"Property\":\"Date\"},\"Name\":\"public_release1_metrics_14_rpt_vw.Date\"},{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p\"}},\"Property\":\"NumPositiveTest\"}},\"Function\":0},\"Name\":\"Sum(public_release1_metrics_14_rpt_vw.NumPositiveTest)\"},{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p\"}},\"Property\":\"Category\"},\"Name\":\"public_release1_metrics_14_rpt_vw.Category\"}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"p\"}},\"Property\":\"Date\"}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0,1]}]},\"Secondary\":{\"Groupings\":[{\"Projections\":[2]}]},\"DataReduction\":{\"DataVolume\":4,\"Primary\":{\"Window\":{\"Count\":200}},\"Secondary\":{\"Top\":{\"Count\":60}}},\"Version\":1},\"ExecutionMetricsKind\":1}}]}","CacheOptions":7,"QueryId":"","ApplicationContext":{"DatasetId":"ecb375d0-c062-4a1b-b2b3-cb1259fa2406","Sources":[{"ReportId":"43602a56-3597-4d1e-8ab8-0cb0f55d0609","VisualId":"b928a9d1374bbc0ff29d"}]}}],"cancelQueries":[],"modelId":4687744,"userPreferredLocale":"en"},
        json: true,
        headers: {
          "authorization": "MWCToken " + mwcToken,
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 Edg/93.0.961.52'
        }
      })
      .then(function (res) {
        console.log('****************')
        var day_data_array = res['results'][0]['result']['data']['dsr']['DS'][0]['PH'][0]['DM0']
        var result_day_data_date = []
        var result_day_data_total_number = []
        day_data_array.forEach(function (currentValue, index, arr) {
          result_day_data_date.push(new Date(currentValue['G0']).Format('MM-dd'))
          result_day_data_total_number.push(currentValue['X'][0]['M0'] | 0 + currentValue['X'][1]['M0'] | 0)
        })
        // console.log(result_day_data_array)
        console.log('****************')
        resolve({
          day_data_date: result_day_data_date,
          day_data_total_number: result_day_data_total_number
        })
      })
  })
}

// 云函数入口函数
exports.main = async (event, context) => {
  return await getDayData(event.mwcToken)
}