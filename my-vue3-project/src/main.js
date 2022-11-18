import {
	createSSRApp
} from "vue";
import App from "./App.vue";
// 1. 引入你需要的组件
import { Button,Field, CellGroup,Cell,Form,Picker,Popup} from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
//#ifdef H5 || APP-PLUS
// import {Axios} from "./serves/serves";
//#endif
import mixins from '@/common/js/mixin.ts'
//axios全局设置
export function createApp() {
	const app = createSSRApp(App);
	app.mixin(mixins)
	// 3. 注册你需要的组件
	app.use(Button).use(Field).use(CellGroup).use(Cell).use(Form).use(Picker).use(Popup);
	//#ifdef H5 || APP-PLUS
	// app.config.globalProperties.$axios = Axios;  //配置axios的全局引用
	//#endif

	return {
		app
	};
}
