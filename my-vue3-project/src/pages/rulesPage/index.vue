<template>
	<view class="content">
		<view class="页面配置">
			<van-form>
				<van-cell-group inset>

					<van-field label="规则名">
						<template #input>
							<input v-model="formData.rulesName" placeholder="请填写规则名" />
						</template>
					</van-field>
					<!--<van-field-->
					<!--v-model="formData.name"-->
					<!--label="书名"-->
					<!--placeholder="请填写小说书名"-->
					<!--:rules="[{ required: true, message: '请填写小说书名' }]"-->
					<!--/>-->
					<van-field label="小说网址">
						<template #input>
							<input v-model="formData.url" placeholder="请填写小说网址" />
						</template>
					</van-field>
					<van-field
									v-model="formData.webCode"
									rows="10"
									label-width="60px"
									label="网页源码"
									type="textarea"
									disabled
					/>
					<div style="margin: 16px;">
						<van-button round block @tap="onSubmit(formData.url,'webCode')">发送请求</van-button>
					</div>
				</van-cell-group>
			</van-form>

			<van-form>
				<van-cell-group inset>
					<van-field label="开始匹配字符">
						<template #input>
							<input v-model="formData.startText" placeholder="请填写开始匹配字符" />
						</template>
					</van-field>
					<van-field label="结束匹配字符">
						<template #input>
							<input v-model="formData.endText" placeholder="请填写结束匹配字符" />
						</template>
					</van-field>
					<van-field label="正则匹配">
						<template #input>
							<input v-model="formData.rules" placeholder="请填写正则匹配规则" />
						</template>
					</van-field>
					<view class="tip">提示：此次正则匹配将匹配小说的目录。如：<view><text>{{formData.tip}}</text></view></view>
					<van-field
									v-model="formData.catalog"
									rows="5"
									label="匹配结果"
									type="textarea"
									disabled
					/>
					<div style="margin: 16px;">
						<van-button round block @tap="matchCatalog">开始匹配</van-button>
					</div>
				</van-cell-group>
			</van-form>

			<van-form>
				<van-cell-group inset>
					<van-field label="小说正文网址">
						<template #input>
							<input v-model="formData.bookUrl" placeholder="请填写小说正文网址" />
						</template>
					</van-field>
					<van-field
									v-model="formData.contentCode"
									rows="8"
									label="正文源码"
									type="textarea"
									disabled
					/>
					<div style="margin: 16px;">
						<van-button round block @tap="onSubmit(formData.bookUrl,'contentCode')">发送请求</van-button>
					</div>
					<van-field label="正则匹配">
						<template #input>
							<input v-model="formData.rules2" placeholder="请填写正则匹配规则" />
						</template>
					</van-field>
					<view class="tip">提示：此次正则匹配将匹配小说的正文。如：<view><text>{{formData.tip2}}</text></view></view>
					<van-field
									v-model="formData.bookContent"
									rows="5"
									label="匹配结果"
									type="textarea"
									disabled
					/>
					<div style="margin: 16px;">
						<van-button round block @tap="matchContent">开始匹配</van-button>
					</div>
				</van-cell-group>

				<div style="margin: 16px;">
					<van-button round block type="primary" @tap="saveRules">保存规则</van-button>
				</div>
			</van-form>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {sendCustomReq} from '@/serves/main'
	import { ref, reactive, toRefs, computed, Ref, watchEffect,onMounted, } from "vue";
	import { onLoad } from '@dcloudio/uni-app';
	import { useRoute, useRouter } from 'vue-router'
	const state = reactive({
		rulesName:''
	})
	const formData = reactive({
		name:'',
		url:'https://www.biqudu.net/40_40517/',
		webCode:'',
		rulesName:'',
		catalog:'',
		bookUrl:'https://www.biqudu.net/40_40517/3471307.html',
		contentCode:'',
		tip:'<dd> <a style="" href="(?<link>.*?)">(?<title>.*?)</a></dd>',
		tip2:'\\<div id="content"\\>(?<content>[\\s\\S]*?)\\<\\/div\\>',
		endText:'',
		rules:'<dd> <a style="" href="(?<link>.*?)">(?<title>.*?)</a></dd>',
		bookContent:'',
		rules2:'\\<div id="content"\\>(?<content>[\\s\\S]*?)\\<\\/div\\>',
		startText:'',
	});

	const route = useRoute()

	onLoad(options => {
		initFormData(options);
	})

	onMounted(() => {

	})

	const initFormData = (options)=>{
		if(options && options.rulesName){
			state.rulesName = options.rulesName
			let arr = JSON.parse(uni.getStorageSync('bookRules') || '[]') || []
			Object.assign(formData,arr.find(item=>item.rulesName === state.rulesName))
		}
	}

	//获取小说主页
	const onSubmit = (url,result)=>{
		sendCustomReq(`${url}`).then(res=>{
			if(res){
				formData[result] = res;
			}else{
				wx.showToast({
					title: '诶呀,好疼',
					icon: 'none',
					duration: 2000
				})
			}
		})
	}

	//保存小说规则到本地
	const saveRules = ()=>{
		if(!formData.catalog || !formData.bookContent || !formData.rulesName){
			uni.showToast({title:'请填写完整再保存！',icon:"none"})
			return false
		}
		formData.webCode = '';
		formData.contentCode = '';
		formData.catalog = '';
		formData.bookContent = '';
		let arr = JSON.parse(uni.getStorageSync('bookRules') || '[]') || []
		if(arr || arr.length){
			let temp = {};
			let rulesName = state.rulesName || formData.rulesName

			temp = arr.find((item,index)=>{
				if(item.rulesName == rulesName){
					arr[index] = formData
				}
				return item.rulesName == rulesName
			})
			if(!temp && !state.rulesName){arr.push(formData)}
			uni.setStorageSync('bookRules',JSON.stringify(arr))
		}else {
			let arr = [];
			arr.push(formData)
			console.log(arr)
			uni.setStorageSync('bookRules',JSON.stringify(arr))
		}
		uni.showToast({title:'保存成功！',icon:"success"})
		setTimeout(()=>{uni.navigateBack();},1500)
	}

	//匹配小说正文
	const matchContent = ()=>{
		let regexp = new RegExp(formData.rules2);
		let text = formData.contentCode;
		let content = text.match(regexp);
		formData.bookContent = content?content.groups.content:''
		// console.log(list)
	}

	//匹配小说目录
	const matchCatalog = ()=>{
		let regexp = new RegExp(formData.rules,'g');
		let regexp2 = new RegExp(formData.rules);
		let catalogArr = [];
		let text = formData.webCode;
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
		formData.catalog = JSON.stringify(catalogArr || '')
		// console.log(i[0].match(regexp2))
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
	}

</style>
