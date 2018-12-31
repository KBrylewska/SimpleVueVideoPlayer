import { GetterTree } from 'vuex';
import { IState } from './state';

export const getters: GetterTree<IState, any> = {
    isPaused(state): boolean {
        return state.paused;
    },
    position(state): number {
        return state.position;
    },
    volume(state): number {
        return state.volume;
    },
    isMuted(state): boolean {
        return state.muted;
    },
    isFullscreen(state): boolean {
        return state.fullScreen;
    },
    player(state): HTMLVideoElement {
        return state.player || null;
    },
    duration(state): number {
        return state.duration;
    },
};
