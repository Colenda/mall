import axios from 'axios'

export function request(config) {
	//创建axios实例
	const instance = axios.create({
		baseURL: "抱歉，接口不便提供，请自行寻找" ,
		timeout: 5000
	})

	//axios拦截器
	instance.interceptors.request.use(config => {
		//处理不符合要求的信息
		//加入请求加载图标
		//某些网络请求比如登录token需要特殊信息
		return config
	}, err => {
	})

	instance.interceptors.response.use(res => {
		return res.data
	}, err => {
	})

	//发送请求
	return instance(config)
}
