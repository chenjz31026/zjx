// index.js

Page({
  data: {
		classarr:['软件工程导论','大学物理','大学英语'],
		class:'软件工程导论',
		icpath:'/static/icon/select.png'
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
	},
	randomSelect() {
		const value=this.data.inputValue;
		if(value<1 || value>5){
			wx.showToast({
				title: '人数不得超过5人',
				icon:'none',
				mask:true,
				duration:1000
			})
		}
		else{
			for(var i=0;i<value;++i){
				const randomNumber = Math.floor(Math.random() * 10) + 1;
				console.log('随机数：', randomNumber);
			}
		}
	},
	clearInput(){
		this.setData({
			inputValue:''
		});
	},
	clearNummin(){
		this.setData({
			zdMin:''
		});
	},
	clearNummax(){
		this.setData({
			zdMax:''
		});
	},
	clearTimem(){
		this.setData({
			minute:''
		});
	},
	clearTimes(){
		this.setData({
			second:''
		});
	},
})
