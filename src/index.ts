import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/app.vue';
import store from './store';

const v: Vue = new Vue({
	el: '#app',
	template: '<App/>',
	data: {
		title: 'Wonder Woman',
	},
	components: {
		App,
	},
});
