<script>
export default {
  methods: {
    /// A "crosswalk" for metric values to labels
    label(value) {
      if (value === 'off_track') {
        return 'Off-Track'
      } else if (value === 'near_track') {
        return 'Near-Track'
      } else if (value === 'on_track') {
        return 'On-Track'
      }
    },
    getQuestionTextsByCategory(question, category) {
      if (this[question] != null) {
        const indices = this[question].Category.map((obj, index) => ({
          ...obj,
          index,
        }))
          .filter(({ text }) => text === category)
          .map(({ index }) => index)
        return this[question].Text.filter((obj, index) =>
          indices.includes(index)
        ).map(({ text }) => text)
      } else {
        return []
      }
    },
    getQuestionTextByCategoryAtIndex(question, category, index) {
      const texts = this.getQuestionTextsByCategory(question, category)
      if (texts.length > 0) {
        return texts[index]
      } else {
        return ''
      }
    },
    /**
     * used to gather the index of the particular index for a metric, used for gathering parallel metrics
     */
    metricCycleIndex(metricCycleKey) {
      if (this.values?.metricCycleKey?.length > 0) {
        const index = this.values.metricCycleKey
          .map((obj, index) => ({
            ...obj,
            index,
          }))
          .filter(({ text }) => metricCycleKey === text)
          .map(({ index }) => index)
        if (index.length >= 0) {
          return index[0]
        } else {
          return -1
        }
      } else {
        return -1
      }
    },

    colorScaleRedBlue(value, lowerBound, upperBound) {
      if (isFinite(value)) {
        const pct = (value - lowerBound) / (upperBound - lowerBound)
        // console.log('pct', pct, value, lowerBound, upperBound)
        const width = 1 / 8
        if (pct < width * 0) {
          return '#AE1C3E'
        } else if (pct < width * 1) {
          return '#CA433E'
        } else if (pct < width * 2) {
          return '#ED875E'
        } else if (pct < width * 3) {
          return '#F5AD74'
        } else if (pct < width * 4) {
          return '#F2D2AE'
        } else if (pct < width * 5) {
          return '#D1EBFB'
        } else if (pct < width * 6) {
          return '#A7D5F3'
        } else if (pct < width * 7) {
          return '#5EA4D9'
        } else if (pct < 1) {
          return '#3B72B9'
        } else if (pct >= 1) {
          return '#3C52A1'
        } else {
          return '#BDBDBD'
        }
      } else {
        return '#ffffff'
      }
    },

    colorScaleTextRedBlue(value, lowerBound, upperBound, defaultColor) {
      if (isFinite(value)) {
        const pct = (value - lowerBound) / (upperBound - lowerBound)
        const width = 1 / 8
        if (pct < width * 0) {
          return '#ffffff'
        } else if (pct < width * 1) {
          return '#ffffff'
        } else if (pct < width * 2) {
          return '#000000'
        } else if (pct < width * 3) {
          return '#000000'
        } else if (pct < width * 4) {
          return '#000000'
        } else if (pct < width * 5) {
          return '#000000'
        } else if (pct < width * 6) {
          return '#000000'
        } else if (pct < width * 7) {
          return '#ffffff'
        } else if (pct < 1) {
          return '#ffffff'
        } else if (pct >= 1) {
          return '#ffffff'
        } else {
          return '#BDBDBD'
        }
      } else {
        return defaultColor || '#ffffff'
      }
    },

    scoreCY(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const prop = textOrNumber || 'text'
      return index >= 0 ? this.values.scoreCY[index][prop] || '-' : '-'
    },
    scorePY(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const prop = textOrNumber || 'text'
      return index >= 0 ? this.values.scorePY[index][prop] || '-' : '-'
    },
    scorePY2(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const prop = textOrNumber || 'text'
      return index >= 0 ? this.values.scorePY2[index][prop] || '-' : '-'
    },
    scorePY3(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const prop = textOrNumber || 'text'
      return index >= 0 ? this.values.scorePY3[index][prop] || '-' : '-'
    },
    scorePY4(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      console.log(
        'scorePY4',
        metricCycleKey,
        index,
        index >= 0 ? this.values?.scorePY4[index] : ''
      )
      const prop = textOrNumber || 'text'
      return index >= 0 ? this.values.scorePY4[index][prop] || '-' : '-'
    },
    target(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const prop = textOrNumber || 'text'
      return index >= 0 ? this.values.target[index][prop] || '-' : '-'
    },
    nextTarget(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const prop = textOrNumber || 'text'
      return index >= 0 ? this.values.nextTarget[index][prop] || '-' : '-'
    },
    finalTarget(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const prop = textOrNumber || 'text'
      return index >= 0 ? this.values.finalTarget[index][prop] || '-' : '-'
    },
    labelDistance(value, textOrNumber) {
      if (isFinite(value)) {
        if (textOrNumber == null || textOrNumber === 'text') {
          let v = `${value > 0 ? '+' : ''}${value}`
          // force decimal
          if (Math.floor(value) === value) v = `${v}.0`
          return v
        } else {
          return value
        }
      } else {
        return '-'
      }
    },
    distanceTargetCY(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0 && isFinite(this.values.scoreCY[index]?.number)
          ? Math.round(
              1000 *
                (this.values.scoreCY[index]?.number -
                  this.values.target[index]?.number)
            ) / 10 || NaN
          : NaN
      return this.labelDistance(value, textOrNumber)
    },
    tierDistanceTargetCY(metricCycleKey) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0
          ? this.values.scoreCY[index]?.number -
              this.values.target[index]?.number || NaN
          : NaN
      return value < -0.1
        ? 'off_track'
        : value < 0
        ? 'near_track'
        : value >= 0
        ? 'on_track'
        : ''
    },
    tierDistanceTargetPY(metricCycleKey) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0
          ? this.values.scorePY[index]?.number -
              this.values.target[index]?.number || NaN
          : NaN
      return value < -0.1
        ? 'off_track'
        : value < 0
        ? 'near_track'
        : value >= 0
        ? 'on_track'
        : ''
    },
    tierDistanceTargetPY2(metricCycleKey) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0
          ? this.values.scorePY2[index]?.number -
              this.values.target[index]?.number || NaN
          : NaN
      return value < -0.1
        ? 'off_track'
        : value < 0
        ? 'near_track'
        : value >= 0
        ? 'on_track'
        : ''
    },
    distanceNextTargetCY(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0 && isFinite(this.values.scoreCY[index]?.number)
          ? Math.round(
              1000 *
                (this.values.scoreCY[index]?.number -
                  this.values.nextTarget[index]?.number)
            ) / 10 || NaN
          : NaN
      return this.labelDistance(value, textOrNumber)
    },
    distanceFinalTargetCY(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0 && isFinite(this.values.scoreCY[index]?.number)
          ? Math.round(
              1000 *
                (this.values.scoreCY[index]?.number -
                  this.values.finalTarget[index]?.number)
            ) / 10 || NaN
          : NaN
      return this.labelDistance(value, textOrNumber)
    },
    distanceTargetPY(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0 && isFinite(this.values.scorePY[index]?.number)
          ? Math.round(
              1000 *
                (this.values.scorePY[index]?.number -
                  this.values.target[index]?.number)
            ) / 10 || NaN
          : NaN
      return this.labelDistance(value, textOrNumber)
    },
    distanceNextTargetPY(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0 && isFinite(this.values.scorePY[index]?.number)
          ? Math.round(
              1000 *
                (this.values.scorePY[index]?.number -
                  this.values.nextTarget[index]?.number)
            ) / 10 || NaN
          : NaN
      return this.labelDistance(value, textOrNumber)
    },
    distanceFinalTargetPY(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0 && isFinite(this.values.scorePY[index]?.number)
          ? Math.round(
              1000 *
                (this.values.scorePY[index]?.number -
                  this.values.finalTarget[index]?.number)
            ) / 10 || NaN
          : NaN
      return this.labelDistance(value, textOrNumber)
    },
    distanceTargetPY2(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0 && isFinite(this.values.scorePY2[index]?.number)
          ? Math.round(
              1000 *
                (this.values.scorePY2[index]?.number -
                  this.values.target[index]?.number)
            ) / 10 || NaN
          : NaN
      return this.labelDistance(value, textOrNumber)
    },
    distanceNextTargetPY2(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0 && isFinite(this.values.scorePY2[index]?.number)
          ? Math.round(
              1000 *
                (this.values.scorePY2[index]?.number -
                  this.values.nextTarget[index]?.number)
            ) / 10 || NaN
          : NaN
      return this.labelDistance(value, textOrNumber)
    },
    distanceFinalTargetPY2(metricCycleKey, textOrNumber) {
      const index = this.metricCycleIndex(metricCycleKey)
      const value =
        index >= 0 && isFinite(this.values.scorePY2[index]?.number)
          ? Math.round(
              1000 *
                (this.values.scorePY2[index]?.number -
                  this.values.finalTarget[index]?.number)
            ) / 10 || NaN
          : NaN
      return this.labelDistance(value, textOrNumber)
    },

    /** footnotes (ss - subscript) */
    /**
     * used to gather the index of the particular index for a metric, used for gathering parallel metrics
     */
    footnoteCycleIndex(metricCycleKey) {
      if (this.footnotes?.metricCycleKey?.length > 0) {
        const index = this.footnotes.metricCycleKey
          .map((obj, index) => ({
            ...obj,
            index,
          }))
          .filter(({ text }) => metricCycleKey === text)
          .map(({ index }) => index)
        if (index.length >= 0) {
          return index[0]
        } else {
          return -1
        }
      } else {
        return -1
      }
    },

    /** Because in order to trick Qlik into reusing numeric values for distinct strings
     * with the dual function
     * e.g. Dual('my first footnote', 1)) and Dual('my first footnote on another table', 1)
     * we provided arbitrary decimal values to the footnote numbers, the following
     * function removes them (if numeric, if text leave as be)
     */
    rmDec(value) {
      if (typeof value === 'number') {
        return Math.floor(value)
      } else {
        return value
      }
    },

    ssSchoolYearPY4(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 &&
        isFinite(this.footnotes.ssSchoolYearPY4[index]?.number)
        ? this.rmDec(
            this.footnotes.ssSchoolYearP4[index][textOrNumber || 'number']
          )
        : ''
    },
    ssSchoolYearPY3(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 &&
        isFinite(this.footnotes.ssSchoolYearPY3[index]?.number)
        ? this.rmDec(
            this.footnotes.ssSchoolYearPY3[index][textOrNumber || 'number']
          )
        : ''
    },
    ssSchoolYearPY2(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 &&
        isFinite(this.footnotes.ssSchoolYearPY2[index]?.number)
        ? this.rmDec(
            this.footnotes.ssSchoolYearPY2[index][textOrNumber || 'number']
          )
        : ''
    },
    ssSchoolYearPY(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 &&
        isFinite(this.footnotes.ssSchoolYearPY[index]?.number)
        ? this.rmDec(
            this.footnotes.ssSchoolYearPY[index][textOrNumber || 'number']
          )
        : ''
    },
    ssSchoolYearCY(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 &&
        isFinite(this.footnotes.ssSchoolYearCY[index]?.number)
        ? this.rmDec(
            this.footnotes.ssSchoolYearCY[index][textOrNumber || 'number']
          )
        : ''
    },
    ssScoreCY(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 && isFinite(this.footnotes.ssScoreCY[index]?.number)
        ? this.rmDec(this.footnotes.ssScoreCY[index][textOrNumber || 'number'])
        : ''
    },
    ssScorePY(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 && isFinite(this.footnotes.ssScorePY[index]?.number)
        ? this.rmDec(this.footnotes.ssScorePY[index][textOrNumber || 'number'])
        : ''
    },
    ssScorePY2(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 && isFinite(this.footnotes.ssScorePY2[index]?.number)
        ? this.rmDec(this.footnotes.ssScorePY2[index][textOrNumber || 'number'])
        : ''
    },
    ssMetric(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 && isFinite(this.footnotes.ssMetric[index]?.number)
        ? this.rmDec(this.footnotes.ssMetric[index][textOrNumber || 'number'])
        : ''
    },
    ssGroup(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      // console.log(
      //   'ssGroup',
      //   metricCycleKey,
      //   index,
      //   index >= 0 ? this.footnotes.ssGroup[index].text : ''
      // )
      return index >= 0 && isFinite(this.footnotes.ssGroup[index]?.number)
        ? this.rmDec(this.footnotes.ssGroup[index][textOrNumber || 'number'])
        : ''
    },
    ssMetricGroup(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 && isFinite(this.footnotes.ssMetricGroup[index]?.number)
        ? this.rmDec(
            this.footnotes.ssMetricGroup[index][textOrNumber || 'number']
          )
        : ''
    },
    ssMetricGroupPY(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 &&
        isFinite(this.footnotes.ssMetricGroupPY[index]?.number)
        ? this.rmDec(
            this.footnotes.ssMetricGroupPY[index][textOrNumber || 'number']
          )
        : ''
    },
    ssDistance(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 && isFinite(this.footnotes.ssDistance[index]?.number)
        ? this.rmDec(this.footnotes.ssDistance[index][textOrNumber || 'number'])
        : ''
    },
    ssTargetGroup(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      // console.log('ssTargetGroup', metricCycleKey, index)
      return index >= 0 && isFinite(this.footnotes.ssTargetGroup[index]?.number)
        ? this.rmDec(
            this.footnotes.ssTargetGroup[index][textOrNumber || 'number']
          )
        : ''
    },
    ssCycle(metricCycleKey, textOrNumber) {
      const index = this.footnoteCycleIndex(metricCycleKey)
      return index >= 0 && isFinite(this.footnotes.ssCycle[index]?.number)
        ? this.rmDec(this.footnotes.ssCycle[index][textOrNumber || 'number'])
        : ''
    },
  },
}
</script>
