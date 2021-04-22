<template>
  <div class="container mx-auto flex flex-wrap lg:flex-no-wrap justify-around">
    <div v-if="!print" class="w-full lg:w-1/5 lg:h-screen lg:sticky lg:top-0">
      <div class="bg-blue-100 px-2">
        <scroll-spy-nav
          title="Sections"
          :refs="['section1', 'section2']"
          :target="thisComponent"
          orientation="col"
          indent-links="1rem"
        />
        <navigation-links
          title="Goal 2 Links"
          indent-links="1rem"
          :links="[
            { link: `/goal2/fall`, label: 'Fall' },
            { link: `/goal2/winter`, label: 'Winter' },
            { link: `/goal2/spring`, label: 'Spring' },
          ]"
        />
      </div>
      <color-key class="mt-3 hidden md:block" dense />
    </div>
    <div class="report" :class="print ? 'report--print' : ''">
      <div v-if="print" ref="cover" name="Cover" class="page">
        <div class="b-banner">
          School District of Philadelphia - Board of Education | Reading
          Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="flex justify-between mt-2">
          <div class="b-infobox mr-2">
            <div class="b-infobox__title">Reading - Board Goal 2:</div>
            <div class="b-infobox__text">
              The percentage of 3rd grade students who are proficient on the
              state ELA assessment will grow from 32.5% in August 2019 to 62.0%
              by August 2026.
            </div>
          </div>
        </div>
        <div v-if="print" class="b-table w-full mt-2">
          <div class="flex justify-center w-full">
            <div class="w-full">
              <div
                v-for="(section, pIndex) in sections"
                :key="pIndex"
                class="b-table__row flex w-full"
              >
                <div class="b-table__value b-table__value--current w-1/4">
                  Page {{ pIndex + 1 }}
                </div>
                <div class="b-table__value w-auto w-3/4">
                  {{ section.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref="section1" :name="sections[0].label" class="page">
        <div v-if="print" class="b-banner">
          School District of Philadelphia - Board of Education | Reading
          Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="b-section-title">{{ sections[0].title }}</div>
        <div class="flex justify-between mb-2">
          <div class="b-infobox mr-2">
            <div class="b-infobox__title">Reading - Board Goal 2:</div>
            <div class="b-infobox__text">
              The percentage of 3rd grade students who are proficient on the
              state ELA assessment will grow from 32.5% in August 2019 to 62.0%
              by August 2026.
            </div>
          </div>
        </div>
        <div class="b-infobox w-full flex">
          <div class="mr-4 flex-grow flex flex-col justify-center items-start">
            <div class="w-full b-infobox__subtitle">Goal Overall Progress</div>
            <div
              class="w-full b-infobox__subtitle text-black font-bold"
              :class="
                'bg-' +
                tierDistanceTargetPY2(
                  `2|Goal 2|PSSA|All|All|proficient_advanced|PSSA`
                )
              "
            >
              {{
                label(
                  tierDistanceTargetPY2(
                    `2|Goal 2|PSSA|All|All|proficient_advanced|PSSA`
                  )
                )
              }}
            </div>
          </div>
          <div class="w-1/2">
            <target-chart
              :series="[
                {
                  key: 'ela',
                  color: '#0000aa',
                  label: 'PSSA English Language Arts',
                  values: [
                    NaN,
                    scorePY4(
                      `2|Goal 2|PSSA|All|All|proficient_advanced|PSSA`,
                      'number'
                    ),
                    scorePY3(
                      `2|Goal 2|PSSA|All|All|proficient_advanced|PSSA`,
                      'number'
                    ),
                    scorePY2(
                      `2|Goal 2|PSSA|All|All|proficient_advanced|PSSA`,
                      'number'
                    ),
                    scorePY(
                      `2|Goal 2|PSSA|All|All|proficient_advanced|PSSA`,
                      'number'
                    ),
                    scoreCY(
                      `2|Goal 2|PSSA|All|All|proficient_advanced|PSSA`,
                      'number'
                    ),
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                  ],
                  showValueLabels: true,
                },
                {
                  key: 'target',
                  color: 'black',
                  label: 'Targets',
                  style: 'dashed',
                  values: [
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    0.354,
                    0.393,
                    0.443,
                    0.497,
                    0.556,
                    0.62,
                  ],
                },
              ]"
              :x-axis="[
                '',
                '2016-17',
                '2017-18',
                '2018-19',
                '2019-20',
                '2020-21',
                '2021-22',
                '2022-23',
                '2023-24',
                '2024-25',
                '2025-26',
              ]"
            />
          </div>
        </div>
        <div class="b-table w-full mt-2">
          <div class="b-table__title">
            Reading Goal 2: District-Wide Proficiency <br />
            Grade 3, PSSA English Language Arts
            <sup>
              {{
                ssMetricGroup(`2|Goal 2|PSSA|All|All|proficient_advanced|PSSA`)
              }}
            </sup>
          </div>
          <table v-if="loaded" class="table-fixed">
            <thead>
              <tr class="b-table__header-row">
                <th class="b-table__header-row-value w-32">&nbsp;</th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p4 }}
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p3 }}
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p2 }}
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p }}
                  <sup>
                    {{
                      ssSchoolYearPY(
                        `2|Goal 2|PSSA|All|All|proficient_advanced|PSSA`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }} Annual Goal
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_c }} Goal
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_n }} Goal
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_f }} Final Goal
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(group, gIndex) in groupsAll"
                :key="gIndex"
                class="b-table__row"
                :class="{ 'font-bold': group.value === 'All' }"
              >
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{ group.value }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY4(
                      `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY3(
                      `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td
                  :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scorePY2(
                        `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ),
                      target(
                        `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) / 2,
                      target(
                        `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scorePY2(
                        `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ),
                      target(
                        `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) / 2,
                      target(
                        `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) * 1.5
                    ),
                  }"
                >
                  {{
                    scorePY2(
                      `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY(
                      `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    target(
                      `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceTargetPY2(
                      `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceTargetPY2(
                      `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceNextTargetPY2(
                      `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceNextTargetPY2(
                      `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    finalTarget(
                      `2|Goal 2|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="b-table__footnotes">
            <div v-for="(text, fIndex) in footnotesSection1" :key="fIndex">
              {{ text }}
            </div>
          </div>
        </div>
      </div>
      <div ref="section2" :name="sections[1].label" class="page">
        <div v-if="print" class="b-banner">
          School District of Philadelphia - Board of Education | Reading
          Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="b-section-title">
          <span style="white-space: pre">{{ sections[1].title }}</span>
        </div>
        <div
          v-for="(targetGroup, tIndex) in targetGroups"
          :key="tIndex"
          :class="{ 'mt-16': tIndex > 0 }"
        >
          <!-- <div class="b-infobox b-infobox__subtitle">
            {{ currentCycle }} {{ year }} <br />
            {{ targetGroup.label }} Group ({{ targetGroup.count }} Schools)
          </div> -->
          <div class="b-table w-full mt-2">
            <div class="b-table__title">
              {{ displayedTargetGroupSourceCycle }}
              {{ targetGroup.label }} Group ({{
                targetGroupCount[targetGroup.value]
              }}
              Schools): Participation & Performance <br />
              Grade 3, PSSA English Language Arts,
              {{ $store.getters.sy_p2 }}
            </div>
            <table v-if="loaded" class="table-fixed">
              <thead>
                <tr class="b-table__header-row">
                  <td class="b-table__header-row-value w-48">&nbsp;</td>
                  <td class="b-table__header-row-value"># Students</td>
                  <td class="b-table__header-row-value">% Below Basic</td>
                  <td class="b-table__header-row-value">% Basic</td>
                  <td class="b-table__header-row-value">
                    % Proficient or Advanced
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(group, gIndex) in groupsAllWithOpposite"
                  :key="gIndex"
                  class="b-table__row"
                  :class="{ 'font-bold': group.value === 'All' }"
                >
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{ group.value }}
                    <sup>
                      {{
                        ssGroup(
                          `2|Goal 2|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`
                        )
                      }}
                    </sup>
                  </td>

                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `2|Goal 2|PSSA|${targetGroup.value}|${group.value}|student_count|PSSA`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `2|Goal 2|PSSA|${targetGroup.value}|${group.value}|below_basic|PSSA`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `2|Goal 2|PSSA|${targetGroup.value}|${group.value}|basic|PSSA`
                      )
                    }}
                  </td>
                  <td
                    :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                    :style="{
                      'background-color': colorScaleRedBlue(
                        scorePY2(
                          `2|Goal 2|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ),
                        target(
                          `2|Goal 2|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ) / 2,
                        target(
                          `2|Goal 2|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ) * 1.5
                      ),
                      color: colorScaleTextRedBlue(
                        scorePY2(
                          `2|Goal 2|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ),
                        target(
                          `2|Goal 2|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ) / 2,
                        target(
                          `2|Goal 2|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ) * 1.5
                      ),
                    }"
                  >
                    {{
                      scorePY2(
                        `2|Goal 2|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="b-table__footnotes">
          <div v-for="(text, fIndex) in footnotesSection2" :key="fIndex">
            {{ text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import metricsDef from '~/definitions/metrics'
import footnotesDef from '~/definitions/footnotes'
import SelectionsMixin from '~/mixins/SelectionsMixin'
import ScrollSpyNav from '~sdp-components/Navigation/ScrollSpyNav'
import MetricsMixin from '~/mixins/MetricsMixin.vue'
import TargetChart from '~/components/TargetChart'
import ColorKey from '~/components/ColorKey'
import NavigationLinks from '~/components/NavigationLinks'

export default {
  layout: 'goal',
  name: 'BoardGoal2',
  components: {
    ScrollSpyNav,
    TargetChart,
    ColorKey,
    NavigationLinks,
  },
  mixins: [SelectionsMixin, MetricsMixin],
  data() {
    return {
      print: false,
      goal: 2,
      indicators: ['Goal 2'],
      targetGroupSourceCycle: 'Fall|2020-2021',
      values: null,
      footnotes: null,
      availableSourceCycles: null,
    }
  },
  computed: {
    loaded() {
      return this.values != null
    },

    /// needed for scroll spy
    thisComponent() {
      return this
    },

    // for displaying options of target groups

    displayedTargetGroupSourceCycle() {
      return this.availableSourceCycles[this.targetGroupSourceCycle]
    },

    /** Aliases for store */
    year() {
      return this.$store.state.year_c
    },
    currentCycle() {
      return this.$store.state.cycle_c
    },

    sections() {
      return [
        {
          title: 'Reading Goal 2 Performance: Overall and by Student Group',
          label: 'Overall and Student Groups',
        },
        {
          title: `Reading Goal 2 Performance: ${this.displayedTargetGroupSourceCycle} Target \nOff-Track, Near-Track, and On-Track School Groups`,
          label: 'Off-Track, Near-Track, On-Track Schools',
        },
      ]
    },
    targetGroups() {
      return [
        { value: 'off_track', label: 'Off-Track' },
        { value: 'near_track', label: 'Near-Track' },
        { value: 'on_track', label: 'On-Track' },
      ]
    },
    gradeSpans() {
      return [
        { value: 'All', label: 'All Grades', indicator: 'PSSA' },
        { value: 'Kindergarten', label: 'Kindergarten', indicator: 'PSSA' },
        { value: 'Grade 1', label: 'Grade 1', indicator: 'PSSA' },
        { value: 'Grade 2', label: 'Grade 2', indicator: 'PSSA' },
        { value: 'Grade 3', label: 'Grade 3', indicator: 'PSSA' },
      ]
    },
    cycles() {
      return [
        { value: 'Fall', label: 'Fall' },
        { value: 'Winter', label: 'Winter' },
        { value: 'Spring', label: 'Spring' },
      ]
    },

    ethnicGroups() {
      return [
        {
          value: 'Black / African American',
          label: 'Black / African American',
          indicator: 'PSSA',
        },
        {
          value: 'Hispanic / Latino',
          label: 'Hispanic / Latino',
          indicator: 'PSSA',
        },
        { value: 'White', label: 'White', indicator: 'PSSA' },
        {
          value: 'American Indian / Alaskan Native',
          label: 'American Indian / Alaskan Native',
          indicator: 'PSSA',
        },
        { value: 'Asian', label: 'Asian', indicator: 'PSSA' },
        {
          value: 'Native Hawaiian / Pacific Islander',
          label: 'Native Hawaiian / Pacific Islander',
          indicator: 'PSSA',
        },
        {
          value: 'Multi Racial / Other',
          label: 'Multi Racial / Other',
          indicator: 'PSSA',
        },
      ]
    },
    otherGroups() {
      return [
        {
          value: 'English Learners',
          label: 'English Learners',
          indicator: 'PSSA',
        },
        {
          value: 'Special Education',
          label: 'Special Education',
          indicator: 'PSSA',
        },
        {
          value: 'Economically Disadvantaged',
          label: 'Economically Disadvantaged',
          indicator: 'PSSA',
        },
      ]
    },
    otherGroupsWithOpposite() {
      return [
        {
          value: 'English Learners',
          label: 'English Learners',
          indicator: 'PSSA',
        },
        {
          value: 'Non-English Learners',
          label: 'Non-English Learners',
          indicator: 'PSSA',
        },
        { isSep: true },
        {
          value: 'Special Education',
          label: 'Special Education',
          indicator: 'PSSA',
        },
        {
          value: 'Non-Special Education',
          label: 'Non-Special Education',
          indicator: 'PSSA',
        },
        { isSep: true },
        {
          value: 'Economically Disadvantaged',
          label: 'Economically Disadvantaged',
          indicator: 'PSSA',
        },
        {
          value: 'Non-Economically Disadvantaged',
          label: 'Non-Economically Disadvantaged',
          indicator: 'PSSA',
        },
      ]
    },
    groups() {
      return this.ethnicGroups.concat(
        [{ isSep: true }].concat(this.otherGroups)
      )
    },
    groupsWithOpposite() {
      return this.ethnicGroups.concat(
        [{ isSep: true }].concat(this.otherGroupsWithOpposite)
      )
    },
    groupsAll() {
      return [
        { value: 'All', label: 'All', indicator: 'PSSA' },
        { isSep: true },
      ].concat(this.groups)
    },
    groupsAllWithOpposite() {
      return [
        { value: 'All', label: 'All', indicator: 'PSSA' },
        { isSep: true },
      ].concat(this.groupsWithOpposite)
    },
    footnotesSection1() {
      const values = [
        this.ssMetricGroup(
          `2|Goal 2|PSSA|All|All|proficient_advanced|PSSA`,
          'text'
        ),
        this.ssSchoolYearPY(
          `2|Goal 2|PSSA|All|All|proficient_advanced|PSSA`,
          'text'
        ),
      ]
      return values.filter((text) => text?.length > 0)
    },
    footnotesSection2() {
      let values = []
      this.groups.forEach((group) => {
        values = values.concat([
          this.ssGroup(
            `2|Goal 2|PSSA|on_track|${group.value}|proficient_advanced|PSSA`,
            'text'
          ),
        ])
      })
      values = values.filter((text) => text?.length > 0)
      values = values.filter((text, index) => values.indexOf(text) === index)
      return values
    },
  },
  async created() {
    const targetGroupSourceCycles = this.$store.state.targetGroupSourceCycles
      .goal2
    // for displaying options of target groups
    this.availableSourceCycles = {}
    targetGroupSourceCycles.forEach(({ value, label }) => {
      this.availableSourceCycles[value] = label
    })

    if (targetGroupSourceCycles.length > 0) {
      const targetGroupSourceCycle =
        targetGroupSourceCycles[targetGroupSourceCycles.length - 1]
      this.targetGroupSourceCycle = targetGroupSourceCycle.value
      this.targetGroupCount = {
        off_track: targetGroupSourceCycle.off_track,
        near_track: targetGroupSourceCycle.near_track,
        on_track: targetGroupSourceCycle.on_track,
      }
    } else {
      throw new Error('No current targetGroupSourceCycle found for goal2')
    }

    await this.fetchData()
  },
  methods: {
    async handleSourceCycleSelection({ value }) {
      this.targetGroupSourceCycle = value
      const targetGroupSourceCycles = this.$store.state.targetGroupSourceCycles
        .goal2
      // get the main object for the targetGroupSourceCycles, based upon the selection, to get # schools
      let targetGroupSourceCycle = targetGroupSourceCycles.filter(
        ({ value: v }) => value === v
      )
      if (targetGroupSourceCycle.length > 0) {
        targetGroupSourceCycle = targetGroupSourceCycle[0]
        this.targetGroupCount = {
          off_track: targetGroupSourceCycle.off_track,
          near_track: targetGroupSourceCycle.near_track,
          on_track: targetGroupSourceCycle.on_track,
        }
      } else {
        throw new Error(`${value} targetGroupSourceCycle not found for goal2`)
      }

      await this.fetchData()
    },
    async fetchData() {
      const metricsSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
        metricsDef(this.goal, this.indicators, this.targetGroupSourceCycle)
      )
      this.values = await this.$qlik.getValuesFromHypercubeObject(
        metricsSessionObject
      )
      await this.$qlik.destroySessionObject(metricsSessionObject)

      const footnotesSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
        footnotesDef(this.goal, this.indicators, this.targetGroupSourceCycle)
      )
      this.footnotes = await this.$qlik.getValuesFromHypercubeObject(
        footnotesSessionObject
      )
      await this.$qlik.destroySessionObject(footnotesSessionObject)
    },
  },
}
</script>
