export default function (goal) {
  const set = `{<[Goal]={'${goal}'}>}`
  const qDimensions = [
    {
      qDef: {
        qFieldDefs: ['IndicatorCategoryKey'],
        qFieldLabels: ['IndicatorCategoryKey'],
      },
      qNullSuppression: true,
    },
    {
      qDef: {
        qFieldDefs: ['Category'],
        qFieldLabels: ['Category'],
      },
      qNullSuppression: true,
    },
    {
      qDef: {
        qFieldDefs: ['What'],
        qFieldLabels: ['Text'],
      },
      qNullSuppression: true,
    },
  ]
  const qMeasures = [
    {
      qDef: {
        qDef: `Count(${set}1)`,
        qLabel: 'count',
      },
    },
  ]

  return {
    qInfo: { qType: 'visualization' },
    qHyperCubeDef: {
      qDimensions,
      qMeasures,
      qInitialDataFetch: [{ qWidth: 10, qHeight: 1000 }],
    },
  }
}
