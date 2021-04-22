export const state = () => ({
  current_selections: {},
})

export const getters = {
  anySelections(state) {
    return Object.keys(state.current_selections)?.length > 0 || false
  },
}

export const mutations = {
  set_current_selections_in_field(state, { field, selections }) {
    if (selections !== undefined) {
      state.current_selections[field] = selections
    } else {
      delete state.current_selections[field]
    }
  },
}

export const actions = {
  async set_current_selections_in_field(
    { state, commit, dispatch },
    { field, selections }
  ) {
    commit('set_current_selections_in_field', { field, selections })

    // for the special case where the year is selected, set the values in the top-level
    if (field === 'SchoolYear') {
      await dispatch('set_years', selections, { root: true })
    }
  },

  async set_current_selections({ state, commit, dispatch }, selectionsByField) {
    // add any fields that had selections, but now do no not, so they can be removed from state
    const currentFields = Object.keys(selectionsByField)
    const previousFieldsToAdd = Object.keys(state.current_selections).filter(
      (field) =>
        state.current_selections[field] && !currentFields.includes(field)
    )
    previousFieldsToAdd.forEach(
      (field) => (selectionsByField[field] = undefined)
    )

    // for each field in the selections update the stored object
    let field, selections
    for (field in selectionsByField) {
      selections = selectionsByField[field]
      commit('set_current_selections_in_field', { field, selections })

      // for the special case where the year is selected, set the values in the top-level
      if (field === 'SchoolYear') {
        await dispatch('set_years', { Year: selections }, { root: true })
      }
    }
  },
}
