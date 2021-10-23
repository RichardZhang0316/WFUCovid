// pages/ForsythData/ForsythData.js
Page({
  data:{
    num1:0,
    num2:0,
    num3:0,
    num4:0,
    date:"",
  },
  onLoad(){
    wx.cloud.database().collection('ForsythData')
    .doc('8937eaa9615a601a0f766e4201bf62d2').get()
    .then(res=>{
      console.log("成功",res)
      this.setData({
        num1:res.data.newCases,
        num2:res.data.casesLast14Days,
        num3:res.data.totalCases,
        num4:res.data.totalDeaths,
        date:res.data.date,
      })
    })
    .catch(res=>{
      console.log("shibai",res)
    })
  },

    onShareAppMessage() {
        const promise = new Promise(resolve => {
          setTimeout(() => {
            resolve({
              title: '温莎市疫情数据监测'
            })
          }, 2000)
        })
        return {
          title: '温莎市疫情数据监测',
          path: '/page/user?id=123',
          promise 
        }
    },
//     data: {
//       longitude: -80.244217,
//       latitude: 36.099861,
//       markers:[]
//   },
  
//   /**
//   * 生命周期函数--监听页面初次渲染完成
//   */
//   onReady: function () {
//       this.mapCtx = wx.createMapContext('myMap')
//   },
})