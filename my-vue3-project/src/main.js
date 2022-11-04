import {
	createSSRApp
} from "vue";
import App from "./App.vue";
//#ifdef H5 || APP-PLUS
import {Axios} from "./serves/serves";
//#endif

//axios全局设置
export function createApp() {
	const app = createSSRApp(App);
	//#ifdef H5 || APP-PLUS
	app.config.globalProperties.$axios = Axios;  //配置axios的全局引用
	//#endif

	return {
		app,
	};
}
