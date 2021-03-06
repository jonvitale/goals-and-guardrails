export const state = () => ({
  years: [],
  years_all: [],
  year_c: 2020,
  cycle_c: 'Fall',
  // IMPORTANT: order the following so that the most current  is last
  targetGroupSourceCycles: {
    goal1: [
      {
        value: 'Fall|2020-2021',
        label: 'Fall 2020',
        cycle: 'Fall',
        off_track: 73,
        near_track: 73,
        on_track: 22,
      },
      {
        value: 'Winter|2020-2021',
        label: 'Winter 2020',
        cycle: 'Winter',
        off_track: 75,
        near_track: 75,
        on_track: 17,
      },
    ],
    goal2: [
      {
        value: 'Fall|2020-2021',
        label: 'Fall 2020',
        cycle: 'Fall',
        off_track: 63,
        near_track: 64,
        on_track: 21,
      },
    ],
    goal3: [
      {
        value: 'Fall|2020-2021',
        label: 'Fall 2020',
        cycle: 'Fall',
        off_track: 76,
        near_track: 76,
        on_track: 16,
      },
      {
        value: 'Winter|2020-2021',
        label: 'Winter 2020',
        cycle: 'Winter',
        off_track: 75,
        near_track: 75,
        on_track: 18,
      },
    ],
    goal4: [
      {
        value: 'Fall|2020-2021',
        label: 'Fall 2020',
        cycle: 'Fall',
        off_track: 23,
        near_track: 24,
        on_track: 5,
      },
      {
        value: 'Winter|2020-2021',
        label: 'Winter 2020',
        cycle: 'Winter',
        off_track: 36,
        near_track: 9,
        on_track: 7,
      },
    ],
  },
})

const yearToYearEnd = (year) => parseInt(year.substr(-4))
// const yearToYearShort = year => `${year.substr(0, 4)}-${year.substr(-2)}`
const yearEndToSchoolYear = (yearEnd) =>
  yearEnd ? `${yearEnd - 1}-${yearEnd}` : '-'
const yearEndToSY = (yearEnd) =>
  yearEnd ? `${yearEnd - 1}-${yearEnd - 2000}` : '-'
const yearsToYearEndCurrent = (years) =>
  years
    .map((y) => yearToYearEnd(y))
    .reduce((prev, cur) => Math.max(cur, prev || -Infinity), null)
const yearsToYearEndNext = (years) => yearsToYearEndCurrent(years) + 1
const yearsToYearEndPrevious = (years) =>
  years
    .map((y) => yearToYearEnd(y))
    .filter((y) => y < yearsToYearEndCurrent(years))
    .reduce((prev, cur) => Math.max(cur, prev || -Infinity), null)
const yearsToYearEndPrevious2 = (years) =>
  years
    .map((y) => yearToYearEnd(y))
    .filter((y) => y < yearsToYearEndPrevious(years))
    .reduce((prev, cur) => Math.max(cur, prev || -Infinity), null)
const yearsToYearEndPrevious3 = (years) =>
  years
    .map((y) => yearToYearEnd(y))
    .filter((y) => y < yearsToYearEndPrevious2(years))
    .reduce((prev, cur) => Math.max(cur, prev || -Infinity), null)
const yearsToYearEndPrevious4 = (years) =>
  years
    .map((y) => yearToYearEnd(y))
    .filter((y) => y < yearsToYearEndPrevious3(years))
    .reduce((prev, cur) => Math.max(cur, prev || -Infinity), null)

export const getters = {
  // of the currently available years (determined by filters)
  yearend_c: (state) => yearsToYearEndCurrent(state.years),
  yearend_f: () => 2026,
  yearend_n: (state) => yearsToYearEndNext(state.years),
  yearend_p: (state) => yearsToYearEndPrevious(state.years),
  yearend_p2: (state) => yearsToYearEndPrevious2(state.years),
  yearend_p3: (state) => yearsToYearEndPrevious3(state.years),
  schoolyear_c: (state) =>
    yearEndToSchoolYear(yearsToYearEndCurrent(state.years)),
  schoolyear_f: () => '2025-2026',
  schoolyear_n: (state) => yearEndToSchoolYear(yearsToYearEndNext(state.years)),
  schoolyear_p: (state) =>
    yearEndToSchoolYear(yearsToYearEndPrevious(state.years)),
  schoolyear_p2: (state) =>
    yearEndToSchoolYear(yearsToYearEndPrevious2(state.years)),
  schoolyear_p3: (state) =>
    yearEndToSchoolYear(yearsToYearEndPrevious3(state.years)),
  sy_c: (state) => yearEndToSY(yearsToYearEndCurrent(state.years)),
  sy_f: () => '2025-26',
  sy_n: (state) => yearEndToSY(yearsToYearEndNext(state.years)),
  sy_p: (state) => yearEndToSY(yearsToYearEndPrevious(state.years)),
  sy_p2: (state) => yearEndToSY(yearsToYearEndPrevious2(state.years)),
  sy_p3: (state) => yearEndToSY(yearsToYearEndPrevious3(state.years)),
  sy_p4: (state) => yearEndToSY(yearsToYearEndPrevious4(state.years)),

  // of all possible years
  yearend_c_all: (state) => yearsToYearEndCurrent(state.years_all),
  yearend_f_all: () => 2026,
  yearend_n_all: (state) => yearsToYearEndNext(state.years_all),
  yearend_p_all: (state) => yearsToYearEndPrevious(state.years_all),
  yearend_p2_all: (state) => yearsToYearEndPrevious2(state.years_all),
  yearend_p3_all: (state) => yearsToYearEndPrevious3(state.years_all),
  schoolyear_c_all: (state) =>
    yearEndToSchoolYear(yearsToYearEndCurrent(state.years_all)),
  schoolyear_f_all: () => '2025-2026',
  schoolyear_n_all: (state) =>
    yearEndToSchoolYear(yearsToYearEndNext(state.years_all)),
  schoolyear_p_all: (state) =>
    yearEndToSchoolYear(yearsToYearEndPrevious(state.years_all)),
  schoolyear_p2_all: (state) =>
    yearEndToSchoolYear(yearsToYearEndPrevious2(state.years_all)),
  schoolyear_p3_all: (state) =>
    yearEndToSchoolYear(yearsToYearEndPrevious3(state.years_all)),
  sy_c_all: (state) => yearEndToSY(yearsToYearEndCurrent(state.years_all)),
  sy_f_all: () => '2025-26',
  sy_n_all: (state) => yearEndToSY(yearsToYearEndNext(state.years_all)),
  sy_p_all: (state) => yearEndToSY(yearsToYearEndPrevious(state.years_all)),
  sy_p2_all: (state) => yearEndToSY(yearsToYearEndPrevious2(state.years_all)),
  sy_p3_all: (state) => yearEndToSY(yearsToYearEndPrevious3(state.years_all)),
}

export const mutations = {
  set_years(state, val) {
    state.years = val
  },
  set_years_all(state, val) {
    state.years_all = val
  },
}

export const actions = {
  set_years({ state, commit }, values) {
    let years
    // if there are no values for year we reset to all
    if (values.SchoolYear) {
      years = values.SchoolYear.map(({ text }) => text)
    } else {
      years = state.years_all
    }
    commit('set_years', years)
  },
  set_years_all({ commit }, values) {
    const years = values.SchoolYear.map(({ text }) => text)
    commit('set_years_all', years)
    // since the currently available years must be a subset of all years set these
    commit('set_years', years)
  },
}
