<template>
  <div :id="id" class="player-container" v-bind:class="{ 'is-fullScreen': fullScreen }">
    <button class="player-fullscreen" v-on:click="changeFullscreen">FULLSCREEN</button>
    <video preload="auto">
        <source src="dist/media/bunny.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <Controls></Controls>
  </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
    import Vuex, { StoreOptions } from 'vuex';
    import Controls from './Controls.vue';
    import store from './../store/store';
    import { IDocument, IHTMLElement } from './interfaces';
    import { ACTIONS } from './../store/action-types';

    @Component({
        components: {
            Controls,
        },
    })

    export default class Player extends Vue {
         @Prop({ default: 'simplevuevideoplayer' }) private id!: string;
        constructor() {
            super();
        }
        get fullScreen() {
            return store.state.fullScreen;
        }
        public changeFullscreen() {
            const extendedDocument = document as IDocument;
            const container: any = document.getElementById(this.id) || null;
            const isInFullScreen = extendedDocument.fullscreenElement;
            // to helper maybe
            if (container && !isInFullScreen) {
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if (container.mozRequestFullScreen) {
                    container.mozRequestFullScreen();
                } else if (container.webkitRequestFullscreen) {
                    container.webkitRequestFullscreen();
                } else if (container.msRequestFullscreen) {
                    container.msRequestFullscreen();
                }
            } else if (isInFullScreen) {
                if (extendedDocument.exitFullscreen) {
                    extendedDocument.exitFullscreen();
                } else if (extendedDocument.mozExitFullscreen) {
                    extendedDocument.mozExitFullscreen();
                } else if (extendedDocument.webkitExitFullscreen) {
                    extendedDocument.webkitExitFullscreen();
                } else if (extendedDocument.msExitFullscreen) {
                    extendedDocument.msExitFullscreen();
                }
            }
        }
        public mounted() {
            const player: HTMLVideoElement = document.querySelector(`#${this.id} video`) as HTMLVideoElement || null;
            if (player) {
                store.dispatch(ACTIONS.INIT_VIDEO, player);
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/styles/variables.scss';

    .player {
        &-container {
            position: relative;
            display: inline-block;
            width: 100%;
        }
        &-fullscreen {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 15;
            background-color: $cl-dark;
            color: $cl-light;
            padding: 10px;
            cursor: pointer;
            border-radius: 0 0 0 5px;
        }
    }
    video {
        display: block;
        z-index: 10;
        width: 100%;
    }
</style>
