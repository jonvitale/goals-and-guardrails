<template>
  <!-- todo bold any rows that are current cycle 
    dark on near_track, white on off-track, on-track
  -->
  <div class="container mx-auto flex flex-wrap lg:flex-no-wrap justify-around">
    <div v-if="!print" class="w-full lg:w-1/5 lg:h-screen lg:sticky lg:top-0">
      <div class="bg-blue-100 px-2">
        <scroll-spy-nav
          class="bg-blue-100 px-2"
          title="Sections"
          :refs="['section1', 'section2', 'section3', 'section4']"
          :target="thisComponent"
          orientation="col"
          indent-links="1rem"
        />
        <navigation-links
          title="Goal 2 Links"
          indent-links="1rem"
          :links="[
            { link: `/goal2`, label: 'Annual' },
            { link: `/goal2/winter`, label: 'Winter' },
            { link: `/goal2/spring`, label: 'Spring' },
          ]"
        />
      </div>
      <color-key dense class="mt-3 hidden md:block" />
    </div>
    <div class="report" :class="print ? 'report--print' : ''">
      <div v-if="print" ref="cover" name="Cover" class="page">
        <div class="b-banner">
          School District of Philadelphia - Board of Education | Reading
          Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="flex justify-between mt-2">
          <div>
            <div class="b-infobox">
              <div class="b-infobox__title">Leading Indicator 2.1:</div>
              <div class="b-infobox__text">
                The percentage of students in grades K-3 who score at or above
                grade level on the District's within-year reading assessment in
                Fall, Winter, and Spring each year.
              </div>
            </div>
            <div class="b-infobox">
              <div class="b-infobox__title">
                Leading Indicator 2.2 - Closing the Gap:
              </div>
              <div class="b-infobox__text">
                The percentage of students, by subgroup, in grades K-3 who score
                at or above grade level on the District's within-year reading
                assessment in Fall, Winter, and Spring each year.
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
          School District of Philadelphia - Board of Education | Reading
          Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>

        <div class="b-section-title">{{ sections[0].title }}</div>
        <div class="flex justify-between mb-2">
          <div class="b-infobox mb-2">
            <div class="b-infobox__title">Leading Indicator 2.1:</div>
            <div class="b-infobox__text">
              The percentage of students in grades K-3 who score at or above
              grade level on the District's within-year reading assessment in
              Fall, Winter, and Spring each year.
            </div>
          </div>
          <div class="b-infobox mb-2">
            <div class="b-infobox__title">
              Leading Indicator 2.2 - Closing the Gap:
            </div>
            <div class="b-infobox__text">
              The percentage of students, by subgroup, in grades K-3 who score
              at or above grade level on the District's within-year reading
              assessment in Fall, Winter, and Spring each year.
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
                    `2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`
                  ),
                'text-contrast-' +
                  tierDistanceTargetCY(
                    `2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`
                  ),
              ]"
            >
              {{
                label(
                  tierDistanceTargetCY(
                    `2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`
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
                    scorePY3(`2|2.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
                    scorePY2(`2|2.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
                    scorePY(`2|2.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
                    scoreCY(`2|2.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
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
                    scorePY3(`2|2.1|Aimsweb|All|All|at_grade|Winter`, 'number'),
                    scorePY2(`2|2.1|Aimsweb|All|All|at_grade|Winter`, 'number'),
                    scorePY(`2|2.1|Aimsweb|All|All|at_grade|Winter`, 'number'),
                    scoreCY(`2|2.1|Aimsweb|All|All|at_grade|Winter`, 'number'),
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
                    scorePY3(`2|2.1|Aimsweb|All|All|at_grade|Spring`, 'number'),
                    scorePY2(`2|2.1|Aimsweb|All|All|at_grade|Spring`, 'number'),
                    scorePY(`2|2.1|Aimsweb|All|All|at_grade|Spring`, 'number'),
                    scoreCY(`2|2.1|Aimsweb|All|All|at_grade|Spring`, 'number'),
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
                    0.47,
                    0.52,
                    0.59,
                    0.66,
                    0.74,
                    0.83,
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
            Grades K-3, aimswebPlus Reading
          </div>
          <table v-if="loaded" class="table-fixed">
            <thead>
              <tr class="b-table__header-row">
                <th class="b-table__header-row-value w-24">
                  Assessment Period
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p3 }}
                  <sup>
                    {{
                      ssSchoolYearPY3(
                        `2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p2 }}
                  <sup>
                    {{
                      ssSchoolYearPY2(
                        `2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p }}
                  <sup>
                    {{
                      ssSchoolYearPY(
                        `2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }}
                  <sup>
                    {{
                      ssSchoolYearCY(
                        `2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }} Annual Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_c }} Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_n }} Target
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_f }} Final Target
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
                </td>
                <td class="b-table__value">
                  {{
                    scorePY3(`2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`)
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scorePY2(`2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`)
                  }}
                </td>
                <td class="b-table__value">
                  {{ scorePY(`2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`) }}
                  <sup>
                    {{
                      ssScorePY(`2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`)
                    }}
                  </sup>
                </td>
                <td
                  class="b-table__value"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scoreCY(
                        `2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ),
                      target(
                        `2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) / 2,
                      target(
                        `2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scoreCY(
                        `2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ),
                      target(
                        `2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) / 2,
                      target(
                        `2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) * 1.5,
                      '#000000'
                    ),
                  }"
                >
                  {{
                    isCycleCurrentOrEarlier(cycle.value)
                      ? scoreCY(`2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`)
                      : 'Forthcoming'
                  }}
                </td>
                <td class="b-table__value">
                  {{ target(`2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`) }}
                </td>
                <td
                  class="b-table__value font-bold"
                  :class="
                    distanceTargetCY(
                      `2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track'
                  "
                >
                  {{
                    distanceTargetCY(
                      `2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`
                    )
                  }}
                </td>
                <td
                  class="b-table__value font-bold"
                  :class="
                    distanceNextTargetCY(
                      `2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track'
                  "
                >
                  {{
                    distanceNextTargetCY(
                      `2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    finalTarget(`2|2.1|Aimsweb|All|All|at_grade|${cycle.value}`)
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="b-table__title">
            Leading Indicator: Fall Performance, Grades K-3, aimswebPlus Reading
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
                        `2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p2 }}
                  <sup>
                    {{
                      ssSchoolYearPY2(
                        `2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p }}
                  <sup>
                    {{
                      ssSchoolYearPY(
                        `2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }}
                  <sup>
                    {{
                      ssSchoolYearCY(
                        `2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }} Annual Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_c }} Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_n }} Target
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_f }} Final Target
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
                    scorePY3(
                      `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY2(
                      `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY(
                      `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scoreCY(
                        `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scoreCY(
                        `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                  }"
                >
                  {{
                    scoreCY(
                      `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    target(
                      `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceTargetCY(
                      `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceTargetCY(
                      `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceNextTargetCY(
                      `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceNextTargetCY(
                      `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    finalTarget(
                      `2|2.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
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
              {{ currentCycle }} {{ year }} {{ targetGroup.label }} Group ({{
                targetGroupCount[targetGroup.value]
              }}
              Schools): % At/Above Grade Level <br />
              Grades K-3, aimswebPlus Reading
            </div>
            <table v-if="loaded" class="table-fixed">
              <thead>
                <tr class="b-table__header-row">
                  <th class="b-table__header-row-value w-24">&nbsp;</th>

                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_p2 }}
                    <sup>
                      {{
                        ssSchoolYearPY2(
                          `2|2.1|Aimsweb|on_track|All|at_grade|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_p }}
                    <sup>
                      {{
                        ssSchoolYearPY(
                          `2|2.1|Aimsweb|on_track|All|at_grade|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_c }}
                    <sup>
                      {{
                        ssSchoolYearCY(
                          `2|2.1|Aimsweb|on_track|All|at_grade|${currentCycle}`
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
                  </td>
                  <td class="b-table__value">
                    {{
                      scorePY2(
                        `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                      )
                    }}
                  </td>
                  <td class="b-table__value">
                    {{
                      scorePY(
                        `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                      )
                    }}
                    <sup>
                      {{
                        ssScorePY(
                          `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                        )
                      }}
                    </sup>
                  </td>
                  <td
                    class="b-table__value"
                    :style="{
                      'background-color': colorScaleRedBlue(
                        scoreCY(
                          `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ),
                        target(
                          `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) / 2,
                        target(
                          `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) * 1.5
                      ),
                      color: colorScaleTextRedBlue(
                        scoreCY(
                          `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ),
                        target(
                          `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) / 2,
                        target(
                          `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) * 1.5,
                        '#000000'
                      ),
                    }"
                  >
                    {{
                      isCycleCurrentOrEarlier(cycle.value)
                        ? scoreCY(
                            `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                          )
                        : 'Forthcoming'
                    }}
                  </td>
                  <td
                    class="b-table__value font-bold"
                    :class="
                      distanceNextTargetCY(
                        `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                      ) <= 0
                        ? 'text-off_track'
                        : 'text-on_track'
                    "
                  >
                    {{
                      distanceTargetCY(
                        `2|2.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="b-table__subtitle">
              {{ currentCycle }} {{ year }} {{ targetGroup.label }} Group:
              Participation & Performance <br />
              Grades K-3, aimswebPlus Reading
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
                          `2|2.2|Aimsweb|${targetGroup.value}|White|eligible|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    % Students Participating
                    <sup>
                      {{
                        ssMetric(
                          `2|2.2|Aimsweb|${targetGroup.value}|White|participating|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    % Intensive Intervention
                    <sup>
                      {{
                        ssMetric(
                          `2|2.2|Aimsweb|${targetGroup.value}|White|intensive_intervention|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    % Strategic Intervention
                    <sup>
                      {{
                        ssMetric(
                          `2|2.2|Aimsweb|${targetGroup.value}|White|strategic_intervention|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    % At/Above Grade Level
                    <sup>
                      {{
                        ssMetric(
                          `2|2.2|Aimsweb|${targetGroup.value}|White|at_grade|${currentCycle}`
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
                          `2|2.2|Aimsweb|${targetGroup.value}|${group.value}|eligible|${currentCycle}`
                        )
                      }}
                    </sup>
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `2|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|eligible|${currentCycle}`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `2|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|participating|${currentCycle}`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `2|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|intensive_intervention|${currentCycle}`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `2|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|strategic_intervention|${currentCycle}`
                      )
                    }}
                  </td>
                  <td
                    :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                    :style="{
                      'background-color': colorScaleRedBlue(
                        scoreCY(
                          `2|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ),
                        target(
                          `2|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) / 2,
                        target(
                          `2|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) * 1.5
                      ),
                      color: colorScaleTextRedBlue(
                        scoreCY(
                          `2|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ),
                        target(
                          `2|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) / 2,
                        target(
                          `2|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) * 1.5
                      ),
                    }"
                  >
                    {{
                      scoreCY(
                        `2|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`
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
          School District of Philadelphia - Board of Education | Reading
          Progress Monitoring - Goal {{ goal }} | {{ cycle.value }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="b-section-title">{{ sections[2].title }}</div>
        <div class="b-table w-full mt-2">
          <div class="b-table__title">
            Leading Indicator: District-Wide Performance <br />Grades K-3,
            aimswebPlus Reading
          </div>
          <table v-if="loaded" class="table-fixed">
            <thead>
              <tr class="b-table__header-row">
                <th class="b-table__header-row-value w-24">&nbsp;</th>
                <th class="b-table__header-row-value">
                  # Students Eligible
                  <sup>
                    {{
                      ssMetric(`2|2.1|Aimsweb|All|All|eligible|${currentCycle}`)
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  % Students Participating
                  <sup>
                    {{
                      ssMetric(
                        `2|2.1|Aimsweb|All|All|participating|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  % Intensive Intervention
                  <sup>
                    {{
                      ssMetric(
                        `2|2.1|Aimsweb|All|All|intensive_intervention|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  % Strategic Intervention
                  <sup>
                    {{
                      ssMetric(
                        `2|2.1|Aimsweb|All|All|strategic_intervention|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  % At/Above Grade Level
                  <sup>
                    {{
                      ssMetric(`2|2.1|Aimsweb|All|All|at_grade|${currentCycle}`)
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }} Annual Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_c }} Target
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_n }} Target
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_f }} Final Target
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
                      `2|${group.indicator}|Aimsweb|All|${group.value}|eligible|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `2|${group.indicator}|Aimsweb|All|${group.value}|participating|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `2|${group.indicator}|Aimsweb|All|${group.value}|intensive_intervention|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `2|${group.indicator}|Aimsweb|All|${group.value}|strategic_intervention|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="b-table__value"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scoreCY(
                        `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scoreCY(
                        `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                  }"
                >
                  {{
                    scoreCY(
                      `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    target(
                      `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="b-table__value font-bold"
                  :class="
                    distanceTargetCY(
                      `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track'
                  "
                >
                  {{
                    distanceTargetCY(
                      `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="b-table__value font-bold"
                  :class="
                    distanceNextTargetCY(
                      `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track'
                  "
                >
                  {{
                    distanceNextTargetCY(
                      `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    finalTarget(
                      `2|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
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
        <div class="b-section-title">{{ sections[3].title }}</div>
        <div class="b-table w-full mt-2">
          <div v-for="(category, cIndex) in questionCategories" :key="cIndex">
            <div class="b-table__title">{{ category }}: What is Happening?</div>
            <div
              v-for="(text, tIndex) in getQuestionTextsByCategory(
                'what',
                category
              )"
              :key="tIndex"
            >
              <div class="font-semibold p-2 text-sm">{{ text }}</div>
            </div>
            <div class="flex">
              <div class="w-1/2 h-full flex-col">
                <div class="b-table__subtitle">Why is it happening?</div>
              </div>
              <div class="w-1/2 h-full flex-col">
                <div class="b-table__subtitle">How will we solve it?</div>
              </div>
            </div>
            <div class="w-full">
              <div
                v-for="(text, tIndex) in getQuestionTextsByCategory(
                  'why',
                  category
                )"
                :key="tIndex"
              >
                <div class="w-full border-b-2 border-gray-600 grid grid-cols-2">
                  <div
                    class="border-r border-gray-400 border-dashed text-left p-2"
                  >
                    {{ text }}
                  </div>
                  <div
                    class="border-l border-gray-400 border-dashed text-left p-2"
                  >
                    {{
                      getQuestionTextByCategoryAtIndex('how', category, tIndex)
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import whatDef from '~/definitions/what'
import whyDef from '~/definitions/why'
import howDef from '~/definitions/how'
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
  name: 'BoardGoal2Fall',
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
      indicators: [2.1, 2.2],
      what: null,
      why: null,
      how: null,
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
      return 'Fall'
    },

    sections() {
      return [
        {
          title: 'Leading Indicator Performance: Overall and by Student Group',
          label: 'Overall and Student Groups',
        },
        {
          title: `Leading Indicator Performance: ${this.displayedTargetGroupSourceCycle} Target \nOff-Track, Near-Track, and On-Track School Groups`,
          label: 'Off-Track, Near-Track, On-Track Schools',
        },
        {
          title: 'Leading Indicator Performance: Grade Level',
          label: 'Grade Level',
        },
        {
          title: 'Summary of Progress Monitoring Review',
          label: 'Summary',
        },
      ]
    },
    questions() {
      return [
        { value: 'what', label: 'What' },
        { value: 'why', label: 'Why' },
        { value: 'how', label: 'How' },
      ]
    },
    questionCategories() {
      if (this.what?.Category?.length > 0) {
        let categories = this.what.Category.map(({ text }) => text)
        categories = categories.filter(
          (val, index) => categories.indexOf(val) === index
        )
        return categories
      } else {
        return []
      }
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
        { value: 'All', label: 'All Grades', indicator: 2.1 },
        { value: 'Kindergarten', label: 'Kindergarten', indicator: 2.2 },
        { value: 'Grade 1', label: 'Grade 1', indicator: 2.2 },
        { value: 'Grade 2', label: 'Grade 2', indicator: 2.2 },
        { value: 'Grade 3', label: 'Grade 3', indicator: 2.2 },
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
          indicator: 2.2,
        },
        {
          value: 'Hispanic / Latino',
          label: 'Hispanic / Latino',
          indicator: 2.2,
        },
        { value: 'White', label: 'White', indicator: 2.2 },
        {
          value: 'American Indian / Alaskan Native',
          label: 'American Indian / Alaskan Native',
          indicator: 2.2,
        },
        { value: 'Asian', label: 'Asian', indicator: 2.2 },
        {
          value: 'Native Hawaiian / Pacific Islander',
          label: 'Native Hawaiian / Pacific Islander',
          indicator: 2.2,
        },
        {
          value: 'Multi Racial / Other',
          label: 'Multi Racial / Other',
          indicator: 2.2,
        },
      ]
    },
    otherGroups() {
      return [
        {
          value: 'English Learners',
          label: 'English Learners',
          indicator: 2.2,
        },
        {
          value: 'Special Education',
          label: 'Special Education',
          indicator: 2.2,
        },
        {
          value: 'Economically Disadvantaged',
          label: 'Economically Disadvantaged',
          indicator: 2.2,
        },
      ]
    },
    otherGroupsWithOpposite() {
      return [
        {
          value: 'English Learners',
          label: 'English Learners',
          indicator: 2.2,
        },
        {
          value: 'Non-English Learners',
          label: 'Non-English Learners',
          indicator: 2.2,
        },
        { isSep: true },
        {
          value: 'Special Education',
          label: 'Special Education',
          indicator: 2.2,
        },
        {
          value: 'Non-Special Education',
          label: 'Non-Special Education',
          indicator: 2.2,
        },
        { isSep: true },
        {
          value: 'Economically Disadvantaged',
          label: 'Economically Disadvantaged',
          indicator: 2.2,
        },
        {
          value: 'Non-Economically Disadvantaged',
          label: 'Non-Economically Disadvantaged',
          indicator: 2.2,
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
        { value: 'All', label: 'All', indicator: 2.1 },
        { isSep: true },
      ].concat(this.groups)
    },
    groupsAllWithOpposite() {
      return [
        { value: 'All', label: 'All', indicator: 2.1 },
        { isSep: true },
      ].concat(this.groupsWithOpposite)
    },

    footnotesSection1() {
      const values = [
        this.ssSchoolYearPY3(
          `2|2.1|Aimsweb|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearPY2(
          `2|2.1|Aimsweb|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearPY(
          `2|2.1|Aimsweb|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearCY(
          `2|2.1|Aimsweb|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssScorePY(`2|2.1|Aimsweb|All|All|at_grade|Spring`, 'text'),
      ]
      return values.filter((text) => text?.length > 0)
    },

    footnotesSection2() {
      let values = [
        this.ssSchoolYearPY2(
          `2|2.1|Aimsweb|on_track|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearPY(
          `2|2.1|Aimsweb|on_track|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearCY(
          `2|2.1|Aimsweb|on_track|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssScorePY(`2|2.1|Aimsweb|on_track|All|at_grade|Spring`, 'text'),
        this.ssMetric(
          `2|2.2|Aimsweb|on_track|White|eligible|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `2|2.2|Aimsweb|on_track|White|participating|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `2|2.2|Aimsweb|on_track|White|at_grade|${this.currentCycle}`,
          'text'
        ),
      ]
      this.groups.forEach((group) => {
        values = values.concat([
          this.ssGroup(
            `2|2.2|Aimsweb|on_track|${group.value}|eligible|${this.currentCycle}`,
            'text'
          ),
        ])
      })
      values = values.filter((text) => text?.length > 0)
      values = values.filter((text, index) => values.indexOf(text) === index)
      return values
    },

    footnotesSection3() {
      const values = [
        this.ssMetric(
          `2|2.1|Aimsweb|All|All|eligible|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `2|2.1|Aimsweb|All|All|participating|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `2|2.1|Aimsweb|All|All|intensive_intervention|${this.currentCycle}`,
          'text'
        ),
      ]
      return values.filter((text) => text?.length > 0)
    },
  },
  async created() {
    const whatSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
      whatDef(this.goal)
    )
    this.what = await this.$qlik.getValuesFromHypercubeObject(whatSessionObject)
    await this.$qlik.destroySessionObject(whatSessionObject)

    const whySessionObject = await this.$qlik.generateHypercubeObjectFromDef(
      whyDef(this.goal)
    )
    this.why = await this.$qlik.getValuesFromHypercubeObject(whySessionObject)
    await this.$qlik.destroySessionObject(whySessionObject)

    const howSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
      howDef(this.goal)
    )
    this.how = await this.$qlik.getValuesFromHypercubeObject(howSessionObject)
    await this.$qlik.destroySessionObject(howSessionObject)

    // for displaying options of target groups
    const targetGroupSourceCycles = this.$store.state.targetGroupSourceCycles.goal2.filter(
      ({ cycle }) => cycle === 'Fall'
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
      throw new Error('No current targetGroupSourceCycle found for goal2')
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
