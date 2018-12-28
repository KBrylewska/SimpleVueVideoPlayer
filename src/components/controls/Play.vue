<template>
    <button v-on:click="play()" v-bind:class="[playing ? 'is-paused' : ' is-playing']" class="play-button">
    </button>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Vuex, { StoreOptions } from 'vuex';
    import { mapState } from 'vuex';
    import store from './../../store/store';
    import { ACTIONS } from './../../store/action-types';

    @Component({})

    export default class Play extends Vue {
        public title: string;
        constructor() {
            super();
        }
        public play() {
            store.dispatch(ACTIONS.PLAY);
        }
        get playing() {
            // getter
            return store.state.paused;
        }
    }
</script>

<style lang="scss">
    @import '../../assets/styles/defaults.scss';
    
    .play-button {
        position: relative;
        background-color: transparent;
        height: 50px;
        width: 50px;
        float: left;
        cursor: pointer;
        &.is-paused {
            &::after {
                position: absolute;
                content: '';
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 10px 0 10px 20px;
                border-color: transparent transparent transparent $cl-light;
                top: 15px;
                left: 16px;
            }
        }
        &.is-playing {
            &::after {
                background-color: $cl-light;
                position: absolute;
                content: '';
                width: 5px;
                height: 20px;
                top: 15px;
                left: 27px;
            }
            &::before {
                background-color: $cl-light;
                position: absolute;
                content: '';
                width: 5px;
                height: 20px;
                top: 15px;
                left: 17px;
            }
        }
    }
</style>