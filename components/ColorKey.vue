<template>
  <div :class="dense ? 'text-xs' : 'text-base'">
    <div v-if="showOverall" class="py-1 w-full text-center">
      <div class="font-bold px-2 mx-1">Overall Progress Colors</div>
      <div class="bg-off_track text-contrast-off_track font-bold px-2 mx-1">
        Off-Track
      </div>
      <div class="bg-near_track text-contrast-near_track font-bold px-2 mx-1">
        Near-Track
      </div>
      <div class="bg-on_track text-contrast-on_track font-bold px-2 mx-1">
        On-Track
      </div>
    </div>
    <div v-if="showDistance" class="mt-2 py-1 w-full text-center">
      <div class="font-bold px-2 mx-1 underline">Distance Colors</div>
      <div class="bg-contrast-off_track text-off_track font-bold px-2 mx-1">
        Below Target
      </div>
      <div class="bg-contrast-on_track text-on_track font-bold px-2 mx-1">
        At/Above Target
      </div>
    </div>
    <div
      v-if="showScore"
      class="mt-2 py-1 text-center flex justify-center items-center"
    >
      <div :class="dense ? 'w-32' : 'w-full'">
        <div class="font-bold px-2 mx-1">Score Colors</div>
        <div
          class="font-bold px-2 mx-1"
          :style="{
            'background-color': colorScaleRedBlue(0, 0.1, 1),
            color: colorScaleTextRedBlue(0, 0.1, 1),
          }"
        >
          &#60; 50% of Target
        </div>
        <div
          class="font-bold px-2 mx-1"
          :style="{
            'background-color': colorScaleRedBlue(0.1, 0.1, 1),
            color: colorScaleTextRedBlue(0.1, 0.1, 1),
          }"
        >
          &nbsp;
        </div>
        <div
          class="font-bold px-2 mx-1"
          :style="{
            'background-color': colorScaleRedBlue(0.1 + 0.125 * 0.9, 0.1, 1),
            color: colorScaleTextRedBlue(0.1 + 0.125 * 0.9, 0.1, 1),
          }"
        >
          &nbsp;
        </div>
        <div
          class="font-bold px-2 mx-1"
          :style="{
            'background-color': colorScaleRedBlue(
              0.1 + 0.125 * 0.9 * 2,
              0.1,
              1
            ),
            color: colorScaleTextRedBlue(0.1 + 0.125 * 0.9 * 2, 0.1, 1),
          }"
        >
          &nbsp;
        </div>
        <div
          class="font-bold px-2 mx-1"
          :style="{
            'background-color': colorScaleRedBlue(
              0.1 + 0.125 * 0.9 * 3,
              0.1,
              1
            ),
            color: colorScaleTextRedBlue(0.1 + 0.125 * 0.9 * 3, 0.1, 1),
          }"
        >
          &nbsp;
        </div>
        <div
          class="font-bold px-2 mx-1"
          :style="{
            'background-color': colorScaleRedBlue(
              0.1 + 0.125 * 0.9 * 4,
              0.1,
              1
            ),
            color: colorScaleTextRedBlue(0.1 + 0.125 * 0.9 * 4, 0.1, 1),
          }"
        >
          At Target
        </div>
        <div
          class="font-bold px-2 mx-1"
          :style="{
            'background-color': colorScaleRedBlue(
              0.1 + 0.125 * 0.9 * 5,
              0.1,
              1
            ),
            color: colorScaleTextRedBlue(0.1 + 0.125 * 0.9 * 5, 0.1, 1),
          }"
        >
          &nbsp;
        </div>
        <div
          class="font-bold px-2 mx-1"
          :style="{
            'background-color': colorScaleRedBlue(
              0.1 + 0.125 * 0.9 * 6,
              0.1,
              1
            ),
            color: colorScaleTextRedBlue(0.1 + 0.125 * 0.9 * 6, 0.1, 1),
          }"
        >
          &nbsp;
        </div>
        <div
          class="font-bold px-2 mx-1"
          :style="{
            'background-color': colorScaleRedBlue(
              0.1 + 0.125 * 0.9 * 7,
              0.1,
              1
            ),
            color: colorScaleTextRedBlue(0.1 + 0.125 * 0.9 * 7, 0.1, 1),
          }"
        >
          &nbsp;
        </div>
        <div
          class="font-bold px-2 mx-1"
          :style="{
            'background-color': colorScaleRedBlue(1, 0.1, 1),
            color: colorScaleTextRedBlue(1, 0.1, 1),
          }"
        >
          &#8805; 150% of Target
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MetricsMixin from '~/mixins/MetricsMixin.vue'

export default {
  mixins: [MetricsMixin],
  props: {
    showOverall: {
      type: Boolean,
      required: false,
      default: false,
    },
    showDistance: {
      type: Boolean,
      required: false,
      default: true,
    },
    showScore: {
      type: Boolean,
      required: false,
      default: true,
    },
    dense: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
