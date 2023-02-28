<template>
	<view class="content">
		<view class="toolList">
			<van-cell v-for="(item,index) in state.rulesList" :key="index" class="list-item" @tap="goPage(item)" :title="item.rulesName" is-link />
		</view>
	</view>
</template>

<script lang="ts" setup>
	// import {getDemo} from '@/serves/main'
	import { reactive,onMounted,watch } from "vue";
	import { useRoute  } from "vue-router";
	import { onShow} from '@dcloudio/uni-app';
	// const count: Ref<number> = ref(0);
	const state = reactive({
		title: 'Hello',
		animate:false,
		rulesList:[],
		bookList:[]
	})
	// const route = useRoute()
	// const route = getCurrentPages()
	// const curRoute = route[route.length - 1].route

	// onMounted(() => {
	// 	getRulesList();
	// 	console.log(curRoute)
	// })
	onShow(()=>{
		//当页面返回时重新加载规则列表
		getRulesList();
	})
	// watch(()=>route,() =>{
	// 	console.log(55)
	// 	getRulesList();
	// })

	const getRulesList = ()=>{
		state.rulesList = uni.getStorageSync('bookRules')?JSON.parse(uni.getStorageSync('bookRules')):[]
	}

	const goPage = (e)=>{
		uni.navigateTo({url:'../rulesPage/index?rulesName='+e.rulesName,})
	}

</script>

<style lang="scss" scoped>
	.content {
		.toolList{
			background-color: #fff;
			.list-item{
				height: 90rpx;
				font-size: 24rpx;
				color: #333;
			}
		}
	}
</style>
