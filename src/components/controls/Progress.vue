<template>
    <div class="progress-bar">
        <vueSlider
            ref="progress"
            v-model="bar"
            v-bind="options"
            :max="duration"
        ></vueSlider>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator';
    import Vuex, { StoreOptions } from 'vuex';
    import store from './../../store/store';
    import { progressOptions } from './defaultVueSliderOptions';
    import { ACTIONS } from './../../store/action-types';

    const vueSlider = require('vue-slider-component');

    @Component({
        components: {
            vueSlider,
        },
    })

    export default class Progress extends Vue {
        public options: any = progressOptions;
        private progressBar: number = 0;

        constructor() {
            super();
        }
        get bar() {
            return this.progressBar;
        }
        set bar(value: number) {
            this.progressBar = value;
        }
        get position() {
            // getter
            return store.state.position;
        }
        set position(value: number) {
            store.dispatch(ACTIONS.CHANGE_POSITION, value);
        }

        @Watch('position', { immediate: true, deep: true })
        private onPositionChanged(val: number, oldVal: number) {
            this.bar = val;
        }

        @Watch('bar', { immediate: true, deep: true })
        private onBarChanged(val: number, oldVal: number) {
            if (val !== this.position) {
                this.position = val;
            }
        }
        get duration() {
            return store.state.duration;
        }
    }
</script>

<style lang="scss">
    @import '../../assets/styles/variables.scss';
    
    .progress-bar {
        color: #fff;
        width: calc(70% - 51px);
        float: left;
        margin-top: 13px;
    }
</style>