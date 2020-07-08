import Toast from "./Toast.vue"

let obj = {

}

obj.install = function(Vue){
  //创建构造器
  const toastConstructor = Vue.extend(Toast)
  //使用构造器创建新的对象
  const toast = new toastConstructor()
  //手动挂载
  toast.$mount(document.createElement('div'))
  //将挂载后的节点添加至body
  document.body.appendChild(toast.$el)
  //在原型上添加对象
  Vue.prototype.$toast = toast
}

export default obj
