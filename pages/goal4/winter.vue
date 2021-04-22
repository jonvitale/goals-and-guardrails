<template>
  <!-- todo bold any rows that are current cycle 
    dark on near_track, white on off-track, on-track
  -->
  <div class="container mx-auto flex flex-wrap lg:flex-no-wrap justify-around">
    <div v-if="!print" class="w-full lg:w-1/5 lg:h-full lg:sticky lg:top-0">
      <div class="bg-blue-100 px-2">
        <scroll-spy-nav
          class="bg-blue-100 px-2"
          title="Sections"
          :refs="[
            'section1',
            'section2',
            'section3',
            'section4',
            'section5',
            'section6',
          ]"
          :target="thisComponent"
          orientation="col"
          indent-links="1rem"
        />
        <navigation-links
          title="Goal 4 Links"
          indent-links="1rem"
          :links="[
            { link: `/goal4`, label: 'Annual' },
            { link: `/goal4/fall`, label: 'Fall' },
            { link: `/goal4/spring`, label: 'Spring' },
          ]"
        />
      </div>
      <color-key dense class="mt-3 hidden md:block" />
    </div>
    <div class="report" :class="print ? 'report--print' : ''">
      <div v-if="print" ref="cover" name="Cover" class="page">
        <div class="b-banner">
          School District of Philadelphia - Board of Education | College &
          Career Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="flex justify-between mt-2">
          <div>
            <div class="b-infobox">
              <div class="b-infobox__title">Leading Indicator 4.1:</div>
              <div class="b-infobox__text">
                The percentage of students in grades 9-11 who score at or above
                grade level on the District's within-year math and reading
                assessments in Fall, Winter, and Spring each year.
              </div>
            </div>
            <div class="b-infobox">
              <div class="b-infobox__title">
                Leading Indicator 4.1 - Closing the Gap:
              </div>
              <div class="b-infobox__text">
                Closing the Gap: The percentage of students, by subgroup, in
                grades 9-11 who score at or above grade level on the District's
                within-year math and reading assessments in Fall, Winter, and
                Spring each year.
              </div>
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
          School District of Philadelphia - Board of Education | College &
          Career Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>

        <div class="b-section-title">{{ sections[0].title }}</div>
        <div class="flex justify-between mb-2">
          <div class="b-infobox mb-2">
            <div class="b-infobox__title">Leading Indicator 4.1:</div>
            <div class="b-infobox__text">
              The percentage of students in grades 9-11 who score at or above
              grade level on the District's within-year math and reading
              assessments in Fall, Winter, and Spring each year.
            </div>
          </div>
          <div class="b-infobox mb-2">
            <div class="b-infobox__title">
              Leading Indicator 4.1 - Closing the Gap:
            </div>
            <div class="b-infobox__text">
              Closing the Gap: The percentage of students, by subgroup, in
              grades 9-11 who score at or above grade level on the District's
              within-year math and reading assessments in Fall, Winter, and
              Spring each year.
            </div>
          </div>
        </div>
        <div class="b-infobox w-full flex">
          <div class="mr-4 flex-grow flex flex-col justify-center items-start">
            <div class="w-full b-infobox__subtitle">
              Leading Indicator Overall Progress
            </div>
            <div
              class="w-full b-infobox__subtitle text-black font-bold"
              :class="[
                'bg-' +
                  tierDistanceTargetCY(
                    `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                  ),
                'text-contrast-' +
                  tierDistanceTargetCY(
                    `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                  ),
              ]"
            >
              {{
                label(
                  tierDistanceTargetCY(
                    `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                  )
                )
              }}
            </div>
          </div>
          <div class="w-1/2">
            <target-chart
              :series="[
                {
                  key: 'fall',
                  color: '#0000aa',
                  label: 'Fall',
                  values: [
                    NaN,
                    scorePY3(`4|4.1|STAR|All|All|at_grade|Fall`, 'number'),
                    scorePY2(`4|4.1|STAR|All|All|at_grade|Fall`, 'number'),
                    scorePY(`4|4.1|STAR|All|All|at_grade|Fall`, 'number'),
                    scoreCY(`4|4.1|STAR|All|All|at_grade|Fall`, 'number'),
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                  ],
                  showValueLabels: false,
                },
                {
                  key: 'winter',
                  color: '#aaaa00',
                  label: 'Winter',
                  values: [
                    NaN,
                    scorePY3(`4|4.1|STAR|All|All|at_grade|Winter`, 'number'),
                    scorePY2(`4|4.1|STAR|All|All|at_grade|Winter`, 'number'),
                    scorePY(`4|4.1|STAR|All|All|at_grade|Winter`, 'number'),
                    scoreCY(`4|4.1|STAR|All|All|at_grade|Winter`, 'number'),
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                  ],
                  showValueLabels: false,
                },
                {
                  key: 'spring',
                  color: '#0088aa',
                  label: 'Spring',
                  values: [
                    NaN,
                    scorePY3(`4|4.1|STAR|All|All|at_grade|Spring`, 'number'),
                    scorePY2(`4|4.1|STAR|All|All|at_grade|Spring`, 'number'),
                    scorePY(`4|4.1|STAR|All|All|at_grade|Spring`, 'number'),
                    scoreCY(`4|4.1|STAR|All|All|at_grade|Spring`, 'number'),
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                  ],
                  showValueLabels: false,
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
                    0.474,
                    0.529,
                    0.601,
                    0.681,
                    0.77,
                    0.87,
                  ],
                },
              ]"
              :x-axis="[
                '',
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
            Leading Indicator: District-Wide % At/Above Grade Level <br />
            Grades 9-11, Star Math & Reading
            <sup>
              {{ ssMetricGroup(`4|4.1|STAR|All|All|at_grade|${currentCycle}`) }}
            </sup>
          </div>
          <table v-if="loaded" class="table-fixed">
            <thead>
              <tr class="b-table__header-row">
                <th class="b-table__header-row-value w-24">
                  Assessment Period
                </th>
                <th class="b-table__header-row-value text-right">
                  {{ $store.getters.sy_p }}
                  <sup>
                    {{
                      ssSchoolYearPY(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                  <br />
                  % Participating
                  <sup>
                    {{
                      ssMetricGroup(
                        `4|4.1|STAR|All|All|participating|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p }}
                  <sup>
                    {{
                      ssSchoolYearPY(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                  <br />
                  % At/Above Grade Level
                  <sup>
                    {{
                      ssMetricGroup(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }}
                  <sup>
                    {{
                      ssSchoolYearCY(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                  <br />
                  % Participating
                  <sup>
                    {{
                      ssMetricGroup(
                        `4|4.1|STAR|All|All|participating|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }}
                  <sup>
                    {{
                      ssSchoolYearCY(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                  <br />
                  % At/Above Grade Level
                  <sup>
                    {{
                      ssMetricGroup(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }} <br />
                  Annual Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_c }} Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_n }} Target
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_f }} <br />
                  Final Target
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(cycle, cIndex) in cycles"
                :key="cIndex"
                class="b-table__row"
                :class="{ 'font-bold': cycle.value === currentCycle }"
              >
                <td class="b-table__value">
                  {{ cycle.value }}
                  <sup>
                    {{
                      ssCycle(`4|4.1|STAR|All|All|participating|${cycle.value}`)
                    }}
                  </sup>
                </td>
                <td class="b-table__value">
                  {{
                    scorePY(`4|4.1|STAR|All|All|participating|${cycle.value}`)
                  }}
                </td>
                <td class="b-table__value">
                  {{ scorePY(`4|4.1|STAR|All|All|at_grade|${cycle.value}`) }}
                  <sup>
                    {{
                      ssScorePY(`4|4.1|STAR|All|All|at_grade|${cycle.value}`)
                    }}
                  </sup>
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(`4|4.1|STAR|All|All|participating|${cycle.value}`)
                  }}
                  <sup>
                    {{
                      ssScoreCY(
                        `4|4.1|STAR|All|All|participating|${cycle.value}`
                      )
                    }}
                  </sup>
                </td>
                <td
                  class="b-table__value"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scoreCY(
                        `4|4.1|STAR|All|All|at_grade|${cycle.value}`,
                        'number'
                      ),
                      target(
                        `4|4.1|STAR|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) / 2,
                      target(
                        `4|4.1|STAR|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scoreCY(
                        `4|4.1|STAR|All|All|at_grade|${cycle.value}`,
                        'number'
                      ),
                      target(
                        `4|4.1|STAR|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) / 2,
                      target(
                        `4|4.1|STAR|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) * 1.5,
                      '#000000'
                    ),
                  }"
                >
                  {{
                    isCycleCurrentOrEarlier(cycle.value)
                      ? scoreCY(`4|4.1|STAR|All|All|at_grade|${cycle.value}`)
                      : 'Forthcoming'
                  }}
                </td>
                <td class="b-table__value">
                  {{ target(`4|4.1|STAR|All|All|at_grade|${cycle.value}`) }}
                </td>
                <td
                  class="b-table__value font-bold"
                  :class="
                    distanceTargetCY(
                      `4|4.1|STAR|All|All|at_grade|${cycle.value}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track'
                  "
                >
                  {{
                    distanceTargetCY(
                      `4|4.1|STAR|All|All|at_grade|${cycle.value}`
                    )
                  }}
                </td>
                <td
                  class="b-table__value font-bold"
                  :class="
                    distanceNextTargetCY(
                      `4|4.1|STAR|All|All|at_grade|${cycle.value}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track'
                  "
                >
                  {{
                    distanceNextTargetCY(
                      `4|4.1|STAR|All|All|at_grade|${cycle.value}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    finalTarget(`4|4.1|STAR|All|All|at_grade|${cycle.value}`)
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="b-table__title">
            Leading Indicator: Winter Performance, Grades 9-11, Star Math &
            Reading
          </div>
          <table v-if="loaded" class="table-fixed">
            <thead>
              <tr class="b-table__header-row">
                <th class="b-table__header-row-value w-24">Student Group</th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p }}
                  <sup>
                    {{
                      ssSchoolYearPY(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                  <br />
                  % Participating
                  <sup>
                    {{
                      ssMetricGroup(
                        `4|4.1|STAR|All|All|participating|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p }}
                  <sup>
                    {{
                      ssSchoolYearPY(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                  <br />
                  % At/Above Grade Level
                  <sup>
                    {{
                      ssMetricGroup(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }}
                  <sup>
                    {{
                      ssSchoolYearCY(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                  <br />
                  % Participating
                  <sup>
                    {{
                      ssMetricGroup(
                        `4|4.1|STAR|All|All|participating|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }}
                  <sup>
                    {{
                      ssSchoolYearCY(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                  <br />
                  % At/Above Grade Level
                  <sup>
                    {{
                      ssMetricGroup(
                        `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }} <br />
                  Annual Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_c }} Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_n }} Target
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_f }} <br />
                  Final Target
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(group, gIndex) in groups"
                :key="gIndex"
                class="b-table__row"
              >
                <td
                  class="w-24"
                  :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                >
                  {{ group.value }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY(
                      `4|4.2|STAR|All|${group.value}|participating|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY(
                      `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scoreCY(
                      `4|4.2|STAR|All|${group.value}|participating|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scoreCY(
                        `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scoreCY(
                        `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                  }"
                >
                  {{
                    scoreCY(
                      `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    target(
                      `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceTargetCY(
                      `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceTargetCY(
                      `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceNextTargetCY(
                      `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceNextTargetCY(
                      `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    finalTarget(
                      `4|4.2|STAR|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="b-table__footnotes">
            <div v-for="(text, tIndex) in footnotesSection1" :key="tIndex">
              {{ text }}
            </div>
          </div>
        </div>
      </div>
      <div ref="section2" :name="sections[1].label" class="page">
        <div v-if="print" class="b-banner">
          School District of Philadelphia - Board of Education | College &
          Career Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
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
          <div class="b-table w-full mt-2">
            <div class="b-table__title">
              {{ displayedTargetGroupSourceCycle }}
              {{ targetGroup.label }} Group ({{
                targetGroupCount[targetGroup.value]
              }}
              Schools): % At/Above Grade Level <br />
              Grades 9-11, Star Math & Reading
              <sup>
                {{
                  ssTargetGroup(
                    `4|4.1|STAR|${targetGroup.value}|All|at_grade|${currentCycle}`
                  )
                }}
              </sup>
            </div>
            <table v-if="loaded" class="table-fixed">
              <thead>
                <tr class="b-table__header-row">
                  <th class="b-table__header-row-value w-24">&nbsp;</th>
                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_p }}
                    <sup>
                      {{
                        ssSchoolYearPY(
                          `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                        )
                      }}
                    </sup>
                    <br />
                    % Participating
                    <sup>
                      {{
                        ssMetric(
                          `4|4.1|STAR|off_track|All|participating|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_p }}
                    <sup>
                      {{
                        ssSchoolYearPY(
                          `4|4.1|STAR|All|All|at_grade|${currentCycle}`
                        )
                      }}
                    </sup>
                    <br />
                    % At/Above Grade Level
                    <sup>
                      {{
                        ssTargetGroup(
                          `4|4.1|STAR|off_track|All|at_grade|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_c }} <br />
                    % Participating
                    <sup>
                      {{
                        ssMetric(
                          `4|4.1|STAR|off_track|All|participating|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_c }} <br />
                    % At/Above Grade Level
                    <sup>
                      {{
                        ssSchoolYearCY(
                          `4|4.1|STAR|off_track|All|at_grade|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    Distance to {{ $store.getters.sy_c }} Target
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(cycle, cIndex) in cycles"
                  :key="cIndex"
                  class="b-table__row"
                  :class="{ 'font-bold': cycle.value === currentCycle }"
                >
                  <td class="b-table__value">
                    {{ cycle.value }}
                    <sup>
                      {{
                        ssCycle(
                          `4|4.1|STAR|All|All|participating|${cycle.value}`
                        )
                      }}
                    </sup>
                  </td>
                  <td class="b-table__value">
                    {{
                      scorePY(
                        `4|4.1|STAR|${targetGroup.value}|All|participating|${cycle.value}`
                      )
                    }}
                    <sup>
                      {{
                        ssMetricGroup(
                          `4|4.1|STAR|${targetGroup.value}|All|participating|${cycle.value}`
                        )
                      }}
                    </sup>
                  </td>
                  <td class="b-table__value">
                    {{
                      scorePY(
                        `4|4.1|STAR|${targetGroup.value}|All|at_grade|${cycle.value}`
                      )
                    }}
                    <sup>
                      {{
                        ssScorePY(`4|4.1|STAR|All|All|at_grade|${cycle.value}`)
                      }}
                    </sup>
                  </td>
                  <td class="b-table__value">
                    {{
                      scoreCY(
                        `4|4.1|STAR|${targetGroup.value}|All|participating|${cycle.value}`
                      )
                    }}
                    <sup>
                      {{
                        ssMetricGroup(
                          `4|4.1|STAR|${targetGroup.value}|All|participating|${cycle.value}`
                        )
                      }}
                    </sup>
                  </td>
                  <td
                    class="b-table__value"
                    :style="{
                      'background-color': colorScaleRedBlue(
                        scoreCY(
                          `4|4.1|STAR|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ),
                        target(
                          `4|4.1|STAR|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) / 2,
                        target(
                          `4|4.1|STAR|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) * 1.5
                      ),
                      color: colorScaleTextRedBlue(
                        scoreCY(
                          `4|4.1|STAR|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ),
                        target(
                          `4|4.1|STAR|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) / 2,
                        target(
                          `4|4.1|STAR|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) * 1.5,
                        '#000000'
                      ),
                    }"
                  >
                    {{
                      isCycleCurrentOrEarlier(cycle.value)
                        ? scoreCY(
                            `4|4.1|STAR|${targetGroup.value}|All|at_grade|${cycle.value}`
                          )
                        : 'Forthcoming'
                    }}
                  </td>
                  <td
                    class="b-table__value font-bold"
                    :class="
                      distanceNextTargetCY(
                        `4|4.1|STAR|${targetGroup.value}|All|at_grade|${cycle.value}`
                      ) <= 0
                        ? 'text-off_track'
                        : 'text-on_track'
                    "
                  >
                    {{
                      distanceTargetCY(
                        `4|4.1|STAR|${targetGroup.value}|All|at_grade|${cycle.value}`
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="b-table__subtitle">
              {{ currentCycle }} {{ year }} {{ targetGroup.label }} Group:
              Participation & Performance <br />
              Grades 9-11, Star Math & Reading
            </div>
            <table v-if="loaded" class="table-fixed">
              <thead>
                <tr class="b-table__header-row">
                  <th class="b-table__header-row-value w-64">&nbsp;</th>
                  <th class="b-table__header-row-value">
                    # Students Eligible
                    <sup>
                      {{
                        ssMetric(
                          `4|4.1|STAR|${targetGroup.value}|All|student_count|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    % Students Participating
                    <sup>
                      {{
                        ssMetric(
                          `4|4.1|STAR|${targetGroup.value}|All|participating|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    % Intensive Intervention (lowest level)
                  </th>
                  <th class="b-table__header-row-value">
                    % Urgent Intervention (lowest level)
                  </th>
                  <th class="b-table__header-row-value">
                    % On Watch (lowest level)
                  </th>
                  <th class="b-table__header-row-value">
                    % At/Above Grade Level (lowest level)
                    <sup>
                      {{
                        ssMetric(
                          `4|4.2|STAR|${targetGroup.value}|Asian|at_grade|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(group, gIndex) in groupsAllWithOpposite"
                  :key="gIndex"
                  class="b-table__row"
                  :class="{ 'font-bold': group.value === 'All' }"
                >
                  <td
                    class="w-64"
                    :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                  >
                    {{ group.value }}
                    <sup>
                      {{
                        ssGroup(
                          `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|participating|${currentCycle}`
                        )
                      }}
                    </sup>
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|student_count|${currentCycle}`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|participating|${currentCycle}`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|intensive_intervention|${currentCycle}`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|urgent_intervention|${currentCycle}`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|on_watch|${currentCycle}`
                      )
                    }}
                  </td>
                  <td
                    :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                    :style="{
                      'background-color': colorScaleRedBlue(
                        scoreCY(
                          `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ),
                        target(
                          `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) / 2,
                        target(
                          `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) * 1.5
                      ),
                      color: colorScaleTextRedBlue(
                        scoreCY(
                          `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ),
                        target(
                          `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) / 2,
                        target(
                          `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) * 1.5
                      ),
                    }"
                  >
                    {{
                      scoreCY(
                        `4|${group.indicator}|STAR|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="b-table__footnotes">
          <div v-for="(text, tIndex) in footnotesSection2" :key="tIndex">
            {{ text }}
          </div>
        </div>
      </div>
      <div ref="section3" :name="sections[2].label" class="page">
        <div v-if="print" class="b-banner">
          School District of Philadelphia - Board of Education | College &
          Career Progress Monitoring - Goal {{ goal }} | {{ cycle.value }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="b-section-title">{{ sections[2].title }}</div>
        <div class="b-table w-full mt-2">
          <div class="b-table__title">
            Leading Indicator: District-Wide Performance <br />Grades 9-11, Star
            Math & Reading
          </div>
          <table v-if="loaded" class="table-fixed">
            <thead>
              <tr class="b-table__header-row">
                <th class="b-table__header-row-value w-24">&nbsp;</th>
                <th class="b-table__header-row-value">
                  # Students Eligible
                  <sup>
                    {{
                      ssMetric(
                        `4|4.1|STAR|All|All|student_count|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  % Students Participating
                  <sup>
                    {{
                      ssMetric(
                        `4|4.1|STAR|All|All|participating|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  % Intensive Intervention (lowest level)
                </th>
                <th class="b-table__header-row-value">
                  % Urgent Intervention (lowest level)
                </th>
                <th class="b-table__header-row-value">
                  % On Watch (lowest level)
                </th>
                <th class="b-table__header-row-value">
                  % At/Above Grade Level (lowest level)
                  <sup>
                    {{
                      ssMetric(`4|4.1|STAR|All|All|at_grade|${currentCycle}`)
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }} Annual Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_c }} Target
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
                <td class="b-table__value">
                  {{ group.label }}
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `4|${group.indicator}|STAR|All|${group.value}|student_count|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `4|${group.indicator}|STAR|All|${group.value}|participating|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `4|${group.indicator}|STAR|All|${group.value}|intensive_intervention|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `4|${group.indicator}|STAR|All|${group.value}|urgent_intervention|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `4|${group.indicator}|STAR|All|${group.value}|on_watch|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="b-table__value"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scoreCY(
                        `4|${group.indicator}|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `4|${group.indicator}|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `4|${group.indicator}|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scoreCY(
                        `4|${group.indicator}|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `4|${group.indicator}|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `4|${group.indicator}|STAR|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                  }"
                >
                  {{
                    scoreCY(
                      `4|${group.indicator}|STAR|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    target(
                      `4|${group.indicator}|STAR|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="b-table__value font-bold"
                  :class="
                    distanceTargetCY(
                      `4|${group.indicator}|STAR|All|${group.value}|at_grade|${currentCycle}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track'
                  "
                >
                  {{
                    distanceTargetCY(
                      `4|${group.indicator}|STAR|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="b-table__footnotes">
            <div v-for="(text, tIndex) in footnotesSection3" :key="tIndex">
              {{ text }}
            </div>
          </div>
        </div>
      </div>
      <div ref="section4" :name="sections[3].label" class="page">
        <div v-if="print" class="b-banner">
          School District of Philadelphia - Board of Education | College &
          Career Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>

        <div class="b-section-title">{{ sections[3].title }}</div>
        <div class="flex justify-between mb-2">
          <div class="b-infobox mb-2">
            <div class="b-infobox__title">Leading Indicator 4.2:</div>
            <div class="b-infobox__text">
              The percentage of students who are proficient on all three state
              high school assessments (Algebra, Literature, and Biology) by the
              end of their 10th grade year.
            </div>
          </div>
          <div class="b-infobox mb-2">
            <div class="b-infobox__title">
              Leading Indicator 4.3 - Closing the Gap:
            </div>
            <div class="b-infobox__text">
              The percentage of students, by subgroup, who are proficient on all
              three state high school assessments (Algebra, Literature, and
              Biology) by the end of their 10th grade year.
            </div>
          </div>
        </div>
        <div class="b-infobox w-full flex">
          <div class="mr-4 flex-grow flex flex-col justify-center items-start">
            <div class="w-full b-infobox__subtitle">
              Leading Indicator Overall Progress
            </div>
            <div
              class="w-full b-infobox__subtitle text-black font-bold"
              :class="[
                'bg-' +
                  tierDistanceTargetPY2(
                    `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`
                  ),
                'text-contrast-' +
                  tierDistanceTargetPY2(
                    `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`
                  ),
              ]"
            >
              {{
                label(
                  tierDistanceTargetPY2(
                    `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`
                  )
                )
              }}
            </div>
          </div>
          <div class="w-1/2">
            <target-chart
              :series="[
                {
                  key: 'spring',
                  color: '#0088aa',
                  label: 'Spring',
                  values: [
                    NaN,
                    scorePY4(
                      `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`,
                      'number'
                    ),
                    scorePY3(
                      `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`,
                      'number'
                    ),
                    scorePY2(
                      `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`,
                      'number'
                    ),
                    scorePY(
                      `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`,
                      'number'
                    ),
                    scoreCY(
                      `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`,
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
                    0.239,
                    0.273,
                    0.316,
                    0.364,
                    0.418,
                    0.476,
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
            Leading Indicator: District-Wide % At/Above Grade Level <br />
            Grade 10, Keystones - Algebra, Literature, & Biology
            <sup>
              {{
                ssMetricGroup(
                  `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`
                )
              }}
            </sup>
          </div>
          <table v-if="loaded" class="table-fixed">
            <thead>
              <tr class="b-table__header-row">
                <th class="b-table__header-row-value w-24">Student Group</th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p4 }}
                  <sup>
                    {{
                      ssSchoolYearPY4(
                        `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p3 }}
                  <sup>
                    {{
                      ssSchoolYearPY3(
                        `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p2 }}
                  <sup>
                    {{
                      ssSchoolYearPY2(
                        `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p }}
                  <sup>
                    {{
                      ssSchoolYearPY(
                        `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }} Annual Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_c }} Target
                  <sup>
                    {{
                      ssDistance(
                        `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_n }} Target
                  <sup>
                    {{
                      ssDistance(
                        `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_f }} Final Target
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(group, gIndex) in groupsAll2"
                :key="gIndex"
                class="b-table__row"
              >
                <td
                  class="w-24"
                  :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                >
                  {{ group.value }}
                  <sup>
                    {{
                      ssGroup(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`
                      )
                    }}
                  </sup>
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY4(
                      `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY3(
                      `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`
                    )
                  }}
                </td>
                <td
                  :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scorePY2(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`,
                        'number'
                      ),
                      target(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`,
                        'number'
                      ) / 2,
                      target(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scorePY2(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`,
                        'number'
                      ),
                      target(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`,
                        'number'
                      ) / 2,
                      target(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`,
                        'number'
                      ) * 1.5,
                      'black'
                    ),
                  }"
                >
                  {{
                    scorePY2(
                      `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY(
                      `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    target(
                      `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceTargetPY2(
                      `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceTargetPY2(
                      `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceNextTargetPY2(
                      `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceNextTargetPY2(
                      `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    finalTarget(
                      `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="b-table__footnotes">
            <div v-for="(text, tIndex) in footnotesSection4" :key="tIndex">
              {{ text }}
            </div>
          </div>
        </div>
      </div>
      <div ref="section5" :name="sections[4].label" class="page">
        <div v-if="print" class="b-banner">
          School District of Philadelphia - Board of Education | College &
          Career Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="b-section-title">
          <span style="white-space: pre">{{ sections[4].title }}</span>
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
              Schools): % At/Above Grade Level <br />
              Grade 10, Keystones - Algebra, Literature, & Biology
              <sup>
                {{
                  ssTargetGroup(
                    `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|Spring`
                  )
                }}
              </sup>
            </div>
            <table v-if="loaded" class="table-fixed">
              <thead>
                <tr class="b-table__header-row">
                  <th class="b-table__header-row-value w-24">&nbsp;</th>
                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_p3 }}
                    <sup>
                      {{
                        ssSchoolYearPY3(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|on_track|All|proficient_advanced|Spring`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_p2 }}
                    <sup>
                      {{
                        ssSchoolYearPY2(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|on_track|All|proficient_advanced|Spring`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_p }}
                    <sup>
                      {{
                        ssSchoolYearPY(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|on_track|All|proficient_advanced|Spring`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    Distance to {{ $store.getters.sy_c }} Target
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(cycle, cIndex) in cycles2"
                  :key="cIndex"
                  class="b-table__row"
                  :class="{ 'font-bold': cycle.value === currentCycle }"
                >
                  <td class="b-table__value">
                    {{ cycle.value }}
                  </td>
                  <td class="b-table__value">
                    {{
                      scorePY3(
                        `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`
                      )
                    }}
                    <sup>
                      {{
                        ssScoreCY(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`
                        )
                      }}
                    </sup>
                  </td>
                  <td
                    class="b-table__value"
                    :style="{
                      'background-color': colorScaleRedBlue(
                        scorePY2(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`,
                          'number'
                        ),
                        target(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`,
                          'number'
                        ) / 2,
                        target(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`,
                          'number'
                        ) * 1.5
                      ),
                      color: colorScaleTextRedBlue(
                        scorePY2(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`,
                          'number'
                        ),
                        target(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`,
                          'number'
                        ) / 2,
                        target(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`,
                          'number'
                        ) * 1.5,
                        '#000000'
                      ),
                    }"
                  >
                    {{
                      scorePY2(
                        `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`
                      )
                    }}
                  </td>
                  <td class="b-table__value">
                    {{
                      scorePY(
                        `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`
                      )
                    }}
                    <sup>
                      {{
                        ssScorePY(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`
                        )
                      }}
                    </sup>
                  </td>
                  <td
                    class="b-table__value font-bold"
                    :class="
                      distanceTargetPY2(
                        `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`
                      ) <= 0
                        ? 'text-off_track'
                        : 'text-on_track'
                    "
                  >
                    {{
                      distanceTargetPY2(
                        `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`
                      )
                    }}
                    <sup>
                      {{
                        ssDistance(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|${cycle.value}`
                        )
                      }}
                    </sup>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="b-table__subtitle">
              {{ currentCycle }} {{ year }} {{ targetGroup.label }} Group:
              Participation & Performance <br />
              Grade 10, Keystones - Algebra, Literature, & Biology
            </div>
            <table v-if="loaded" class="table-fixed">
              <thead>
                <tr class="b-table__header-row">
                  <th class="b-table__header-row-value w-64">&nbsp;</th>
                  <th class="b-table__header-row-value">
                    # Students
                    <sup>
                      {{
                        ssMetric(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|White|student_count|Spring`
                        )
                      }}
                    </sup>
                  </th>
                  <td
                    class="b-table__header-row-value"
                    style="font-weight: bold"
                  >
                    % Students Missing 1+ Keystone
                    <br />
                    <br />
                  </td>
                  <th class="b-table__header-row-value">
                    Lowest Score Across All 3 Keystones: % Below Basic
                    <sup>
                      {{
                        ssMetric(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|White|below_basic|Spring`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    Lowest Score Across All 3 Keystones: % Basic
                    <sup>
                      {{
                        ssMetric(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|basic|Spring`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    Lowest Score Across All 3 Keystones: % Prof/Adv
                    <sup>
                      {{
                        ssMetric(
                          `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|student_count|Spring`
                        )
                      }}
                    </sup>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(group, gIndex) in groupsAllWithOpposite2"
                  :key="gIndex"
                  class="b-table__row"
                  :class="{ 'font-bold': group.value === 'All' }"
                >
                  <td
                    class="w-64"
                    :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                  >
                    {{ group.value }}
                    <sup>
                      {{
                        ssGroup(
                          `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Spring`
                        )
                      }}
                    </sup>
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|student_count|Spring`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|students_missing_1_plus_keystone|Spring`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|below_basic|Spring`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|basic|Spring`
                      )
                    }}
                  </td>
                  <td
                    :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                    :style="{
                      'background-color': colorScaleRedBlue(
                        scorePY2(
                          `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Spring`,
                          'number'
                        ),
                        target(
                          `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Spring`,
                          'number'
                        ) / 2,
                        target(
                          `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Spring`,
                          'number'
                        ) * 1.5
                      ),
                      color: colorScaleTextRedBlue(
                        scorePY2(
                          `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Spring`,
                          'number'
                        ),
                        target(
                          `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Spring`,
                          'number'
                        ) / 2,
                        target(
                          `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Spring`,
                          'number'
                        ) * 1.5,
                        'black'
                      ),
                    }"
                  >
                    {{
                      scorePY2(
                        `4|${group.indicator}|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Spring`
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="b-table__footnotes">
          <div v-for="(text, tIndex) in footnotesSection5" :key="tIndex">
            {{ text }}
          </div>
        </div>
      </div>
      <div ref="section6" :name="sections[5].label" class="page">
        <div class="b-section-title">{{ sections[5].title }}</div>
        <div class="b-table w-full mt-2">
          <table class="table-fixed b-summarytable">
            <thead>
              <tr class="b-summarytable__header-row">
                <th>What are we going to do?</th>
                <th>Why are we doing this?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="flex">
                    <div
                      class="b-summarytable__row-label b-summarytable__row-label--performance"
                    >
                      <div>Performance</div>
                    </div>
                    <div class="b-summarytable__value">
                      <p class="h-full">
                        We will develop and implement a high-quality, culturally
                        and linguistically relevant, standards-aligned
                        curriculum in core subjects, beginning with Math and
                        ELA, and develop teachers’ capacity and content
                        knowledge to implement high quality Tier 1 instruction.
                        <br /><br />
                      </p>
                    </div>
                  </div>
                  <div class="flex">
                    <div
                      class="b-summarytable__row-label b-summarytable__row-label--climate"
                    >
                      <div>Climate</div>
                    </div>
                    <div class="b-summarytable__value">
                      <p class="b-summarytable__value--sep">
                        Cultivate a workforce with high expectations for all
                        students and the belief that all students can access
                        Tier 1 instruction by defining the ways racist practices
                        manifest in schools and developing strategies to support
                        an anti-racist workforce.
                      </p>
                      <p>
                        Building on recommendations from Goals 1, 2, and 3 to
                        implement evidence-based Tier 1 climate programming as
                        part of a comprehensive MTSS framework, we will add a
                        specific focus on ensuring leadership and staff buy-in
                        about the effectiveness of well-implemented Tier 1
                        approaches.
                      </p>
                    </div>
                  </div>
                  <div class="flex">
                    <div
                      class="b-summarytable__row-label b-summarytable__row-label--staffing"
                    >
                      <div>Staffing</div>
                    </div>
                    <div class="b-summarytable__value">
                      <p class="b-summarytable__value--sep">
                        We will expand the Goal 2 staff retention analysis to
                        include principals to better understand how autonomy and
                        principal expectations of both staff and students
                        contribute to staff movement.
                      </p>
                      <p>
                        We will update the leadership framework to include a
                        focus on talent management, and explore the redesign of
                        teacher evaluation to identify differentiated
                        instructional quality and provide quality feedback to
                        teachers.
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="b-summarytable__value">
                    <p class="b-summarytable__value--highlight">
                      These actions are interrelated, and together, they will
                      expand our capacity to deliver high-quality reading
                      instruction to students who are prepared to learn.
                    </p>
                    <ul>
                      <li>
                        Effective instruction in core content areas requires a
                        coherent system of curriculum and instruction, teacher
                        knowledge and practice, and student assessment; and SDP
                        is committed to developing and sustaining such a system
                        that enacts our vision of equitable education.
                      </li>
                      <li>
                        Effective Tier 1 programs are critical to student
                        success and are most effective when all stakeholders
                        believe that, when supported, all students can rise to
                        high expectations.
                      </li>
                      <li>
                        Building principals’ capacity as talent managers will
                        help to build more effective and welcoming communities
                        in every school, by promoting a more stable community of
                        teachers.
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
import TargetChart from '~/components/TargetChart'
import MetricsMixin from '~/mixins/MetricsMixin.vue'
import ColorKey from '~/components/ColorKey'
import NavigationLinks from '~/components/NavigationLinks'

export default {
  layout: 'goal',
  name: 'BoardGoal4Winter',
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
      goal: 4,
      indicators: [4.1, 4.2, 4.3, 4.4],
      values: null,
      footnotes: null,
      targetGroupSourceCycle: '',
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
      return this.availableSourceCycles && this.targetGroupSourceCycle
        ? this.availableSourceCycles[this.targetGroupSourceCycle]
        : ''
    },

    /** Aliases for store */
    year() {
      return this.$store.state.year_c
    },
    currentCycle() {
      return 'Winter'
    },

    sections() {
      return [
        {
          title:
            'Leading Indicator 4.1 Performance: Overall and by Student Group',
          label: '4.1: Overall and Student Groups',
        },
        {
          title: `Leading Indicator 4.1 Performance: ${this.displayedTargetGroupSourceCycle} Target \nOff-Track, Near-Track, and On-Track School Groups`,
          label: '4.1: Off-Track, Near-Track, On-Track Schools',
        },
        {
          title: 'Leading Indicator 4.1 Performance: Grade Level',
          label: '4.1: Grade Level',
        },
        {
          title:
            'Leading Indicator 4.2 Performance: Overall and by Student Group',
          label: '4.2: Overall and Student Groups',
        },
        {
          title: `Leading Indicator 4.2 Performance: ${this.displayedTargetGroupSourceCycle} Target \nOff-Track, Near-Track, and On-Track School Groups`,
          label: '4.2: Off-Track, Near-Track, On-Track Schools',
        },
        {
          title: 'Summary of Progress Monitoring Review',
          label: 'Summary',
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
        { value: 'All', label: 'All Grades', indicator: 4.1 },
        { value: 'Grade 9', label: 'Grade 9', indicator: 4.1 },
        { value: 'Grade 10', label: 'Grade 10', indicator: 4.1 },
        { value: 'Grade 11', label: 'Grade 11', indicator: 4.1 },
      ]
    },
    cycles() {
      return [
        { value: 'Fall', label: 'Fall' },
        { value: 'Winter', label: 'Winter' },
        { value: 'Spring', label: 'Spring' },
      ]
    },
    cycles2() {
      return [{ value: 'Spring', label: 'Spring' }]
    },
    ethnicGroups() {
      return [
        {
          value: 'Black / African American',
          label: 'Black / African American',
          indicator: 4.2,
        },
        {
          value: 'Hispanic / Latino',
          label: 'Hispanic / Latino',
          indicator: 4.2,
        },
        { value: 'White', label: 'White', indicator: 4.2 },
        {
          value: 'American Indian / Alaskan Native',
          label: 'American Indian / Alaskan Native',
          indicator: 4.2,
        },
        { value: 'Asian', label: 'Asian', indicator: 4.2 },
        {
          value: 'Native Hawaiian / Pacific Islander',
          label: 'Native Hawaiian / Pacific Islander',
          indicator: 4.2,
        },
        {
          value: 'Multi Racial / Other',
          label: 'Multi Racial / Other',
          indicator: 4.2,
        },
      ]
    },
    otherGroups() {
      return [
        {
          value: 'English Learners',
          label: 'English Learners',
          indicator: 4.2,
        },
        {
          value: 'Special Education',
          label: 'Special Education',
          indicator: 4.2,
        },
        {
          value: 'Economically Disadvantaged',
          label: 'Economically Disadvantaged',
          indicator: 4.2,
        },
      ]
    },
    otherGroupsWithOpposite() {
      return [
        {
          value: 'English Learners',
          label: 'English Learners',
          indicator: 4.2,
        },
        {
          value: 'Non-English Learners',
          label: 'Non-English Learners',
          indicator: 4.2,
        },
        { isSep: true },
        {
          value: 'Special Education',
          label: 'Special Education',
          indicator: 4.2,
        },
        {
          value: 'Non-Special Education',
          label: 'Non-Special Education',
          indicator: 4.2,
        },
        { isSep: true },
        {
          value: 'Economically Disadvantaged',
          label: 'Economically Disadvantaged',
          indicator: 4.2,
        },
        {
          value: 'Non-Economically Disadvantaged',
          label: 'Non-Economically Disadvantaged',
          indicator: 4.2,
        },
      ]
    },
    genders() {
      return [
        { value: 'Female', label: 'Female', indicator: 4.2 },
        { value: 'Male', label: 'Male', indicator: 4.2 },
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
        { value: 'All', label: 'All', indicator: 4.1 },
        { isSep: true },
      ].concat(this.groups)
    },
    groupsAll2() {
      return this.groupsAll.map((val) => ({
        ...val,
        indicator:
          val.indicator === 4.1 ? 4.3 : val.indicator === 4.2 ? 4.4 : val,
      }))
    },
    groupsAllWithOpposite() {
      return [
        { value: 'All', label: 'All', indicator: 4.1 },
        { isSep: true },
      ].concat(this.groupsWithOpposite)
    },
    groupsAllWithOpposite2() {
      return this.groupsAllWithOpposite.map((val) => ({
        ...val,
        indicator:
          val.indicator === 4.1 ? 4.3 : val.indicator === 4.2 ? 4.4 : val,
      }))
    },

    footnotesSection1() {
      let values = [
        this.ssMetricGroup(
          `4|4.1|STAR|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearPY(
          `4|4.1|STAR|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssMetricGroup(
          `4|4.1|STAR|All|All|participating|${this.currentCycle}`,
          'text'
        ),
        this.ssCycle(`4|4.1|STAR|All|All|participating|Winter`, 'text'),
        this.ssSchoolYearCY(
          `4|4.1|STAR|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssScorePY(`4|4.1|STAR|All|All|at_grade|Spring`, 'text'),
      ]
      values = values.filter((text) => text?.length > 0)
      // remove duplicates
      values = values.filter((text, index) => values.indexOf(text) === index)
      return values
    },

    footnotesSection2() {
      let values = []
      this.targetGroups.forEach((targetGroup) => {
        values = values.concat([
          this.ssTargetGroup(
            `4|4.1|STAR|${targetGroup.value}|All|at_grade|${this.currentCycle}`,
            'text'
          ),
        ])
      })

      values = values.concat([
        this.ssSchoolYearPY(
          `4|4.1|STAR|on_track|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearCY(
          `4|4.1|STAR|on_track|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `4|4.1|STAR|on_track|All|participating|${this.currentCycle}`,
          'text'
        ),
        this.ssCycle(`4|4.1|STAR|All|All|participating|Winter`, 'text'),
        this.ssScorePY(`4|4.1|STAR|All|All|at_grade|Spring`, 'text'),
        this.ssMetric(
          `4|4.1|STAR|on_track|All|student_count|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `4|4.2|STAR|on_track|Asian|at_grade|${this.currentCycle}`,
          'text'
        ),
      ])
      this.cycles.forEach((cycle) => {
        values = values.concat([
          this.ssCycle(`4|4.1|STAR|All|All|eligible|${cycle}`, 'text'),
        ])
        values = values.concat([
          this.ssGroup(`4|4.1|STAR|off_track|All|eligible|${cycle}`, 'text'),
        ])
      })
      this.groups.forEach((group) => {
        values = values.concat([
          this.ssGroup(
            `4|4.2|STAR|on_track|${group.value}|participating|${this.currentCycle}`,
            'text'
          ),
          this.ssGroup(
            `4|4.2|STAR|on_track|${group.value}|at_grade|${this.currentCycle}`,
            'text'
          ),
        ])
      })
      values = values.filter((text) => text?.length > 0)
      // remove duplicates
      values = values.filter((text, index) => values.indexOf(text) === index)
      return values
    },

    footnotesSection3() {
      let values = [
        this.ssMetric(
          `4|4.1|STAR|All|All|student_count|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `4|4.1|STAR|All|All|participating|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `4|4.1|STAR|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
      ]
      this.gradeSpans.forEach((group) => {
        values = values.concat([
          this.ssScoreCY(
            `4|4.3|Keystone (Algebra, Literature, Biology)|All|${group.value}|on_watch|${this.currentCycle}`,
            'text'
          ),
        ])
      })
      values = values.filter((text) => text?.length > 0)
      // remove duplicates
      values = values.filter((text, index) => values.indexOf(text) === index)
      return values
    },
    footnotesSection4() {
      let values = [
        this.ssMetricGroup(
          `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`,
          'text'
        ),
        this.ssSchoolYearPY(
          `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`,
          'text'
        ),
        this.ssDistance(
          `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`,
          'text'
        ),
      ]
      this.groups.forEach((group) => {
        values = values.concat([
          this.ssGroup(
            `4|4.4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Spring`,
            'text'
          ),
        ])
      })
      values = values.filter((text) => text?.length > 0)
      // remove duplicates
      values = values.filter((text, index) => values.indexOf(text) === index)
      return values
    },

    footnotesSection5() {
      let values = []
      this.targetGroups.forEach((targetGroup) => {
        values = values.concat([
          this.ssTargetGroup(
            `4|4.3|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|Spring`,
            'text'
          ),
        ])
      })

      values = values.concat([
        this.ssSchoolYearPY(
          `4|4.3|Keystone (Algebra, Literature, Biology)|on_track|All|proficient_advanced|Spring`,
          'text'
        ),
        this.ssSchoolYearCY(
          `4|4.3|Keystone (Algebra, Literature, Biology)|on_track|All|proficient_advanced|Spring`,
          'text'
        ),
        this.ssMetric(
          `4|4.3|Keystone (Algebra, Literature, Biology)|on_track|All|participating|Spring`,
          'text'
        ),
        this.ssScorePY(
          `4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring`,
          'text'
        ),
        this.ssDistance(
          `4|4.3|Keystone (Algebra, Literature, Biology)|on_track|All|proficient_advanced|Spring`,
          'text'
        ),
        this.ssMetric(
          `4|4.3|Keystone (Algebra, Literature, Biology)|on_track|All|eligible|Spring`,
          'text'
        ),
        this.ssMetric(
          `4|4.4|Keystone (Algebra, Literature, Biology)|on_track|Asian|proficient_advanced|Spring`,
          'text'
        ),
        this.ssGroup(
          `4|4.3|Keystone (Algebra, Literature, Biology)|off_track|All|eligible|Spring`,
          'text'
        ),
      ])
      this.groups.forEach((group) => {
        values = values.concat([
          this.ssGroup(
            `4|4.4|Keystone (Algebra, Literature, Biology)|on_track|${group.value}|participating|Spring`,
            'text'
          ),
          this.ssGroup(
            `4|4.4|Keystone (Algebra, Literature, Biology)|on_track|${group.value}|proficient_advanced|Spring`,
            'text'
          ),
        ])
      })
      values = values.filter((text) => text?.length > 0)
      // remove duplicates
      values = values.filter((text, index) => values.indexOf(text) === index)
      return values
    },
  },
  async created() {
    // for displaying options of target groups
    const targetGroupSourceCycles = this.$store.state.targetGroupSourceCycles.goal4.filter(
      ({ cycle }) => cycle === 'Winter'
    )

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
      throw new Error('No current targetGroupSourceCycle found for goal4')
    }

    await this.fetchData()
  },

  methods: {
    isCycleCurrentOrEarlier(cycle) {
      if (this.currentCycle === 'Fall') {
        if (cycle === 'Fall') {
          return true
        } else {
          return false
        }
      } else if (this.currentCycle === 'Winter') {
        if (cycle === 'Fall' || cycle === 'Winter') {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    async handleSourceCycleSelection({ value }) {
      this.targetGroupSourceCycle = value
      const targetGroupSourceCycles = this.$store.state.targetGroupSourceCycles
        .goal4
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
        throw new Error(`${value} targetGroupSourceCycle not found for goal4`)
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
