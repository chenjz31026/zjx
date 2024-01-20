// index.js
const db = wx.cloud.database()
Page({
  data: {
		classarr:[],
		class:'',
		icpath:'/static/icon/select.png'
	},
	onLoad(){
		db.collection('tch_main').get({
			success:res =>{
				this.setData({
					classarr:res.data[0].classarr,
					class: res.data[0].Class
				})
			}
		})
	},
	change(){
		this.setData({
			icpath:'/static/icon/select2.png'
		}),
		wx.showActionSheet({
			itemList:this.data.classarr,
			success:res =>{
				let index = res.tapIndex
				this.setData({
					class:this.data.classarr[index]
				})
			},
			complete:res =>{
				this.setData({
					icpath:'/static/icon/select.png'
				})
			}
		})
	}
})
