<template>
    <div class="volume">
        <button class="volume-mute" v-on:click="mute()" v-bind:class="{ 'is-muted' : muted }">Mute</button>
        <div class="volume-bar">
            <vueSlider
                ref="slider"
                v-model="bar"
                v-bind="options"
            ></vueSlider>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator';
    import Vuex, { StoreOptions } from 'vuex';
    import store from './../../store/store';
    import { options } from './defaultVueSliderOptions';
    import { ACTIONS } from './../../store/action-types';

    const vueSlider = require('vue-slider-component');

    @Component({
        components: {
            vueSlider,
        },
    })

    export default class Volume extends Vue {
        public options: any = options;
        private vbar: number = 1;

        constructor() {
            super();
        }
        get bar() {
            return this.vbar;
        }
        set bar(value: number) {
            this.vbar = value;
        }
        get muted() {
            return store.getters.isMuted;
        }
        set muted(value: boolean) {
            store.dispatch(ACTIONS.MUTE, value);
        }
        get volume() {
            return store.getters.volume;
        }

        public mute() {
            if (this.muted) {
                this.muted = false;
                this.bar = this.volume;
            } else {
                this.muted = true;
                this.bar = 0;
            }
        }
        @Watch('bar', { immediate: true, deep: true })
        private onBarChanged(value: number, oldVal: number) {
            if (!this.muted) {
                store.dispatch(ACTIONS.CHANGE_VOLUME, value);
            }

        }
    }
</script>

<style lang="scss">
    @import '../../assets/styles/defaults.scss';
    
    .volume {
        width: calc(30% - 1px);
        float: left;
        &::after {
            content: '';
            display: block;
            clear: both;
        }
        &-mute {
            background-color: transparent;
            float: left;
            width: 50px;
            height: 50px;
            margin-left: 20px;
            color: $cl-light;
            cursor: pointer;
            &:hover {
                text-shadow: 1px 1px 5px $cl-attention;
            }
            &.is-muted {
                color: $cl-attention;
            }
        }
        &-bar {
            width: calc(100% - 80px);
            float: left;
            margin-top: 13px;
        }
    }
</style>