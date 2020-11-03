import Vue from 'vue'

import apiList from './request/apiList'
import request from './request/index'

Vue.prototype.$api = apiList;
Vue.prototype.$request = request;
