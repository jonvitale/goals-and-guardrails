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
          title="Goal 3 Links"
          indent-links="1rem"
          :links="[
            { link: `/goal3`, label: 'Annual' },
            { link: `/goal3/fall`, label: 'Fall' },
            { link: `/goal3/spring`, label: 'Spring' },
          ]"
        />
      </div>
      <color-key dense class="mt-3 hidden md:block" />
    </div>
    <div class="report" :class="print ? 'report--print' : ''">
      <div v-if="print" ref="cover" name="Cover" class="page">
        <div class="b-banner">
          School District of Philadelphia - Board of Education | Math Progress
          Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="flex justify-between mt-2">
          <div>
            <div class="b-infobox">
              <div class="b-infobox__title">Leading Indicator 3.1:</div>
              <div class="b-infobox__text">
                The percentage of students in grades 3-8 who score at or above
                grade level on the District's within-year math assessment in
                Fall, Winter, and Spring each year.
              </div>
            </div>
            <div class="b-infobox">
              <div class="b-infobox__title">
                Leading Indicator 3.2 - Closing the Gap:
              </div>
              <div class="b-infobox__text">
                Closing the Gap: The percentage of students, by subgroup, in
                grades 3-8 who score at or above grade level on the District's
                within-year math assessment in Fall, Winter, and Spring each
                year.
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
          School District of Philadelphia - Board of Education | Math Progress
          Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>

        <div class="b-section-title">{{ sections[0].title }}</div>
        <div class="flex justify-between mb-2">
          <div class="b-infobox mb-2">
            <div class="b-infobox__title">Leading Indicator 3.1:</div>
            <div class="b-infobox__text">
              The percentage of students in grades 3-8 who score at or above
              grade level on the District's within-year math assessment in Fall,
              Winter, and Spring each year.
            </div>
          </div>
          <div class="b-infobox mb-2">
            <div class="b-infobox__title">
              Leading Indicator 3.2 - Closing the Gap:
            </div>
            <div class="b-infobox__text">
              Closing the Gap: The percentage of students, by subgroup, in
              grades 3-8 who score at or above grade level on the District's
              within-year math assessment in Fall, Winter, and Spring each year.
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
                    `3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`
                  ),
                'text-contrast-' +
                  tierDistanceTargetCY(
                    `3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`
                  ),
              ]"
            >
              {{
                label(
                  tierDistanceTargetCY(
                    `3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`
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
                    scorePY3(`3|3.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
                    scorePY2(`3|3.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
                    scorePY(`3|3.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
                    scoreCY(`3|3.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
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
                    scorePY3(`3|3.1|Aimsweb|All|All|at_grade|Winter`, 'number'),
                    scorePY2(`3|3.1|Aimsweb|All|All|at_grade|Winter`, 'number'),
                    scorePY(`3|3.1|Aimsweb|All|All|at_grade|Winter`, 'number'),
                    scoreCY(`3|3.1|Aimsweb|All|All|at_grade|Winter`, 'number'),
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
                    scorePY3(`3|3.1|Aimsweb|All|All|at_grade|Spring`, 'number'),
                    scorePY2(`3|3.1|Aimsweb|All|All|at_grade|Spring`, 'number'),
                    scorePY(`3|3.1|Aimsweb|All|All|at_grade|Spring`, 'number'),
                    scoreCY(`3|3.1|Aimsweb|All|All|at_grade|Spring`, 'number'),
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
                  values: [NaN, NaN, NaN, NaN, 0.547, 0.637, 0.75, 0.874, 1, 1],
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
            Grades 3-8, aimswebPlus and Star Math
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
                        `3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p2 }}
                  <sup>
                    {{
                      ssSchoolYearPY2(
                        `3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p }}
                  <sup>
                    {{
                      ssSchoolYearPY(
                        `3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }}
                  <sup>
                    {{
                      ssSchoolYearCY(
                        `3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`
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
                    scorePY3(`3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`)
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scorePY2(`3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`)
                  }}
                </td>
                <td class="b-table__value">
                  {{ scorePY(`3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`) }}
                  <sup>
                    {{
                      ssScorePY(`3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`)
                    }}
                  </sup>
                </td>
                <td
                  class="b-table__value"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scoreCY(
                        `3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ),
                      target(
                        `3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) / 2,
                      target(
                        `3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scoreCY(
                        `3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ),
                      target(
                        `3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) / 2,
                      target(
                        `3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`,
                        'number'
                      ) * 1.5,
                      '#000000'
                    ),
                  }"
                >
                  {{
                    isCycleCurrentOrEarlier(cycle.value)
                      ? scoreCY(`3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`)
                      : 'Forthcoming'
                  }}
                </td>
                <td class="b-table__value">
                  {{ target(`3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`) }}
                </td>
                <td
                  class="b-table__value font-bold"
                  :class="
                    distanceTargetCY(
                      `3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track'
                  "
                >
                  {{
                    distanceTargetCY(
                      `3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`
                    )
                  }}
                </td>
                <td
                  class="b-table__value font-bold"
                  :class="
                    distanceNextTargetCY(
                      `3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track'
                  "
                >
                  {{
                    distanceNextTargetCY(
                      `3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    finalTarget(`3|3.1|Aimsweb|All|All|at_grade|${cycle.value}`)
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="b-table__title">
            Leading Indicator: Winter Performance, Grades 3-8, aimswebPlus and
            Star Math
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
                        `3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p2 }}
                  <sup>
                    {{
                      ssSchoolYearPY2(
                        `3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_p }}
                  <sup>
                    {{
                      ssSchoolYearPY(
                        `3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }}
                  <sup>
                    {{
                      ssSchoolYearCY(
                        `3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`
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
                v-for="(group, gIndex) in groupsWithGender"
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
                      `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY2(
                      `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY(
                      `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scoreCY(
                        `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scoreCY(
                        `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                  }"
                >
                  {{
                    scoreCY(
                      `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    target(
                      `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceTargetCY(
                      `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceTargetCY(
                      `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceNextTargetCY(
                      `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceNextTargetCY(
                      `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    finalTarget(
                      `3|3.2|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
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
          School District of Philadelphia - Board of Education | Math Progress
          Monitoring - Goal {{ goal }} | {{ currentCycle }}
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
              Schools): % At/Above Grade Level <br />
              Grades 3-8, aimswebPlus and Star Math
              <sup>
                {{
                  ssTargetGroup(
                    `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${currentCycle}`
                  )
                }}
              </sup>
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
                          `3|3.1|Aimsweb|on_track|All|at_grade|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_p }}
                    <sup>
                      {{
                        ssSchoolYearPY(
                          `3|3.1|Aimsweb|on_track|All|at_grade|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    {{ $store.getters.sy_c }}
                    <sup>
                      {{
                        ssSchoolYearCY(
                          `3|3.1|Aimsweb|on_track|All|at_grade|${currentCycle}`
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
                        `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                      )
                    }}
                  </td>
                  <td class="b-table__value">
                    {{
                      scorePY(
                        `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                      )
                    }}
                    <sup>
                      {{
                        ssScorePY(
                          `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                        )
                      }}
                    </sup>
                  </td>
                  <td
                    class="b-table__value"
                    :style="{
                      'background-color': colorScaleRedBlue(
                        scoreCY(
                          `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ),
                        target(
                          `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) / 2,
                        target(
                          `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) * 1.5
                      ),
                      color: colorScaleTextRedBlue(
                        scoreCY(
                          `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ),
                        target(
                          `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) / 2,
                        target(
                          `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`,
                          'number'
                        ) * 1.5,
                        '#000000'
                      ),
                    }"
                  >
                    {{
                      isCycleCurrentOrEarlier(cycle.value)
                        ? scoreCY(
                            `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                          )
                        : 'Forthcoming'
                    }}
                  </td>
                  <td
                    class="b-table__value font-bold"
                    :class="
                      distanceNextTargetCY(
                        `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                      ) <= 0
                        ? 'text-off_track'
                        : 'text-on_track'
                    "
                  >
                    {{
                      distanceTargetCY(
                        `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${cycle.value}`
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="b-table__subtitle">
              {{ currentCycle }} {{ year }} {{ targetGroup.label }} Group:
              Participation & Performance <br />
              Grades 3-8, aimswebPlus and Star Math
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
                          `3|3.2|Aimsweb|${targetGroup.value}|White|eligible|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    % Students Participating
                    <sup>
                      {{
                        ssMetric(
                          `3|3.2|Aimsweb|${targetGroup.value}|White|participating|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    % Intensive Intervention
                    <sup>
                      {{
                        ssMetric(
                          `3|3.2|Aimsweb|${targetGroup.value}|White|intensive_intervention|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    % Strategic Intervention
                    <sup>
                      {{
                        ssMetric(
                          `3|3.2|Aimsweb|${targetGroup.value}|White|strategic_intervention|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    On Watch (Star Only)
                    <sup>
                      {{
                        ssMetric(
                          `3|3.2|Aimsweb|${targetGroup.value}|White|on_watch|${currentCycle}`
                        )
                      }}
                    </sup>
                  </th>
                  <th class="b-table__header-row-value">
                    % At/Above Grade Level
                    <sup>
                      {{
                        ssMetric(
                          `3|3.2|Aimsweb|${targetGroup.value}|White|at_grade|${currentCycle}`
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
                          `3|3.2|Aimsweb|${targetGroup.value}|${group.value}|eligible|${currentCycle}`
                        )
                      }}
                    </sup>
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|eligible|${currentCycle}`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|participating|${currentCycle}`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|intensive_intervention|${currentCycle}`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|strategic_intervention|${currentCycle}`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scoreCY(
                        `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|on_watch|${currentCycle}`
                      )
                    }}
                  </td>
                  <td
                    :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                    :style="{
                      'background-color': colorScaleRedBlue(
                        scoreCY(
                          `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ),
                        target(
                          `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) / 2,
                        target(
                          `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) * 1.5
                      ),
                      color: colorScaleTextRedBlue(
                        scoreCY(
                          `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ),
                        target(
                          `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) / 2,
                        target(
                          `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`,
                          'number'
                        ) * 1.5
                      ),
                    }"
                  >
                    {{
                      scoreCY(
                        `3|${group.indicator}|Aimsweb|${targetGroup.value}|${group.value}|at_grade|${currentCycle}`
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
          School District of Philadelphia - Board of Education | Math Progress
          Monitoring - Goal {{ goal }} | {{ cycle.value }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="b-section-title">{{ sections[2].title }}</div>
        <div class="b-table w-full mt-2">
          <div class="b-table__title">
            Leading Indicator: District-Wide Performance <br />Grades 3-8,
            aimswebPlus and Star Math
          </div>
          <table v-if="loaded" class="table-fixed">
            <thead>
              <tr class="b-table__header-row">
                <th class="b-table__header-row-value w-24">&nbsp;</th>
                <!-- <th class="b-table__header-row-value">
                  # Students Eligible
                  <sup>
                    {{
                      ssMetric(`3|3.1|Aimsweb|All|All|eligible|${currentCycle}`)
                    }}
                  </sup>
                </th> -->
                <th class="b-table__header-row-value">
                  % Students Participating
                  <sup>
                    {{
                      ssMetric(
                        `3|3.1|Aimsweb|All|All|participating|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  % Intensive Intervention
                  <sup>
                    {{
                      ssMetric(
                        `3|3.1|Aimsweb|All|All|intensive_intervention|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  % Strategic Intervention
                  <sup>
                    {{
                      ssMetric(
                        `3|3.1|Aimsweb|All|All|strategic_intervention|${currentCycle}`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  % On Watch (Star Only)
                  <sup>
                    {{
                      ssMetric(`3|3.1|Aimsweb|All|All|on_watch|${currentCycle}`)
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  % At/Above Grade Level
                  <sup>
                    {{
                      ssMetric(`3|3.1|Aimsweb|All|All|at_grade|${currentCycle}`)
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

                <!-- <td class="b-table__value">
                  {{
                    scoreCY(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|eligible|${currentCycle}`
                    )
                  }}
                </td> -->
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|participating|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|intensive_intervention|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|strategic_intervention|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    scoreCY(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|on_watch|${currentCycle}`
                    )
                  }}
                  <sup>
                    {{
                      ssScoreCY(
                        `3|${group.indicator}|Aimsweb|All|${group.value}|on_watch|${currentCycle}`
                      )
                    }}
                  </sup>
                </td>
                <td
                  class="b-table__value"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scoreCY(
                        `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scoreCY(
                        `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ),
                      target(
                        `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) / 2,
                      target(
                        `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`,
                        'number'
                      ) * 1.5
                    ),
                  }"
                >
                  {{
                    scoreCY(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    target(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="b-table__value font-bold"
                  :class="
                    distanceTargetCY(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track'
                  "
                >
                  {{
                    distanceTargetCY(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td
                  class="b-table__value font-bold"
                  :class="
                    distanceNextTargetCY(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track'
                  "
                >
                  {{
                    distanceNextTargetCY(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
                    )
                  }}
                </td>
                <td class="b-table__value">
                  {{
                    finalTarget(
                      `3|${group.indicator}|Aimsweb|All|${group.value}|at_grade|${currentCycle}`
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
                      class="b-summarytable__row-label b-summarytable__row-label--climate"
                    >
                      <div>Climate</div>
                    </div>
                    <div class="b-summarytable__value">
                      <p>
                        Building on recommendations from Goal 2, we will provide
                        schools with differentiated Multi-Tiered Systems of
                        Supports (MTSS) implementation supports (rolled out in
                        tandem with the new MTSS framework) that align to their
                        needs, context, organizational conditions, and staffing.
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
                      <p>
                        Building on recommendations from Goal 2, we will
                        implement consistent and standardized expectations for
                        how time is used during the school year to implement
                        priorities in literacy and math, with aligned and
                        differentiated professional learning across the district
                        starting in the 2021-2022 school year.
                      </p>
                      <p>
                        Guided by the new Math Framework, we will deliver a new,
                        high quality, standards-aligned curriculum for math in
                        grades 4-12 in the 2021-2022 school year. We will focus
                        development on providing exemplars of instruction,
                        practice, and feedback.
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="b-summarytable__value">
                    <p class="b-summarytable__value--highlight">
                      These actions are interrelated, and together, they will
                      expand our capacity to deliver high quality math
                      instruction to students who are prepared to learn.
                    </p>
                    <ul>
                      <li>
                        A high quality math curriculum will foster rigorous
                        teaching and learning.
                      </li>
                      <li>
                        A robust Multi-Tiered Systems of Supports (MTSS) fosters
                        and supports a whole-child approach to education, and
                        supports a student academically, behaviorally, and
                        emotionally.
                      </li>
                      <li>
                        A commitment to consistent teacher development will
                        empower teachers to make the most of a strong
                        curriculum, and to leverage MTSS to differentiate
                        supports for their students.
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
  name: 'BoardGoal3Winter',
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
      goal: 3,
      indicators: [3.1, 3.2],
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

    targetGroups() {
      return [
        { value: 'off_track', label: 'Off-Track' },
        { value: 'near_track', label: 'Near-Track' },
        { value: 'on_track', label: 'On-Track' },
      ]
    },
    gradeSpans() {
      return [
        { value: 'All', label: 'All Grades', indicator: 3.1 },
        { value: 'Grade 3', label: 'Grade 3', indicator: 3.2 },
        { value: 'Grade 4', label: 'Grade 4', indicator: 3.2 },
        { value: 'Grade 5', label: 'Grade 5', indicator: 3.2 },
        { value: 'Grade 6', label: 'Grade 6', indicator: 3.2 },
        { value: 'Grade 7', label: 'Grade 7', indicator: 3.2 },
        { value: 'Grade 8', label: 'Grade 8', indicator: 3.2 },
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
          indicator: 3.2,
        },
        {
          value: 'Hispanic / Latino',
          label: 'Hispanic / Latino',
          indicator: 3.2,
        },
        { value: 'White', label: 'White', indicator: 3.2 },
        {
          value: 'American Indian / Alaskan Native',
          label: 'American Indian / Alaskan Native',
          indicator: 3.2,
        },
        { value: 'Asian', label: 'Asian', indicator: 3.2 },
        {
          value: 'Native Hawaiian / Pacific Islander',
          label: 'Native Hawaiian / Pacific Islander',
          indicator: 3.2,
        },
        {
          value: 'Multi Racial / Other',
          label: 'Multi Racial / Other',
          indicator: 3.2,
        },
      ]
    },
    otherGroups() {
      return [
        {
          value: 'English Learners',
          label: 'English Learners',
          indicator: 3.2,
        },
        {
          value: 'Special Education',
          label: 'Special Education',
          indicator: 3.2,
        },
        {
          value: 'Economically Disadvantaged',
          label: 'Economically Disadvantaged',
          indicator: 3.2,
        },
      ]
    },
    otherGroupsWithOpposite() {
      return [
        {
          value: 'English Learners',
          label: 'English Learners',
          indicator: 3.2,
        },
        {
          value: 'Non-English Learners',
          label: 'Non-English Learners',
          indicator: 3.2,
        },
        { isSep: true },
        {
          value: 'Special Education',
          label: 'Special Education',
          indicator: 3.2,
        },
        {
          value: 'Non-Special Education',
          label: 'Non-Special Education',
          indicator: 3.2,
        },
        { isSep: true },
        {
          value: 'Economically Disadvantaged',
          label: 'Economically Disadvantaged',
          indicator: 3.2,
        },
        {
          value: 'Non-Economically Disadvantaged',
          label: 'Non-Economically Disadvantaged',
          indicator: 3.2,
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
        { value: 'All', label: 'All', indicator: 3.1 },
        { isSep: true },
      ].concat(this.groups)
    },
    groupsAllWithOpposite() {
      return [
        { value: 'All', label: 'All', indicator: 3.1 },
        { isSep: true },
      ].concat(this.groupsWithOpposite)
    },

    footnotesSection1() {
      let values = [
        this.ssSchoolYearPY3(
          `3|3.1|Aimsweb|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearPY2(
          `3|3.1|Aimsweb|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearPY(
          `3|3.1|Aimsweb|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearCY(
          `3|3.1|Aimsweb|All|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssScorePY(`3|3.1|Aimsweb|All|All|at_grade|Spring`, 'text'),
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
            `3|3.1|Aimsweb|${targetGroup.value}|All|at_grade|${this.currentCycle}`,
            'text'
          ),
        ])
      })

      values = values.concat([
        this.ssSchoolYearPY2(
          `3|3.1|Aimsweb|on_track|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearPY(
          `3|3.1|Aimsweb|on_track|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssSchoolYearCY(
          `3|3.1|Aimsweb|on_track|All|at_grade|${this.currentCycle}`,
          'text'
        ),
        this.ssScorePY(`3|3.1|Aimsweb|on_track|All|at_grade|Spring`, 'text'),
        this.ssMetric(
          `3|3.2|Aimsweb|on_track|White|eligible|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `3|3.2|Aimsweb|on_track|White|participating|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `3|3.2|Aimsweb|on_track|White|at_grade|${this.currentCycle}`,
          'text'
        ),
      ])
      this.groups.forEach((group) => {
        values = values.concat([
          this.ssGroup(
            `3|3.2|Aimsweb|on_track|${group.value}|eligible|${this.currentCycle}`,
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
          `3|3.1|Aimsweb|All|All|eligible|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `3|3.1|Aimsweb|All|All|participating|${this.currentCycle}`,
          'text'
        ),
        this.ssMetric(
          `3|3.1|Aimsweb|All|All|intensive_intervention|${this.currentCycle}`,
          'text'
        ),
      ]
      this.gradeSpans.forEach((group) => {
        values = values.concat([
          this.ssScoreCY(
            `3|3.2|Aimsweb|All|${group.value}|on_watch|${this.currentCycle}`,
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
    const targetGroupSourceCycles = this.$store.state.targetGroupSourceCycles.goal3.filter(
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
      throw new Error('No current targetGroupSourceCycle found for goal3')
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
