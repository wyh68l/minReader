// import { ref,reactive,toRefs,onMounted } from 'vue'
export default {
	data(){
		return {
			statusBar:0,
			screenHeight:99
		}
	},
	created(){
		this.getSystemInfo();
	},
	methods:{
		 getSystemInfo(){
			uni.getSystemInfo({
				success:(e)=>{
					this.statusBar = e.statusBarHeight
					this.screenHeight = e.screenHeight
					// console.log(e)
					// #ifndef MP
					if(e.platform == 'android') {
						this.statusBar = e.statusBarHeight + 50+'px'
					}else {
						this.statusBar = e.statusBarHeight + 45+'px'
					}
					// #endif

					// #ifdef MP-WEIXIN
					let menuButtonObject = wx.getMenuButtonBoundingClientRect();
					this.statusBar = menuButtonObject.top+'px';//胶囊按钮与顶部的距离
					// #endif

					// #ifdef MP-ALIPAY
					this.statusBar = e.statusBarHeight + e.titleBarHeight+'px'
					// #endif
				}
			})
		},




	}
}
