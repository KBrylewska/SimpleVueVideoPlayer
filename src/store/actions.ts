import { ActionTree } from 'vuex';
import { IState } from './state';
import { ACTIONS } from './action-types';
import { MUTATIONS } from './mutation-types';
import { Store } from 'vuex';

export const actions: ActionTree<IState, any> = {
    [ACTIONS.INIT_VIDEO]: ( { commit, state }, player ) => {
        commit(MUTATIONS.SET_VIDEO, player);
        state.player.addEventListener('durationchange', () => {
            state.duration = player.duration;
        });

        // is debounced naturally, don't add debounce
        state.player.addEventListener('timeupdate', () => {

            if (state.position !== state.player.currentTime) {
                state.position = state.player.currentTime;
            }
        });
        state.player.addEventListener('ended', () => {
            state.paused = true;
        });
    },
    [ACTIONS.CHANGE_VOLUME]: ({ commit }, value) => {
        commit(MUTATIONS.SET_VOLUME, value);
    },
    [ACTIONS.CHANGE_POSITION]: ( { commit }, position) => {
        commit(MUTATIONS.SET_POSITION, position);
    },
    [ACTIONS.MUTE]: ( { commit }, muted ) => {
        commit(MUTATIONS.SET_MUTE, muted);
    },
    [ACTIONS.PLAY]: ( { commit } ) => {
        commit(MUTATIONS.SET_PLAY);
    },
    [ACTIONS.CHANGE_FULLSCREEN]: ({ commit }, value) => {
        commit(MUTATIONS.SET_FULLSCREEN, value);
    },
};
