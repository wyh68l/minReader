<template>
	<view class="content">
		<view class="页面配置">
			<van-form @submit="formSubmit">
				<van-cell-group inset>
					<van-field label="规则名" isLink>
						<template #input>
							<picker
											mode="selector"
											:range="state.bookRules"
											range-key="rulesName"
											:value="state.selectIndex"
											@cancel="state.showPicker = false"
											@change="onConfirm"
							>
								<view>{{state.bookRules.length?state.bookRules[state.selectIndex].rulesName:''}}</view>
							</picker>
						</template>
					</van-field>

					<!--<van-cell title="规则名" value-class="cellValue" :center="true">-->
						<!--&lt;!&ndash; 使用 title 插槽来自定义标题 &ndash;&gt;-->
						<!--<template #value>-->
							<!--<picker-->
											<!--mode="selector"-->
											<!--:range="state.bookRules"-->
											<!--range-key="rulesName"-->
											<!--:value="state.selectIndex"-->
											<!--@cancel="state.showPicker = false"-->
											<!--@change="onConfirm"-->
							<!--&gt;-->
								<!--<view>{{state.bookRules[state.selectIndex].rulesName}}</view>-->
							<!--</picker>-->
						<!--</template>-->
					<!--</van-cell>-->
					<!--<van-field-->
									<!--v-model="formData.rulesName"-->
									<!--label="规则名"-->
									<!--placeholder="请选择规则"-->
									<!--@tap="state.showPicker = true"-->
									<!--readonly-->
									<!--is-link-->
					<!--&gt;-->
					<!--</van-field>-->
					<van-field label="书名">
						<template #input>
							  <input v-model="formData.name" placeholder="请填写小说书名" />
						</template>
					</van-field>
					<van-field label="小说网址">
						<template #input>
							  <input v-model="formData.url" placeholder="请填写小说网址" />
						</template>
					</van-field>
					<div class="btnList">
						<van-button round block @tap="onSubmit(formData.url,'catalog')">本地下载</van-button>
					</div>
				</van-cell-group>
			</van-form>
			<div style="margin: 16px;">
				<van-button round block type="danger" @tap="delRule" v-if="state.name">删除书籍规则</van-button>
			</div>
			<div style="margin: 16px;">
				<van-button round block type="danger" @tap="delBook" v-if="state.name">删除本地书籍</van-button>
			</div>
			<div style="margin: 16px;">
				<van-button round block type="primary" @tap="saveRule">保存书籍规则</van-button>
			</div>
			<div style="margin: 16px;">
				<van-button round block type="primary" @tap="saveBookContent">保存书籍到本地</van-button>
			</div>
		</view>
	</view>

	<!--<van-popup v-model:show="state.showPicker" round position="bottom">-->
		<!---->
	<!--</van-popup>-->

</template>

<script lang="ts" setup>
	import {sendCustomReq} from '@/serves/main'
	import { ref, reactive, toRefs, computed, Ref, watchEffect,onMounted, } from "vue";
	import { useRoute, useRouter } from 'vue-router'
	import { onLoad } from '@dcloudio/uni-app';
	const state = reactive({
		name:'',
		selectIndex:0,
		showPicker:false,
		bookRules:JSON.parse(uni.getStorageSync('bookRules') || '[]'),
		booksList:JSON.parse(uni.getStorageSync('booksList') || '[]'),
		currentRules:'',//目录正则
		currentRules2:'',//正文正则
		downBookData:{
			catalog:[],
			bookContent:[],
			bookName:''
		}
	})
	const formData = reactive({
		rulesName:'',
		name:'',
		url:'https://www.biqudu.net/40_40517/',
	});

	const route = useRoute()

	onLoad(options => {
		initFormData(options);
	})


	onMounted(() => {

	})

	const formSubmit = (e)=>{
		console.log(e)
	}

	const initFormData = (options)=>{
		if(options && options.name){
			state.name = options.name
			Object.assign(formData,state.booksList.find(item=>item.name === state.name))
			let value = state.booksList.findIndex(item=>item.name === state.name)
			onConfirm({detail:{value}})
		}
	}
	const changeBook = (e)=>{
		// formData.name = e.detail.value
		console.log(e)
	}

	const onConfirm = (event) => {
		state.selectIndex = event.detail.value
		formData.rulesName = state.bookRules[state.selectIndex].rulesName;
		state.showPicker = false;
		state.currentRules = state.bookRules.find(item=>{return item.rulesName === formData.rulesName})?.rules
		state.currentRules2 = state.bookRules.find(item=>{return item.rulesName === formData.rulesName})?.rules2
	};

	//删除小说规则
	const delRule = () => {
		let index = state.booksList.findIndex(item=>item.name === state.name)
		if(index !== -1){
			state.booksList.splice(index,1)
			uni.setStorageSync('booksList',JSON.stringify(state.booksList))
			uni.showToast({title:'删除规则成功！'})
			setTimeout(()=>{uni.navigateBack()},1000)
		}
	};
	//删除本地小说
	const delBook = () => {
		let arr = JSON.parse(uni.getStorageSync('downBookData') || '[]') || []
		let index = arr.findIndex(item=>item.bookName === state.name)
		if(index !== -1){
			arr.splice(index,1)
			uni.setStorageSync('downBookData',JSON.stringify(arr))
			uni.showToast({title:'删除规则成功！'})
			setTimeout(()=>{uni.navigateBack()},1000)
		}
	};

	//获取小说内容
	const onSubmit = (url,type)=>{
		return new Promise((resolve,reject)=>{
			sendCustomReq(`${url}`).then(res=>{
				if(res){
					if(type === 'catalog'){
						state.downBookData.bookName = formData.name
						matchCatalog(res)
						resolve && resolve()
					}else {
						resolve && resolve(res)
					}
				}else{
					reject && reject(false)
					wx.showToast({
						title: '诶呀,好疼',
						icon: 'none',
						duration: 2000
					})
				}
			}).catch(err=>{
				console.log(err)
				reject && reject(false)
				wx.showToast({
					title: '请求出错，请重试！',
					icon: 'none',
					duration: 2000
				})
			})
		})

	}

	//轮询获取小说正文
	const downBookDataMed = async (link)=>{
		let result = await onSubmit(link,'content')
		if(result){
			matchContent(result)
		}else {
			wx.showToast({
				title: '规则匹配出错，请检查规则！',
				icon: 'none',
				duration: 2000
			})
			throw new Error();
		}
	}

	//匹配小说正文
	const matchContent = (res = '')=>{
		let regexp = new RegExp(state.currentRules2);
		let text = res;
		let content = text.match(regexp);
		state.downBookData.bookContent.push(content?content.groups.content:'')
		console.log(state.downBookData)
	}

	//保存小说到本地
	const saveBookContent = ()=>{
		if(!state.downBookData.bookContent.length){
			uni.showToast({title:'请先下载书籍再保存！',icon:"none"})
			return false
		}
		let arr = JSON.parse(uni.getStorageSync('downBookData') || '[]')
		if(arr && arr.length){
			let temp = {};
			let name = state.name || formData.name

			temp = arr.find((item,index)=>{
				if(item.name == name){
					arr[index] = state.downBookData
				}
				return item.name == name
			})
			if(!temp && !state.name){arr.push(state.downBookData)}
			uni.setStorageSync('downBookData',JSON.stringify(arr))
		}else {
			let arr = [];
			arr.push(state.downBookData)
			console.log(arr)
			uni.setStorageSync('downBookData',JSON.stringify(arr))
		}
		uni.showToast({title:'保存成功！',icon:"success"})
		setTimeout(()=>{uni.navigateBack();},1500)
	}

	//匹配小说目录
	const matchCatalog = (res)=>{
		let regexp = new RegExp(state.currentRules,'g');
		let regexp2 = new RegExp(state.currentRules);
		let catalogArr = [];
		let text = res;
		let list = text.match(regexp);
		if(list && list.length){
			list.forEach(item=>{
				let temp = item.match(regexp2)
				let link = temp?temp.groups.link.split('/')[2]:''
				catalogArr.push({
					link:formData.url+link,
					title:temp?temp.groups.title:'',
				})
			})
		}
		state.downBookData.catalog = catalogArr || []
		if(state.downBookData.catalog.length){
			state.downBookData.catalog.slice(0,3).forEach(item=>{
				try {
					console.log(item)
					downBookDataMed(item.link)
				}catch (e) {
					throw new Error();
				}
			})
		}else {
			uni.showToast({title:'规则匹配有误，请检查！'})
		}
		// console.log(i[0].match(regexp2))
	}

	//保存小说规则
	const saveRule = ()=>{
		if(!formData.rulesName || !formData.name || !formData.url){
			uni.showToast({title:'请填写正确规则再保存！',icon:"none"})
			return false
		}
		if(uni.getStorageSync('booksList')){
			let arr = JSON.parse(uni.getStorageSync('booksList')) || []
			let temp = {};
			let name = state.name || formData.name

			temp = arr.find((item,index)=>{
				if(item.name == name){
					arr[index] = formData
				}
				return item.name == name
			})
			if(!temp && !state.name){arr.push(formData)}
			uni.setStorageSync('booksList',JSON.stringify(arr))
		}else {
			let arr = [];
			arr.push(formData)
			console.log(arr)
			uni.setStorageSync('booksList',JSON.stringify(arr))
		}
		uni.showToast({title:'保存成功！',icon:"success"})
		setTimeout(()=>{uni.navigateBack();},1500)
	}

</script>

<style lang="scss" scoped>
	.content {
		padding: 32rpx 0;
		.tip{
			color: #666;
			font-size: 24rpx;
			padding: 20rpx;
		}
		.btnList{
			display: flex;
			justify-content: space-between;
			padding: 20rpx 20rpx;
		}
	}

</style>
<style>
	>>> .van-cell__value{
		/*text-align: left;*/
	}
</style>
