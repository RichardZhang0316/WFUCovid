var wxCharts = require("../../utils/wxcharts.js"); //相对路径
var util = require('../../utils/util.js');
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
Page({
  data: {
    msgList: [{
        title: "2021年9月9日─────北卡罗来纳州州长罗伊·库珀敦促各学校遵守佩戴口罩的规定。目前，109个学区(覆盖超过95%的学生)强制要求学生在室内戴口罩，比三周前有所增加。开学的前几周，学生群体中出现了更多的COVID感染病例。"
      },
      {
        title: "2021年8月16日─────WFU2021秋季学期规定：从2021年秋季学期开始，维克森林大学已经尽最大努力以拥有一个全面运作且安全的校园。从教职工、学生和学生家长的反馈中中，学校了解到大家对新冠病毒变体德尔塔的各种担忧。因此，学校制定了一系列关于公共卫生和预防新冠疫情的指导方针和要求，以应对目前的疫情和对大家对德尔塔变体的担忧。"
      },
      {
        title: "2021年8月12日─────WFU口罩要求：大学管理人员表示，从8月16日开始，无论疫苗接种情况如何，所有学生和教职人员在学校室内都必须佩戴口罩。"
      },
      {
        title: "长期有效─────福赛斯郡（维克森林大学所在郡）政府口罩政策：进入福赛斯郡所有大楼的人员都必须佩戴口罩。没有口罩的人将被赠与一副口罩。为了防止福赛斯郡新冠病毒和德尔塔变体的大规模传播，疾病控制中心建议所有人在室内公共环境中都佩戴口罩。接种疫苗仍然是预防严重病情和减缓病毒传播的最佳途径。福赛斯郡社区广泛提供免费COVID-19疫苗接种服务，包括福赛斯县公共卫生部和CVS。"
      },
      {
        title: "2021年9月29日─────温斯顿塞勒姆市长艾伦·乔恩斯下令，所有将要参加在鲍曼·格雷体育场举行的卡罗莱纳集市和温斯顿塞勒姆州立大学橄榄球比赛的人都要戴口罩。这一命令契合了市议会决议，即要求顾客在大规模聚集活动中戴口罩。此市长令适用于任何参与博览会和足球比赛的人。违反这一命令的人会被驱离博览会和比赛，且没有退款或任何形式的赔偿。该命令含有七项豁免，包括宗教信仰、残疾、和精神问题。"
      },
      {
        title: "2021年8月20日─────市长艾伦·乔恩斯修改了他在全市范围内颁布的戴口罩命令。他允许了表演者和公众演讲者在距离观众至少10英尺的地方摘掉口罩。市长说：“在咨询了当地医学界，包括福赛斯县公共卫生局长约书亚·斯威夫特和传染病专家克里斯托弗·奥尔博士后，我决定修改要求演讲者和表演家在离观众20英尺的地方表演减少到10英尺”。"
      },
      {
        title: "2021年8月16日─────市长艾伦·乔恩斯下令，除个人住宅外，人员在所有建筑物内都必须佩戴口罩。这包括杂货店、药房、企业、餐馆、酒吧、健身房和健身中心。该命令列出了公民不佩戴口罩的14种情况，包括宗教信仰、医疗或行为状况或残疾、饮食或剧烈运动。由于担心如果不采取任何措施，由德尔塔变种引起的病例激增可能会让城市的医院不堪重负，市长发布了这一命令。他说：“我是被福赛斯县卫生局长和其他医学专家要求采取这一措施的。我认为，鉴于COVID-19病例的惊人增长，这一措施是有必要的“。2021年5月，随着疫苗的推出，COVID-19病例数量下降，市长取消了之前的口罩订单。然而更具传染性的德尔塔变种病毒扭转了这一趋势，导致温莎市和北卡罗来纳州其他城市恢复了强制佩戴口罩的命令。"
      }
    ],
    banner_data: {}
  },
  getAllData(mwcToken) {
    var that = this;
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getToken',
    }).then(res => {
      var mwcToken = res.result
      /*
        获取累计确诊数据
      */
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'getTotalData',
        // 传递给云函数的event参数
        data: {
          mwcToken: mwcToken
        }
      }).then(res => {
        that.setData({
          'banner_data.total': res.result
        })
      }).catch(err => {
        // handle error
      })

      /*
        获取累计治愈数据
      */
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'getTotalCureData',
        // 传递给云函数的event参数
        data: {
          mwcToken: mwcToken
        }
      }).then(res => {
        that.setData({
          'banner_data.total_cure': res.result
        })
      }).catch(err => {
        // handle error
      })

      /*
          获取当前剩余确诊数据
        */
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'getNowData',
        // 传递给云函数的event参数
        data: {
          mwcToken: mwcToken
        }
      }).then(res => {
        that.setData({
          'banner_data.now': res.result
        })
      }).catch(err => {
        // handle error
      })

      /*
        获取每日数据，并绘图
      */
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'getDayData',
        // 传递给云函数的event参数
        data: {
          mwcToken: mwcToken
        }
      }).then(res => {
        this.createWxChart(res.result.day_data_date, res.result.day_data_total_number)
      }).catch(err => {
        // handle error
      })
    }).catch(err => {
      // handle error
    })
  },

  createWxChart(categories, data) {
    new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      // 以后x轴的时间限度应改成可以缩放调整的 数据自动更新未做
      categories: categories,
      series: [{
        name: '全校新增确诊',
        data: data,
        stroke: false,
        color: "#9E7E38"
      }],
      yAxis: {
        format: function (val) {
          return val;
        }
      },
      width: windowWidth,
      height: 250
    });
    wx.hideLoading({
      success: (res) => {},
    })
  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '维克森林疫情数据监测'
        })
      }, 2000)
    })
    return {
      title: '维克森林疫情数据监测',
      path: '/page/user?id=123',
      promise
    }
  },
  onShareTimeline() {
    title: '维克森林疫情数据监测',
    path;
    '/page/user?id=123',
    promise
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //日期显示
    var time = util.formatTimeNEW(new Date())
    //为页面中time赋值
    this.setData({
      time: time
    })

    // 请求最新疫情数据
    wx.showLoading({
      title: '正在加载',
    })
    this.getAllData()
  },
})

function getDay(num) {
  var today = new Date();
  var nowTime = today.getTime();
  var ms = 24 * 3600 * 1000 * num;
  today.setTime(parseInt(nowTime + ms));

  var oMoth = (today.getMonth() + 1).toString();
  var oDay = today.getDate().toString();
  return oMoth + '月' + oDay + '日';
}

let windowWidth = 0;
try {
  let res = wx.getSystemInfoSync();
  windowWidth = res.windowWidth;
} catch (e) {
  // do something when get system info failed
  console.log("草");
}