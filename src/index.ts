import Vue from 'vue';
import Component from 'vue-class-component';
import Vuex from 'vuex';
import App from './components/app.vue';
import { MutationTree, ActionTree } from 'vuex';

Vue.use(Vuex);

interface IState {
	currentPosition: number;
	source: string;
	volume: number;
	muted: boolean;
	fullScreen: boolean;
}

const state: IState = {
	currentPosition: 0,
	source: 'linkdovideo',
	volume: 75,
	muted: false,
	fullScreen: false,
};

const mutations: MutationTree<IState> = {
	mute: (state) => state.muted = true,
	changeVolume(state, volume: number) {
		//...
	},
};

const actions: ActionTree<IState, any> = {};

export default new Vuex.Store<IState>({
	state,
	mutations,
	actions,
});

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
