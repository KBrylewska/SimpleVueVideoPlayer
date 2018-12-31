<template>
  <div class="controls">
      <Play></Play>
      <Progress></Progress>
      <Volume></Volume>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Vuex, { StoreOptions } from 'vuex';
    import Play from 'components/controls/Play.vue';
    import Progress from 'components/controls/Progress.vue';
    import Volume from 'components/controls/Volume.vue';

    @Component({
        components: {
            Play,
            Progress,
            Volume,
        },
    })

    export default class Controls extends Vue {
        constructor() {
            super();
        }
    }
</script>

<style lang="scss">
    @import 'src/assets/styles/variables.scss';

    .controls {
        background-color: $cl-dark;
        &::after {
            content: '';
            display: block;
            clear: both;
        }
    }
</style>