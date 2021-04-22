<template>
  <div class="bg-white p-1">
    <svg
      id="svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="100%"
      style="background-color: white"
      :view-box.camel="`0 0 ${w} ${h}`"
    >
      <defs>
        <filter id="solid" x="0" y="0" width="1" height="1">
          <feFlood flood-color="white" />
          <feComposite in="SourceGraphic" operator="atop" />
        </filter>
      </defs>
      <!-- x-axis -->
      <g v-if="xAxis">
        <g v-for="(value, xIndex) in xAxis" :key="xIndex">
          <text
            :x="xp + (xIndex / (xAxis.length - 1)) * wp + 1"
            :y="yp + hp + 4"
            font-size="2.8pt"
            fill="#444444"
            text-anchor="middle"
            alignment-baseline="hanging"
            :transform="`rotate(-20, ${
              xp + (xIndex / (xAxis.length - 1)) * wp
            }, ${yp + hp + 5})`"
          >
            {{ value }}
          </text>
        </g>
      </g>
      <!-- y-axis -->
      <g v-if="yAxis">
        <line
          :x1="xp"
          :y1="yp"
          :x2="xp"
          :y2="yp + hp"
          stroke="#444444"
          stroke-width="0.2"
        />
        <!-- labels and lines -->
        <g v-for="(value, yIndex) in yAxis" :key="yIndex">
          <line
            :x1="xp"
            :y1="yp + (1 - value) * hp"
            :x2="xp + wp"
            :y2="yp + (1 - value) * hp"
            stroke="#444444"
            stroke-width="0.2"
          />
          <text
            :x="xp - 2"
            :y="yp + (1 - value) * hp"
            font-size="3pt"
            fill="#444444"
            text-anchor="end"
            alignment-baseline="central"
          >
            {{ pct(value) }}
          </text>
        </g>
      </g>
      <g
        v-for="({ color, values, showValueLabels, style }, sIndex) in series"
        :key="sIndex"
      >
        <g v-for="(value, vIndex) in values" :key="vIndex">
          <g v-if="isFinite(value)">
            <line
              v-if="
                vIndex > 0 && isFinite(values[vIndex - 1]) && style != 'dotted'
              "
              :x1="xp + ((vIndex - 1) / (values.length - 1)) * wp"
              :y1="yp + (1 - values[vIndex - 1]) * hp"
              :x2="xp + (vIndex / (values.length - 1)) * wp"
              :y2="yp + (1 - value) * hp"
              :stroke="color"
              stroke-width="1"
              :stroke-dasharray="style === 'dashed' ? 2 : 0"
            />
            <g
              :id="`s-${sIndex}-v-${vIndex}`"
              pointer-events="bounding-box"
              @mouseover="handleMouseOverPoint"
              @mouseleave="mousedOverPoint = ''"
            >
              <circle
                :cx="xp + (vIndex / (values.length - 1)) * wp"
                :cy="yp + (1 - value) * hp"
                r="2"
                :fill="color"
                stroke="transparent"
                stroke-width="2pt"
              />
              <text
                v-if="
                  showValueLabels == null ||
                  showValueLabels === true ||
                  (mousedOverPoint &&
                    `s-${sIndex}-v-${vIndex}` === mousedOverPoint)
                "
                :x="xp + (vIndex / (values.length - 1)) * wp"
                :y="yp + (1 - value) * hp + (value < 0.9 ? -3 : 7)"
                :font-size="
                  mousedOverPoint &&
                  `s-${sIndex}-v-${vIndex}` === mousedOverPoint
                    ? '6pt'
                    : '4pt'
                "
                text-anchor="middle"
                alignment-baseline="baseline"
                :fill="color"
                font-weight="bold"
                filter="url(#solid)"
              >
                {{ pct(value) }}
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <div class="w-full flex justify-around items-center mx-4 my-1">
      <div v-for="({ label, color }, sIndex) in series" :key="sIndex">
        <span :style="{ color: color }"> &#9679; {{ label }} </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    /**
     * series is an array that will contain one object for each line on the chart
     * each object will contain the following:
     * key - a short value identifying this series
     * label - how the series should be displayed
     * color - the color of the point/line on the chart
     * style - solid by default, can be dashed or dotted
     * values - an array of numerical values, will be equally distributed across the entire width, use NaN for missing values
     * showValueLabels - boolean, should labels for values be displayed?
     **/
    series: {
      type: Array,
      required: true,
    },
    /** The values to display across the x-axis, if null, display nothing **/
    xAxis: {
      type: Array,
      required: false,
      default: null,
    },
    yAxis: {
      type: Array,
      required: false,
      default: () => [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    },
    isPercent: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      w: 200, // the total width
      h: 100, // the total height
      axisPct: 0.1, // percent of the total size that should be taken by the axes,
      mousedOverPoint: '',
    }
  },
  computed: {
    // width of the data panel
    wp() {
      return this.w - ((this.w * this.axisPct) / 2) * 3
    },
    // height of the data panel
    hp() {
      return this.h - ((this.h * this.axisPct) / 2) * 3
    },
    // the x-position of the data panel
    xp() {
      return this.w * this.axisPct
    },
    // the y-position of the data panel
    yp() {
      return (this.h * this.axisPct) / 2
    },
    // the width of the y-axis
    wy() {
      return this.w * this.axisPct
    },
    // the heigh tof the x-axis
    hx() {
      return this.h * this.axisPct
    },
  },
  methods: {
    pct(val) {
      return `${Math.round(val * 1000) / 10}%`
    },

    handleMouseOverPoint(event) {
      this.mousedOverPoint = event.currentTarget.getAttribute('id')
    },
  },
}
</script>
