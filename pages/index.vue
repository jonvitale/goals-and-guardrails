<template>
  <div class="container mx-auto px-2 lg:px-6 py-4 md:py-6">
    <div>
      <Square color="transparent" class="mb-4">
        <Heading> About the Goals and Guardrails </Heading>
        <Content class="text-left">
          <div>
            In 2020-21, the School District of Philadelphia’s Board of Education
            released a five-year plan intended to “set clear expectations for
            what our students must know and be able to do,” including guidelines
            designed to “rigorously monitor our progress toward achieving our
            goals.” The Board will monitor each Goal and its leading indicators
            three times per year and each Guardrail and its leading indicators
            once per year.
            <br />
            <br />
            For more information, please visit
            <a
              href="https://www.philasd.org/era/goals-and-guardrails/"
              target="_blank"
              class="underline text-blue-500"
            >
              www.philasd.org/era/goals-and-guardrails
            </a>
            or visit the
            <nuxt-link to="/about" exact class="underline text-blue-500">
              About
            </nuxt-link>
            page.
          </div>
        </Content>
      </Square>
      <div>
        <Square class="mb-4" color="light">
          <Heading>Reading - Board Goal 1</Heading>
          <Content>
            The percentage of students in grades 3-8 who are proficient on the
            state ELA assessment will grow from 35.7% in August 2019 to 65.0% by
            August 2026.
          </Content>
          <div class="b-infobox w-full flex mb-4">
            <div
              class="mr-4 flex-grow flex flex-col justify-center items-start"
            >
              <div class="w-full b-infobox__subtitle">
                Goal Overall Progress
              </div>
              <div
                class="w-full b-infobox__subtitle text-black font-bold"
                :class="
                  'bg-' +
                  tierDistanceTargetPY2(
                    `1|Goal 1|PSSA|All|All|proficient_advanced|PSSA`
                  )
                "
              >
                {{
                  label(
                    tierDistanceTargetPY2(
                      `1|Goal 1|PSSA|All|All|proficient_advanced|PSSA`
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
                        `1|Goal 1|PSSA|All|All|proficient_advanced|PSSA`,
                        'number'
                      ),
                      scorePY3(
                        `1|Goal 1|PSSA|All|All|proficient_advanced|PSSA`,
                        'number'
                      ),
                      scorePY2(
                        `1|Goal 1|PSSA|All|All|proficient_advanced|PSSA`,
                        'number'
                      ),
                      scorePY(
                        `1|Goal 1|PSSA|All|All|proficient_advanced|PSSA`,
                        'number'
                      ),
                      scoreCY(
                        `1|Goal 1|PSSA|All|All|proficient_advanced|PSSA`,
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
                      0.386,
                      0.425,
                      0.474,
                      0.527,
                      0.586,
                      0.65,
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
          <heading>Leading Indicator 1.1</heading>
          <Content>
            The percentage of students in grades 3-8 who score at or above
            grade-level on the District's within-year reading assessment in
            Fall, Winter, and Spring each year.
          </Content>
          <div class="b-infobox w-full flex">
            <div
              class="mr-4 flex-grow flex flex-col justify-center items-start"
            >
              <div class="w-full b-infobox__subtitle">
                Leading Indicator Overall Progress
              </div>
              <div
                class="w-full b-infobox__subtitle text-black font-bold"
                :class="[
                  'bg-' +
                    tierDistanceTargetCY(
                      `1|1.1|Aimsweb|All|All|at_grade|${currentCycle}`
                    ),
                  'text-contrast-' +
                    tierDistanceTargetCY(
                      `1|1.1|Aimsweb|All|All|at_grade|${currentCycle}`
                    ),
                ]"
              >
                {{
                  label(
                    tierDistanceTargetCY(
                      `1|1.1|Aimsweb|All|All|at_grade|${currentCycle}`
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
                      scorePY3(`1|1.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
                      scorePY2(`1|1.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
                      scorePY(`1|1.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
                      scoreCY(`1|1.1|Aimsweb|All|All|at_grade|Fall`, 'number'),
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
                      scorePY3(
                        `1|1.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
                      scorePY2(
                        `1|1.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
                      scorePY(
                        `1|1.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
                      scoreCY(
                        `1|1.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
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
                      scorePY3(
                        `1|1.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
                      scorePY2(
                        `1|1.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
                      scorePY(
                        `1|1.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
                      scoreCY(
                        `1|1.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
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
                      0.514,
                      0.566,
                      0.631,
                      0.703,
                      0.782,
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
        </Square>
        <Square class="mb-4" color="tint">
          <Heading>Reading - Board Goal 2</Heading>
          <Content>
            The percentage of 3rd grade students who are proficient on the state
            ELA assessment will grow from 32.5% in August 2019 to 62.0% by
            August 2026.
          </Content>
          <div class="b-infobox w-full flex mb-4">
            <div
              class="mr-4 flex-grow flex flex-col justify-center items-start"
            >
              <div class="w-full b-infobox__subtitle">
                Goal Overall Progress
              </div>
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
          <heading>Leading Indicator 2.1</heading>
          <Content>
            The percentage of students in grades K-3 who score at or above grade
            level on the District's within-year reading assessment in Fall,
            Winter, and Spring each year.
          </Content>
          <div class="b-infobox w-full flex">
            <div
              class="mr-4 flex-grow flex flex-col justify-center items-start"
            >
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
                      scorePY3(
                        `2|2.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
                      scorePY2(
                        `2|2.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
                      scorePY(
                        `2|2.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
                      scoreCY(
                        `2|2.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
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
                      scorePY3(
                        `2|2.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
                      scorePY2(
                        `2|2.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
                      scorePY(
                        `2|2.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
                      scoreCY(
                        `2|2.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
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
        </Square>
        <Square class="mb-4" color="light">
          <heading>Math - Board Goal 3</heading>
          <Content>
            The percentage of students in grades 3-8 who are proficient on the
            state Math assessment will grow from 21.6% in August 2019 to 52.0%
            by August 2026
          </Content>
          <div class="b-infobox w-full flex mb-4">
            <div
              class="mr-4 flex-grow flex flex-col justify-center items-start"
            >
              <div class="w-full b-infobox__subtitle">
                Goal Overall Progress
              </div>
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
          <heading>Leading Indicator 3.1</heading>
          <Content>
            The percentage of students in grades 3-8 who score at or above grade
            level on the District's within-year math assessment in Fall, Winter,
            and Spring each year.
          </Content>
          <div class="b-infobox w-full flex">
            <div
              class="mr-4 flex-grow flex flex-col justify-center items-start"
            >
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
                      scorePY3(
                        `3|3.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
                      scorePY2(
                        `3|3.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
                      scorePY(
                        `3|3.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
                      scoreCY(
                        `3|3.1|Aimsweb|All|All|at_grade|Winter`,
                        'number'
                      ),
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
                      scorePY3(
                        `3|3.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
                      scorePY2(
                        `3|3.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
                      scorePY(
                        `3|3.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
                      scoreCY(
                        `3|3.1|Aimsweb|All|All|at_grade|Spring`,
                        'number'
                      ),
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
                      0.547,
                      0.637,
                      0.75,
                      0.874,
                      1,
                      1,
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
        </Square>
        <Square class="mb-4" color="tint">
          <Heading>College & Career - Board Goal 4</Heading>
          <Content>
            The percentage of students who are proficient on all three state
            high school assessments (Algebra, Literature, and Biology) by the
            end of their 11th grade year will grow from 26.1% in August 2019 to
            52.0% by August 2026.
          </Content>
          <div class="b-infobox w-full flex mb-4">
            <div
              class="mr-4 flex-grow flex flex-col justify-center items-start"
            >
              <div class="w-full b-infobox__subtitle">
                Goal Overall Progress
              </div>
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
          <heading>Leading Indicator 4.1</heading>
          <Content>
            The percentage of students in grades 9-11 who score at or above
            grade level on the District's within-year math and reading
            assessments in Fall, Winter, and Spring each year.
          </Content>
          <div class="b-infobox w-full flex">
            <div
              class="mr-4 flex-grow flex flex-col justify-center items-start"
            >
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
          <heading>Leading Indicator 4.2</heading>
          <Content>
            The percentage of students who are proficient on all three state
            high school assessments (Algebra, Literature, and Biology) by the
            end of their 10th grade year.
          </Content>
          <div class="b-infobox w-full flex">
            <div
              class="mr-4 flex-grow flex flex-col justify-center items-start"
            >
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
        </Square>
      </div>
    </div>
  </div>
</template>

<script>
import metricsDef from '~/definitions/overall-metrics'
import SelectionsMixin from '~/mixins/SelectionsMixin'
import MetricsMixin from '~/mixins/MetricsMixin.vue'
// import Columns from '~sdp-components/PageElements/Columns'
// import Column from '~sdp-components/PageElements/Column'
import Heading from '~sdp-components/PageElements/Heading'
import Content from '~sdp-components/PageElements/Content'
import Square from '~sdp-components/PageElements/Square'
import TargetChart from '~/components/TargetChart'

export default {
  name: 'Overview',
  components: {
    // Columns,
    // Column,
    Square,
    Heading,
    Content,
    TargetChart,
  },
  mixins: [SelectionsMixin, MetricsMixin],
  data() {
    return {
      print: false,
      goal: 2,
      indicators: ['Goal 2'],
      values: null,
      footnotes: null,
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

    // all the metrics we need for displays here
    metricCycleKeys() {
      return [
        'Winter|2020-2021|1|Goal 1|PSSA|All|All|proficient_advanced|PSSA',
        'Winter|2020-2021|1|1.1|Aimsweb|All|All|at_grade|Fall',
        'Winter|2020-2021|1|1.1|Aimsweb|All|All|at_grade|Winter',
        'Winter|2020-2021|1|1.1|Aimsweb|All|All|at_grade|Spring',
        'Fall|2020-2021|2|Goal 2|PSSA|All|All|proficient_advanced|PSSA',
        'Fall|2020-2021|2|2.1|Aimsweb|All|All|at_grade|Fall',
        'Fall|2020-2021|2|2.1|Aimsweb|All|All|at_grade|Winter',
        'Fall|2020-2021|2|2.1|Aimsweb|All|All|at_grade|Spring',
        'Winter|2020-2021|3|Goal 3|PSSA|All|All|proficient_advanced|PSSA',
        'Winter|2020-2021|3|3.1|Aimsweb|All|All|at_grade|Fall',
        'Winter|2020-2021|3|3.1|Aimsweb|All|All|at_grade|Winter',
        'Winter|2020-2021|3|3.1|Aimsweb|All|All|at_grade|Spring',
        'Winter|2020-2021|4|Goal 4|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Keystone',
        'Winter|2020-2021|4|4.1|STAR|All|All|at_grade|Fall',
        'Winter|2020-2021|4|4.1|STAR|All|All|at_grade|Winter',
        'Winter|2020-2021|4|4.1|STAR|All|All|at_grade|Spring',
        'Winter|2020-2021|4|4.3|Keystone (Algebra, Literature, Biology)|All|All|proficient_advanced|Spring',
      ]
    },

    /** Aliases for store */
    year() {
      return this.$store.state.year_c
    },
    currentCycle() {
      return this.$store.state.cycle_c
    },
  },
  async created() {
    const metricsSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
      metricsDef(this.metricCycleKeys)
    )
    this.values = await this.$qlik.getValuesFromHypercubeObject(
      metricsSessionObject
    )
    await this.$qlik.destroySessionObject(metricsSessionObject)
  },
  methods: {},
}
</script>
