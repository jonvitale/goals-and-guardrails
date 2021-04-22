<template>
  <div class="text-base">
    <div class="w-full text-center text-xl font-bold">Overview</div>
    <div>
      <p class="p-4">
        The School District of Philadelphia Board of Education, Progress
        Monitoring Report displays performance on the District's Goals and
        Guardrails.
        <br />
        <br />
        For details please visit
        <a
          href="https://www.philasd.org/era/goals-and-guardrails/"
          target="_blank"
          class="w-full text-center underline text-blue-500"
        >
          www.philasd.org/era/goals-and-guardrails</a
        >.
        <br />
        You may also view the
        <a
          href="https://www.philasd.org/era/goals-and-guardrails/progress-monitoring-calendar-2021/"
          target="_blank"
          class="w-full text-center underline text-blue-500"
        >
          progress monitoring calendar
        </a>
        for more details about forthcoming data.
      </p>
      <br />
    </div>
    <div class="w-full text-center text-xl font-bold">Website Color Values</div>
    <div class="flex justify-center mb-2">
      <div class="w-2/3 p-4 pt-8">
        <p>
          On each page an <span> Overall Progress </span> text box will display
          the current progress towards the goal in one of three categories:
        </p>
        <br />
        <ul class="pl-4">
          <li class="mb-2">
            <span
              class="px-1 mr-1 bg-off_track text-contrast-off_track font-bold"
            >
              Off-Track:</span
            >Off Track indicates that the District is far from meeting its
            annual performance goal, defined as performance that is greater than
            ten percentage points away from the annual goal. The Superintendent
            may also determine the District is Off Track based on a review of
            how policies and procedures that impact student performance are
            being implemented.
          </li>
          <li class="mb-2">
            <span
              class="px-1 mr-1 bg-near_track text-contrast-near_track font-bold"
            >
              Near-Track:</span
            >Near Track indicates that the District is close to meeting its
            annual performance goal, defined as performance that is within ten
            percentage points of the annual goal. The Superintendent may also
            determine the District is Near Track based on a review of how
            policies and procedures that impact student performance are being
            implemented.
          </li>
          <li>
            <span
              class="px-1 mr-1 bg-on_track text-contrast-on_track font-bold"
            >
              On-Track:</span
            >On Track indicates that the District is meeting or exceeding its
            annual performance goal. The Superintendent may also determine the
            District is On Track based on a review of how policies and
            procedures that impact student performance are being implemented.
            Through meeting its annual goals, the District will be on track to
            meet the 2025-26 Goals.
          </li>
        </ul>
      </div>
      <color-key
        show-overall
        :show-distance="false"
        :show-score="false"
        class="w-1/3"
      />
    </div>
    <div class="flex justify-center mb-2">
      <p class="w-2/3 p-4 pt-8">
        On tables some columns will display the distance between a score and a
        target.
        <span class="bg-contrast-off_track text-off_track font-bold"
          >Red negative values</span
        >
        indicate that the district has not reached the target, while
        <span class="bg-contrast-on_track text-on_track font-bold"
          >blue positive values</span
        >
        indicate that the district has reached the target.
      </p>
      <color-key
        :show-overall="false"
        show-distance
        :show-score="false"
        class="w-1/3"
      />
    </div>
    <div class="flex justify-center mb-2">
      <p class="w-2/3 p-4 pt-8">
        On tables some columns display the current scores on a background color
        scale ranging from red (very low score) to blue (at or above target).
      </p>
      <color-key
        :show-overall="false"
        :show-distance="false"
        show-score
        class="w-1/3"
      />
    </div>
  </div>
</template>
<script>
import ColorKey from '~/components/ColorKey'

export default {
  components: {
    ColorKey,
  },
}
</script>
