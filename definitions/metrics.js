export default function (goal, indicators, sourceCycle) {
  sourceCycle = sourceCycle || 'Fall|2020-2021'
  const i = indicators ? indicators.map((v) => `"${v}"`).toString() : '"*"'
  const set = `{<[Goal]={'${goal}'}, [Indicator]={${i}}, [SourceCycle]={'${sourceCycle}'}>}`
  const setCY = `{<[Goal]={'${goal}'}, [Indicator]={${i}}, [SourceCycle]={'${sourceCycle}'}, [flag_cy]={1}>}`
  const setPY = `{<[Goal]={'${goal}'}, [Indicator]={${i}}, [SourceCycle]={'${sourceCycle}'}, [flag_py]={1}>}`
  const setPY2 = `{<[Goal]={'${goal}'}, [Indicator]={${i}}, [SourceCycle]={'${sourceCycle}'}, [flag_py2]={1}>}`
  const setPY3 = `{<[Goal]={'${goal}'}, [Indicator]={${i}}, [SourceCycle]={'${sourceCycle}'}, [flag_py3]={1}>}`
  const setPY4 = `{<[Goal]={'${goal}'}, [Indicator]={${i}}, [SourceCycle]={'${sourceCycle}'}, [flag_py4]={1}>}`

  const qDimensions = [
    {
      qDef: {
        qFieldDefs: ['MetricCycleKey'],
        qFieldLabels: ['metricCycleKey'],
      },
      qNullSuppression: true,
    },
  ]
  const qMeasures = [
    {
      qDef: {
        qDef: `
          if(flag_na = 1 or flag_is = 1 or flag_fc = 1,
            Only(${setCY} [Score]),
            if(flag_pct = 1,
              Num(Only(${setCY} [Score]), '#0.#%'),
              Num(Only(${setCY} [Score]), '#,##0')
            ))
        `,
        qLabel: 'scoreCY',
      },
    },
    {
      qDef: {
        qDef: `
          if(flag_na = 1 or flag_is = 1 or flag_fc = 1,
            Only(${setPY} [Score]),
            if(flag_pct = 1,
              Num(Only(${setPY} [Score]), '#0.#%'),
              Num(Only(${setPY} [Score]), '#,##0')
            ))
        `,
        qLabel: 'scorePY',
      },
    },
    {
      qDef: {
        qDef: `
          if(flag_na = 1 or flag_is = 1 or flag_fc = 1,
            Only(${setPY2} [Score]),
            if(flag_pct = 1,
              Num(Only(${setPY2} [Score]), '#0.#%'),
              Num(Only(${setPY2} [Score]), '#,##0')
            ))
        `,
        qLabel: 'scorePY2',
      },
    },
    {
      qDef: {
        qDef: `
          if(flag_na = 1 or flag_is = 1 or flag_fc = 1,
            Only(${setPY3} [Score]),
            if(flag_pct = 1,
              Num(Only(${setPY3} [Score]), '#0.#%'),
              Num(Only(${setPY3} [Score]), '#,##0')
            ))
        `,
        qLabel: 'scorePY3',
      },
    },
    {
      qDef: {
        qDef: `
          if(flag_na = 1 or flag_is = 1 or flag_fc = 1,
            Only(${setPY4} [Score]),
            if(flag_pct = 1,
              Num(Only(${setPY4} [Score]), '#0.#%'),
              Num(Only(${setPY4} [Score]), '#,##0')
            ))
        `,
        qLabel: 'scorePY4',
      },
    },
    {
      qDef: {
        qDef: `Num(Only(${set} [Annual Target]), '#0.#%')`,
        qLabel: 'target',
      },
    },
    {
      qDef: {
        qDef: `Num(Only(${set} [Next Annual Target]), '#0.#%')`,
        qLabel: 'nextTarget',
      },
    },
    {
      qDef: {
        qDef: `Num(Only(${set} [Final Target]), '#0.#%')`,
        qLabel: 'finalTarget',
      },
    },
  ]

  return {
    qInfo: { qType: 'visualization' },
    qHyperCubeDef: {
      qDimensions,
      qMeasures,
      qInitialDataFetch: [{ qWidth: 10, qHeight: 1000 }],
      qSuppressZero: true,
    },
  }
}
