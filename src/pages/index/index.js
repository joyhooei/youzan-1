// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import url from 'js/api.js'
import 'css/common.css'
import './index.css'
import { InfiniteScroll } from 'mint-ui'
import Foot from 'components/Foot.vue'
Vue.use(InfiniteScroll);
Vue.config.productionTip = false

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  data:{
    lists: null,
    allLoaded: false,
    loading: false,
    pageNum: 1,
    pageSize: 6
  },
  create(){
    this.getLists();
  },
  methods: {
    getLists(){
      this.loading = true;
      //如果数据加载完毕，则不再发送请求
      if(this.allLoaded){
        return;
      }
      axios.post(url.hostLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        let curLists = res.data.lists;
        //判断数据是否加载完毕
        if(curLists.length < this.pageSize){
          this.allLoaded = true;
        }
        if(this.lists){
          this.lists = this.lists.concat(curLists);
        }else{
          //首次请求数据
          this.lists = curLists;
        }
        this.pageNum++;
        this.loading = false;
      })
    }
  },
  components: {
    Foot: Foot
  }
});

