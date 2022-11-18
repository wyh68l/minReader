<template>
	<view class="content">
		<view class="toolList">
			<van-cell v-for="(item,index) in state.bookList" :key="index" class="list-item" @tap="goPage(item)" :title="item.name" is-link />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {getDemo} from '@/serves/main'
	import { reactive,onMounted,watch } from "vue";
	import { useRoute  } from "vue-router";
	// const count: Ref<number> = ref(0);
	const state = reactive({
		title: 'Hello',
		animate:false,
		rulesList:[],
		bookList:[]
	})
	// const route = useRoute()
	const route = getCurrentPages()
	const curRoute = route[route.length - 1].route

	onMounted(() => {
		getRulesList();
	})
	watch(()=>curRoute,() =>{
		//当页面返回时重新加载规则列表
		getRulesList();
	})

	const getRulesList = ()=>{
		state.bookList = uni.getStorageSync('booksList')?JSON.parse(uni.getStorageSync('booksList')):[]
	}

	const goPage = (e)=>{
		uni.navigateTo({url:'../addBooks/index?name='+e.name,})
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
