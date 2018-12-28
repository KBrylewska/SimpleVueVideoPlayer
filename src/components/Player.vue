<template>
  <div :id="id" class="player-container" v-bind:class="{ 'is-fullScreen': fullScreen }">
    <button class="player-fullscreen" v-on:click="changeFullscreen"></button>
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
                store.dispatch(ACTIONS.CHANGE_FULLSCREEN, true);
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
                store.dispatch(ACTIONS.CHANGE_FULLSCREEN, false);
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
            &.is-fullScreen {
                .player-fullscreen {
                    &::after {
                        transform: rotate(252deg);
                        top: 15px;
                        right: 20px;
                    }
                }
            }
        }
        &-fullscreen {
            position: absolute;
            top: 5px;
            right: 0;
            z-index: 15;
            background-color: $cl-dark;
            color: $cl-light;
            padding: 15px 17px;
            cursor: pointer;
            border-radius: 5px 0 0 5px;
            &:hover {
                background-color: lighten($cl-dark, 20%);
            }
            &::after {
                position: absolute;
                content: '';
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 5px 0 5px 8px;
                transform: rotate(315deg);
                border-color: transparent transparent transparent $cl-light;
                top: 5px;
                right: 7px;
            }
            &::before {
                position: absolute;
                width: 15px;
                content: '';
                display: block;
                height: 2px;
                transform: rotate(315deg);
                background-color: $cl-light;
                top: 15px;
                right: 10px;
            }
        }
    }
    video {
        display: block;
        z-index: 10;
        width: 100%;
    }
</style>
