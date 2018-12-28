import Vue from 'vue';
import Vuex from 'vuex';
import { MutationTree, ActionTree } from 'vuex';
import { MUTATIONS } from './mutation-types';
import { IState, state } from './state';
import { actions } from './actions';
import { mutations } from './mutations';

Vue.use(Vuex);

export default new Vuex.Store<IState>({
    state,
    mutations,
    actions,
});
