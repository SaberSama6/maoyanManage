// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'  //这里面的东西你都不要动。只有那个 import Index from "@/components/Index" 根据你的情况更改。
import router from './router'   //这里省略了index.js
import Index from "@/components/Index" //这里是引入了我自己写的一个导航，也就是单页上的点击切换的东西。你可以去看这个文件。这个@符号的意思是直接指向src目录。你在build/webpack.base.conf.js能找到这个配置！ 不要去改他！
import store from "@/store/index.js" //引入store 保证store在父级。
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app', //这里面的东西你什么都不要改，这是自动生成配置好了的。这个app在更目录的index.html能找到
  router,
  store,
  template: '<Index/>',
  components: { Index }
})
