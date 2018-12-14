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
    setMute: (state) => { 
        console.log('is muted' + state.muted + '   ' + state.player.muted);
        if (state.muted) {
            state.muted = false;
            state.player.muted = false;
        }
        else {
            state.muted = true;
            state.player.muted = true;
        }
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
        state.player.currentTime = state.position;
    },
    setVolume: (state, value: number) => {
        state.volume = value;
        state.player.volume = value;
    },
    loadVideo: (state, player: HTMLVideoElement) => {
        state.player = player;

        //this function can not be in store -> actions or emit event and catch it in component
        state.player.addEventListener("durationchange", () => {
            console.log('duration ' + player.duration);
            state.duration = player.duration;
        });
        //is debounced naturally, don't add debounce
        state.player.addEventListener('timeupdate', () => {
            console.log('store ' + state.position + '   player ' + state.player.currentTime)
            if (state.position !== state.player.currentTime) {
                //state.position = state.player.currentTime
            };
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