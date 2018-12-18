import Vue from 'vue';
import Vuex from 'vuex';
import { MutationTree, ActionTree } from 'vuex';

Vue.use(Vuex);

interface IState {
    paused: boolean;
    position: number;
	source: string;
	volume: number;
    muted: boolean;
	fullScreen: boolean;
    player: HTMLVideoElement,
    duration: number,
    resize: boolean,
}

const state: IState = {
    paused: true,
    position: 1,
	source: 'linkdovideo',
	volume: 1,
	muted: false,
	fullScreen: false,
    player: null,
    duration: 0,
    resize: false,
};

const mutations: MutationTree<IState> = {
    setMute: (state, muted: boolean) => {
        state.muted = muted;
        state.player.muted = muted;
        
    },
    play: (state) => {
        if (state.paused) {
            const promise = state.player.play();
            state.paused = false;
            //chrome audioplay policy solution
            if (promise !== undefined) {
                promise.then((value) => {}).catch((error) => {
                    state.paused = true;
                });
            }
        }
        else {
            state.player.pause();
            state.paused = true;
        }
    },
	changeVolume: (state, volume: number) => {
        if (!Number.isNaN(volume) && volume >= 0 && volume <= 1) {
            state.volume = volume;
        }
    },
    setCurrentPosition: (state, position: number) => {
        state.position = position;
        //emit event...
        if (state.player) {
            state.player.currentTime = state.position;
        }
    },
    setVolume: (state, value: number) => {
        state.volume = value;
        state.player.volume = value;
    },
    loadVideo: (state, player: HTMLVideoElement) => {
        state.player = player;

        //this function can not be in store -> actions or emit event and catch it in component
        state.player.addEventListener("durationchange", () => {
            state.duration = player.duration;
        });

        //is debounced naturally, don't add debounce
        state.player.addEventListener('timeupdate', () => {

            if (state.position !== state.player.currentTime) {
                state.position = state.player.currentTime
            };
        });
        state.player.addEventListener('ended', () => {
            state.paused = true;
        });
    },
    changeFullScreen: (state) => {
        //one line
        if (state.fullScreen) {
            state.fullScreen = false;
        }
        else {
            state.fullScreen = true;
        }
    }
};

const actions: ActionTree<IState, any> = {};

export default new Vuex.Store<IState>({
	state,
	mutations,
	actions,
});