<template>
	<view class="content" :style="{'height':'85vh'}">
		<!--<rich-text :nodes="state.bookData2"></rich-text>-->
		<mp-html :content="state.bookData2" />
		<!--<textarea class="textarea" :value="state.bookData.bookContent && state.bookData.bookContent[0]"></textarea>-->
		<BackTop @pageAdd="setPage(true)" @pageReduce="setPage(false)"></BackTop>
	</view>
</template>

<script lang="ts" setup>
	// import {getDemo} from '@/serves/main'
	import { ref, reactive, toRefs, computed, Ref, watchEffect,onMounted,getCurrentInstance } from "vue";
	import { useRoute  } from "vue-router";
	import BackTop from '../../components/BackTop'
	import { onLoad } from '@dcloudio/uni-app';
	const state = reactive({
		animate:false,
		bookData:{},
		bookData2:"",
		bookName:""
	});
	// const route = useRoute()

	onMounted(() => {
		// getRulesList()
	})

	onLoad(options => {
		getRulesList(options);
	})

	const getRulesList = (options)=>{
		if(options && options.bookName){
			let arr = JSON.parse(uni.getStorageSync('downBookData') || '[]')
			state.bookName = options.bookName
			state.bookData = arr.find(item=>item.bookName === state.bookName)
			state.bookData2 = (state.bookData.bookContent[state.bookData.currentPage - 1 || 0])
			// console.log(state.bookData2)
		}
	}

	const setPage = (type)=>{
		console.log(type)
		let arr = JSON.parse(uni.getStorageSync('downBookData') || '[]')
		arr = arr.map(item=>{
			if(item.bookName === state.bookName){
				if(type){
					if(item.currentPage >= item.bookContent.length){
						item.currentPage = item.bookContent.length
						uni.showToast({title:'已经是最后一页了！',icon:"none"})
					}else {
						item.currentPage = item.currentPage + 1
						state.bookData2 = (state.bookData.bookContent[item.currentPage - 1])
					}
				}else {
					if(item.currentPage <= 1){
						item.currentPage = 1
						uni.showToast({title:'这是第一页！',icon:"none"})
					}else {
						item.currentPage = item.currentPage - 1
						state.bookData2 = (state.bookData.bookContent[item.currentPage - 1])
					}
				}
			}
			return item
		})
		uni.setStorageSync('downBookData',JSON.stringify(arr))
	}

</script>

<style lang="scss" scoped>
	/*@import url("../../components/u-parse/u-parse.css");*/
	.content {
		padding: 20px;
	}


</style>
