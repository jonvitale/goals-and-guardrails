<template>
  <!-- 
    Notes: the distance footnote is on two tables, the overall/subgroups and overall/grades with different 
    footnote numbers. To differentiate, I use Grade 3 as the group reference in the second table.
    If copying this as a template for another goal, make sure Grade 3 is available.
  -->
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
          title="Goal 4 Links"
          indent-links="1rem"
          :links="[
            { link: `/goal4/fall`, label: 'Fall' },
            { link: `/goal4/winter`, label: 'Winter' },
            { link: `/goal4/spring`, label: 'Spring' },
          ]"
        />
      </div>
      <color-key class="mt-3 hidden md:block" dense />
    </div>
    <div class="report" :class="print ? 'report--print' : ''">
      <div v-if="print" ref="cover" name="Cover" class="page">
        <div class="b-banner">
          School District of Philadelphia - Board of Education | College &
          Career Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
          {{ $store.getters.sy_c }}
        </div>
        <div class="flex justify-between mt-2">
          <div class="b-infobox mr-2">
            <div class="b-infobox__title">College & Career - Board Goal 4:</div>
            <div class="b-infobox__text">
              The percentage of students who are proficient on all three state
              high school assessments (Algebra, Literature, and Biology) by the
              end of their 11th grade year will grow from 26.1% in August 2019
              to 52.0% by August 2026
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
          <div class="b-infobox mr-2">
            <div class="b-infobox__title">College & Career - Board Goal 4:</div>
            <div class="b-infobox__text">
              The percentage of students who are proficient on all three state
              high school assessments (Algebra, Literature, and Biology) by the
              end of their 11th grade year will grow from 26.1% in August 2019
              to 52.0% by August 2026.
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
                  `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`
                )
              "
            >
              {{
                label(
                  tierDistanceTargetPY2(
                    `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`
                  )
                )
              }}
            </div>
          </div>
          <div class="w-1/2">
            <target-chart
              :series="[
                {
                  key: 'keystones',
                  color: '#0000aa',
                  label:
                    'Keystones - % Proficient/Advanced (Algebra, Lit, Bio)',
                  values: [
                    NaN,
                    scorePY4(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`,
                      'number'
                    ),
                    scorePY3(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`,
                      'number'
                    ),
                    scorePY2(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`,
                      'number'
                    ),
                    scorePY(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`,
                      'number'
                    ),
                    scoreCY(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`,
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
                    0.284,
                    0.317,
                    0.361,
                    0.409,
                    0.462,
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
            College & Career Goal 4: District-Wide Proficiency <br />
            Grades 9-12, Keystone (Algebra, Literature, Biology)
            <sup>
              {{
                ssMetricGroupPY(
                  `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`
                )
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
                      ssScorePY(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }} Annual Goal
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_c }} Goal
                  <sup>
                    {{
                      ssDistance(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_n }} Goal
                  <sup>
                    {{
                      ssDistance(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`
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
                v-for="(group, gIndex) in groupsAll"
                :key="gIndex"
                class="b-table__row"
                :class="{ 'font-bold': group.value === 'All' }"
              >
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{ group.value }}
                  <sup>
                    {{
                      ssGroup(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`
                      )
                    }}
                  </sup>
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY4(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY3(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`
                    )
                  }}
                </td>
                <td
                  :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scorePY2(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`,
                        'number'
                      ),
                      target(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`,
                        'number'
                      ) / 2,
                      target(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scorePY2(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`,
                        'number'
                      ),
                      target(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`,
                        'number'
                      ) / 2,
                      target(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`,
                        'number'
                      ) * 1.5
                    ),
                  }"
                >
                  {{
                    scorePY2(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    target(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceTargetPY2(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceTargetPY2(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceNextTargetPY2(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceNextTargetPY2(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    finalTarget(
                      `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`
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
          School District of Philadelphia - Board of Education | College &
          Career Progress Monitoring - Goal {{ goal }} | {{ currentCycle }}
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
                  District-Wide {{ syData }}
                </td>
                <td class="b-table__header-row-value">
                  # Students
                  <sup>
                    {{
                      ssMetric(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|student_count|Keystone`
                      )
                    }}
                  </sup>
                </td>
                <td class="b-table__header-row-value">% Below Basic</td>
                <td class="b-table__header-row-value">% Basic</td>
                <td class="b-table__header-row-value">
                  % Proficient or Advanced
                  <sup>
                    {{
                      ssMetric(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`
                      )
                    }}
                  </sup>
                </td>
                <th class="b-table__header-row-value">
                  {{ $store.getters.sy_c }} Annual Goal
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_c }} Goal
                  <sup>
                    {{
                      ssDistance(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`
                      )
                    }}
                  </sup>
                </th>
                <th class="b-table__header-row-value">
                  Distance to {{ $store.getters.sy_n }} Goal
                  <sup>
                    {{
                      ssDistance(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`
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
                v-for="(group, gIndex) in metricGroups"
                :key="gIndex"
                class="b-table__row"
                :class="{ 'font-bold': group.value === 'All' }"
              >
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{ group.value }}
                  <sup>
                    {{
                      ssMetricGroup(
                        `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`
                      )
                    }}
                  </sup>
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY2(
                      `4|Goal 4|${group.value}|All|All|student_count|Keystone`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY2(
                      `4|Goal 4|${group.value}|All|All|below_basic|Keystone`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    scorePY2(`4|Goal 4|${group.value}|All|All|basic|Keystone`)
                  }}
                </td>
                <td
                  :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                  :style="{
                    'background-color': colorScaleRedBlue(
                      scorePY2(
                        `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`,
                        'number'
                      ),
                      target(
                        `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`,
                        'number'
                      ) / 2,
                      target(
                        `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`,
                        'number'
                      ) * 1.5
                    ),
                    color: colorScaleTextRedBlue(
                      scorePY2(
                        `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`,
                        'number'
                      ),
                      target(
                        `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`,
                        'number'
                      ) / 2,
                      target(
                        `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`,
                        'number'
                      ) * 1.5
                    ),
                  }"
                >
                  {{
                    scorePY2(
                      `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    target(
                      `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceTargetPY2(
                      `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceTargetPY2(
                      `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`
                    )
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="[
                    !group.isSep ? 'b-table__value' : 'b-table__sep',
                    distanceNextTargetPY2(
                      `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`
                    ) <= 0
                      ? 'text-off_track'
                      : 'text-on_track',
                  ]"
                >
                  {{
                    distanceNextTargetPY2(
                      `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`
                    )
                  }}
                </td>
                <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                  {{
                    finalTarget(
                      `4|Goal 4|${group.value}|All|All|proficient_advanced|Keystone`
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
        <div
          v-if="areMultipleCyclesAvailable"
          class="w-full flex justify-center"
        >
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
              Grades 9-12, Keystone (Algebra, Literature, Biology),
              {{ $store.getters.sy_p2 }}
              <sup>
                {{
                  ssTargetGroup(
                    `4|Goal 4|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|All|proficient_advanced|Keystone`
                  )
                }}
              </sup>
            </div>
            <table v-if="loaded" class="table-fixed">
              <thead>
                <tr class="b-table__header-row">
                  <td class="b-table__header-row-value w-48">&nbsp;</td>
                  <td class="b-table__header-row-value"># Students</td>
                  <td class="b-table__header-row-value">
                    % Students Missing 1+ Keystone
                  </td>
                  <td class="b-table__header-row-value">
                    % Prof/Adv: All 3 Keystones
                    <sup>
                      {{
                        ssMetric(
                          `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`
                        )
                      }}
                    </sup>
                  </td>
                  <td class="b-table__header-row-value">
                    % Prof/Adv: Algebra
                    <sup>
                      {{
                        ssMetricGroup(
                          `4|Goal 4|Keystone (Algebra)|All|All|proficient_advanced|Keystone`
                        )
                      }}
                    </sup>
                  </td>
                  <td class="b-table__header-row-value">
                    % Prof/Adv: Literature
                    <sup>
                      {{
                        ssMetricGroup(
                          `4|Goal 4|Keystone (Literature)|All|All|proficient_advanced|Keystone`
                        )
                      }}
                    </sup>
                  </td>
                  <td class="b-table__header-row-value">
                    % Prof/Adv: Biology
                    <sup>
                      {{
                        ssMetricGroup(
                          `4|Goal 4|Keystone (Biology)|All|All|proficient_advanced|Keystone`
                        )
                      }}
                    </sup>
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
                          `4|Goal 4|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Keystone`
                        )
                      }}
                    </sup>
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|student_count|Keystone`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|students_missing_1_plus_keystone|Keystone`
                      )
                    }}
                  </td>
                  <td
                    :class="!group.isSep ? 'b-table__value' : 'b-table__sep'"
                    :style="{
                      'background-color': colorScaleRedBlue(
                        scorePY2(
                          `4|Goal 4|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Keystone`,
                          'number'
                        ),
                        target(
                          `4|Goal 4|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Keystone`,
                          'number'
                        ) / 2,
                        target(
                          `4|Goal 4|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Keystone`,
                          'number'
                        ) * 1.5
                      ),
                      color: colorScaleTextRedBlue(
                        scorePY2(
                          `4|Goal 4|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Keystone`,
                          'number'
                        ),
                        target(
                          `4|Goal 4|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Keystone`,
                          'number'
                        ) / 2,
                        target(
                          `4|Goal 4|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Keystone`,
                          'number'
                        ) * 1.5
                      ),
                    }"
                  >
                    {{
                      scorePY2(
                        `4|Goal 4|Keystone (Algebra, Literature, Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Keystone`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `4|Goal 4|Keystone (Algebra)|${targetGroup.value}|${group.value}|proficient_advanced|Keystone`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `4|Goal 4|Keystone (Literature)|${targetGroup.value}|${group.value}|proficient_advanced|Keystone`
                      )
                    }}
                  </td>
                  <td :class="!group.isSep ? 'b-table__value' : 'b-table__sep'">
                    {{
                      scorePY2(
                        `4|Goal 4|Keystone (Biology)|${targetGroup.value}|${group.value}|proficient_advanced|Keystone`
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
  name: 'BoardGoal4',
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
      goal: 4,
      indicators: ['Goal 4'],
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

    areMultipleCyclesAvailable() {
      return Object.keys(this.availableSourceCycles).length > 1
    },

    /** Aliases for store */
    year() {
      return this.$store.state.year_c
    },
    syData() {
      return this.$store.getters.sy_p2
    },
    currentCycle() {
      return this.targetGroupSourceCycle.split('|')[0]
    },

    sections() {
      return [
        {
          title: 'High School Goal 4 Performance: Overall and by Student Group',
          label: 'Overall and Student Groups',
        },
        {
          title: `High School Goal 4 Performance by Keystone Exam`,
          label: 'Keystone Exam',
        },
        {
          title: `High School Goal 4 Performance: ${this.displayedTargetGroupSourceCycle} Target \nOff-Track, Near-Track, and On-Track School Groups`,
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
    metricGroups() {
      return [
        {
          value: 'Keystone (Algebra, Literature, Biology)',
          label: 'All 3 Keystones',
          indicator: 'Keystone',
        },
        {
          value: 'Keystone (Algebra)',
          label: 'Algebra',
          indicator: 'Keystone',
        },
        {
          value: 'Keystone (Literature)',
          label: 'Literature',
          indicator: 'Keystone',
        },
        {
          value: 'Keystone (Biology)',
          label: 'Biology',
          indicator: 'Keystone',
        },
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
      let values = [
        this.ssMetricGroupPY(
          `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`,
          'text'
        ),
        this.ssScorePY(
          `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`,
          'text'
        ),
        this.ssDistance(
          `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`,
          'text'
        ),
      ]

      this.groups.forEach((group) => {
        values = values.concat([
          this.ssGroup(
            `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|${group.value}|proficient_advanced|Keystone`,
            'text'
          ),
        ])
      })

      values = values.filter((text) => text?.length > 0)
      values = values.filter((text, index) => values.indexOf(text) === index)
      return values
    },
    footnotesSection2() {
      let values = [
        this.ssMetric(
          `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|student_count|Keystone`,
          'text'
        ),
        this.ssMetric(
          `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`,
          'text'
        ),
        this.ssDistance(
          `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`,
          'text'
        ),
        this.ssMetricGroup(
          `4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone`,
          'text'
        ),
        this.ssTargetGroup(
          `4|Goal 4|Keystone (Algebra, Literature, Biology)|on_track|All|proficient_advanced|Keystone`,
          'text'
        ),
      ]
      this.groups.forEach((group) => {
        values = values.concat([
          this.ssGroup(
            `4|Goal 4|Keystone (Algebra, Literature, Biology)|on_track|${group.value}|proficient_advanced|Keystone`,
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
      .goal4
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
      throw new Error('No current targetGroupSourceCycle found for goal 4')
    }

    await this.fetchData()
  },
  methods: {
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
        throw new Error(`${value} targetGroupSourceCycle not found for goal 4`)
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
