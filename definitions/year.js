export default {
  qInfo: { qType: 'visualization' },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['SchoolYear'],
          qFieldLabels: ['SchoolYear'],
        },
        qNullSuppression: true,
      },
    ],
    qInitialDataFetch: [{ qWidth: 2, qHeight: 100 }],
  },
}
