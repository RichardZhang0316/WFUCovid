Page({
    onShareAppMessage() {
        const promise = new Promise(resolve => {
          setTimeout(() => {
            resolve({
              title: 'WFU Covid Dashboard数据说明'
            })
          }, 2000)
        })
        return {
          title: '温莎市疫情数据监测数据说明',
          path: '/page/user?id=123',
          promise 
        }
    },
})