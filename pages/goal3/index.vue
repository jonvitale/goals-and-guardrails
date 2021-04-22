<template>
  <div class="container mx-auto flex flex-wrap lg:flex-no-wrap justify-around">
    <div v-if="!print" class="w-full lg:w-1/5 lg:h-screen lg:sticky lg:top-0">
      <div class="bg-blue-100 px-2">
        <scroll-spy-nav
          class="bg-blue-100 px-2"
          title="Sections"
          :refs="['section1', 'section2', 'section2_1']"
          :target="thisComponent"
          orientation="col"
          indent-links="1rem"
        />
        <navigation-links
          title="Goal 3 Links"
          indent-links="1rem"
          :links="[
            { link: `/goal3/fall`, label: 'Fall' },
            { link: `/goal3/winter`, label: 'Winter' },
            { link: `/goal3/spring`, label: 'Spring' },
          ]"
        />
      </div>
      <color-key class="mt-3 hidden md:block" dense />
    </div>
    <div class="report" :class="print ? 'report--print' : ''">
      <div v-if="print" ref="cover" name="Cover" class="page">
        <div class="b-banner">
          School District of Philadelphia - Board of Education | Math Progress
          Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="flex justify-between mt-2">
          <div class="b-infobox mr-2">
            <div class="b-infobox__title">Math - Board Goal 3:</div>
            <div class="b-infobox__text">
              The percentage of students in grades 3-8 who are proficient on the
              state Math assessment will grow from 21.6% in August 2019 to 52.0%
              by August 2026
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
          School District of Philadelphia - Board of Education | Math Progress
          Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="b-section-title">{{ sections[0].title }}</div>
        <div class="flex justify-between mb-2">
          <div class="b-infobox mr-2">
            <div class="b-infobox__title">Math - Board Goal 3:</div>
            <div class="b-infobox__text">
              The percentage of students in grades 3-8 who are proficient on the
              state Math assessment will grow from 21.6% in August 2019 to 52.0%
              by August 2026
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
                  `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`
                )
              "
            >
              {{
                label(
                  tierDistanceTargetPY2(
                    `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`
                  )
                )
              }}
            </div>
          </div>
          <div class="w-1/2">
            <target-chart
              :series="[
                {
                  key: 'math',
                  color: '#0000aa',
                  label: 'PSSA Math',
                  values: [
                    NaN,
                    scorePY4(
                      `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`,
                      'number'
                    ),
                    scorePY3(
                      `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`,
                      'number'
                    ),
                    scorePY2(
                      `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`,
                      'number'
                    ),
                    scorePY(
                      `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`,
                      'number'
                    ),
                    scoreCY(
                      `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`,
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
                    0.246,
                    0.287,
                    0.338,
                    0.394,
                    0.454,
                    0.52,
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
            Math Goal 3: District-Wide Proficiency <br />
            Grades 3-8, PSSA Math
            <sup>
              {{
                ssMetricGroup(`3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`)
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
                        `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`
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
                v-for="(group, gIndex) in groupsAllWithGender"
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
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY3(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td
                  :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scorePY2(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ),
                      target(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) / 2,
                      target(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scorePY2(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ),
                      target(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) / 2,
                      target(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) * 1.5
                    ),
                  }"
                >
                  {{
                    scorePY2(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    target(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceTargetPY2(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceTargetPY2(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceNextTargetPY2(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceNextTargetPY2(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    finalTarget(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
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
        <div class="b-table w-full mt-2">
          <table v-if="loaded" class="table-fixed">
            <thead>
              <tr class="b-table__header-row">
                <td class="b-table__header-row-value">
                  {{ syData }}
                </td>
                <td class="b-table__header-row-value">
                  # Students
                  <sup>
                    {{ ssMetric(`3|Goal 3|PSSA|All|All|student_count|PSSA`) }}
                  </sup>
                </td>
                <td class="b-table__header-row-value">% Below Basic</td>
                <td class="b-table__header-row-value">% Basic</td>
                <td class="b-table__header-row-value">
                  % Proficient or Advanced
                </td>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }} Annual Goal
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_c }} Goal
                  <sup>
                    {{
                      ssDistance(
                        `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_n }} Goal
                  <sup>
                    {{
                      ssDistance(
                        `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_f }} Final Goal
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(group, gIndex) in gradeSpans"
                :key="gIndex"
                class="b-table__row"
                :class="{ 'font-bold': group.value === 'All' }"
              >
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{ group.value }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY2(
                      `3|Goal 3|PSSA|All|${group.value}|student_count|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY2(
                      `3|Goal 3|PSSA|All|${group.value}|below_basic|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{ scorePY2(`3|Goal 3|PSSA|All|${group.value}|basic|PSSA`) }}
                </td>
                <td
                  :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scorePY2(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ),
                      target(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) / 2,
                      target(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scorePY2(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ),
                      target(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) / 2,
                      target(
                        `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`,
                        'number'
                      ) * 1.5
                    ),
                  }"
                >
                  {{
                    scorePY2(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    target(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceTargetPY2(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceTargetPY2(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceNextTargetPY2(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceNextTargetPY2(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    finalTarget(
                      `3|Goal 3|PSSA|All|${group.value}|proficient_advanced|PSSA`
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="b-table__footnotes">
            <div>See all footnotes below target group tables below</div>
          </div>
        </div>
        <div ref="section2_1" :name="sections[2].label" class="b-section-title">
          {{ sections[2].title }}
        </div>
        <div class="w-full flex justify-center">
          <button-group
            :options="availableSourceCycles"
            label="Select other target groups based upon cycle:"
            :selected-value="targetGroupSourceCycle"
            @buttonClicked="handleSourceCycleSelection"
          />
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
              Grades 3-8, PSSA Math,
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
                          `3|Goal 3|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`
                        )
                      }}
                    </sup>
                  </td>

                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `3|Goal 3|PSSA|${targetGroup.value}|${group.value}|student_count|PSSA`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `3|Goal 3|PSSA|${targetGroup.value}|${group.value}|below_basic|PSSA`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `3|Goal 3|PSSA|${targetGroup.value}|${group.value}|basic|PSSA`
                      )
                    }}
                  </td>
                  <td
                    :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                    :style="{
                      'background-color': colorScaleRedBlue(
                        scorePY2(
                          `3|Goal 3|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ),
                        target(
                          `3|Goal 3|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ) / 2,
                        target(
                          `3|Goal 3|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ) * 1.5
                      ),
                      color: colorScaleTextRedBlue(
                        scorePY2(
                          `3|Goal 3|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ),
                        target(
                          `3|Goal 3|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ) / 2,
                        target(
                          `3|Goal 3|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`,
                          'number'
                        ) * 1.5
                      ),
                    }"
                  >
                    {{
                      scorePY2(
                        `3|Goal 3|PSSA|${targetGroup.value}|${group.value}|proficient_advanced|PSSA`
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
import ButtonGroup from '~sdp-components/PageElements/ButtonGroup'

export default {
  layout: 'goal',
  name: 'BoardGoal3',
  components: {
    ScrollSpyNav,
    TargetChart,
    ColorKey,
    NavigationLinks,
    ButtonGroup,
  },
  mixins: [SelectionsMixin, MetricsMixin],
  data() {
    return {
      print: false,
      goal: 3,
      indicators: ['Goal 3'],
      values: null,
      footnotes: null,
      targetGroupSourceCycle: 'Winter|2020-2021',
      targetGroupCount: {},
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

    displayedTargetGroupSourceCycle() {
      return this.availableSourceCycles[this.targetGroupSourceCycle]
    },

    /** Aliases for store */
    year() {
      return this.$store.state.year_c
    },
    syData() {
      return this.$store.getters.sy_p2
    },
    currentCycle() {
      return this.$store.state.cycle_c
    },

    sections() {
      return [
        {
          title: 'Math Goal 3 Performance: Overall and by Student Group',
          label: 'Overall and Student Groups',
        },
        {
          title: `Math Goal 3 Performance by Grade Level`,
          label: 'Grade Level',
        },
        {
          title: `Math Goal 3 Performance: ${this.displayedTargetGroupSourceCycle} Target \nOff-Track, Near-Track, and On-Track School Groups`,
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
        { value: 'Grade 3', label: 'Grade 3', indicator: 'PSSA' },
        { value: 'Grade 4', label: 'Grade 4', indicator: 'PSSA' },
        { value: 'Grade 5', label: 'Grade 5', indicator: 'PSSA' },
        { value: 'Grade 6', label: 'Grade 6', indicator: 'PSSA' },
        { value: 'Grade 7', label: 'Grade 7', indicator: 'PSSA' },
        { value: 'Grade 8', label: 'Grade 8', indicator: 'PSSA' },
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
    genders() {
      return [
        { value: 'Female', label: 'Female', indicator: 3.2 },
        { value: 'Male', label: 'Male', indicator: 3.2 },
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
    groupsWithGender() {
      return this.groups.concat(this.genders)
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
    groupsAllWithGender() {
      return [
        { value: 'All', label: 'All', indicator: 'PSSA' },
        { isSep: true },
      ].concat(this.groupsWithGender)
    },
    footnotesSection1() {
      const values = [
        this.ssMetricGroup(
          `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`,
          'text'
        ),
        this.ssSchoolYearPY(
          `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`,
          'text'
        ),
      ]
      return values.filter((text) => text?.length > 0)
    },
    footnotesSection2() {
      let values = [
        this.ssMetric(`3|Goal 3|PSSA|All|All|student_count|PSSA`, 'text'),
        this.ssDistance(
          `3|Goal 3|PSSA|All|All|proficient_advanced|PSSA`,
          'text'
        ),
      ]
      this.groups.forEach((group) => {
        values = values.concat([
          this.ssGroup(
            `3|Goal 3|PSSA|on_track|${group.value}|proficient_advanced|PSSA`,
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
      .goal3
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
      throw new Error('No current targetGroupSourceCycle found for goal3')
    }

    await this.fetchData()
  },
  methods: {
    async handleSourceCycleSelection({ value }) {
      this.targetGroupSourceCycle = value
      const targetGroupSourceCycles = this.$store.state.targetGroupSourceCycles
        .goal3
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
        throw new Error(`${value} targetGroupSourceCycle not found for goal3`)
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
