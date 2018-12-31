import { MutationTree } from 'vuex';
import { IState } from './state';
import { MUTATIONS } from './mutation-types';

export const mutations: MutationTree<IState> = {
    [MUTATIONS.SET_MUTE]: (state, muted: boolean) => {
        state.muted = muted;
        state.player.muted = muted;
    },
    [MUTATIONS.SET_PLAY]: (state) => {
        if (state.paused) {
            const promise = state.player.play();
            state.paused = false;
            // chrome audioplay policy solution
            if (promise !== undefined) {
                promise.then().catch((error) => {
                    state.paused = true;
                });
            }
        } else {
            state.player.pause();
            state.paused = true;
        }
    },
    [MUTATIONS.SET_POSITION]: (state, position: number) => {
        state.position = position;

        if (state.player) {
            state.player.currentTime = state.position;
        }
    },
    [MUTATIONS.SET_VOLUME]: (state, value: number) => {
        if (state.player) {
            state.volume = value;
            state.player.volume = value;
        }
    },
    [MUTATIONS.SET_VIDEO]: (state, player: HTMLVideoElement) => {
        state.player = player;
    },
    [MUTATIONS.SET_FULLSCREEN]: (state) => {
        state.fullScreen = state.fullScreen ? false : true;
    },
};
