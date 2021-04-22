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
        qDef: `Only(${setCY} [ss_SchoolYear])`,
        qLabel: 'ssSchoolYearCY',
      },
    },
    {
      qDef: {
        qDef: `Only(${setPY} [ss_SchoolYear])`,
        qLabel: 'ssSchoolYearPY',
      },
    },
    {
      qDef: {
        qDef: `Only(${setPY2} [ss_SchoolYear])`,
        qLabel: 'ssSchoolYearPY2',
      },
    },
    {
      qDef: {
        qDef: `Only(${setPY3} [ss_SchoolYear])`,
        qLabel: 'ssSchoolYearPY3',
      },
    },
    {
      qDef: {
        qDef: `Only(${setPY4} [ss_SchoolYear])`,
        qLabel: 'ssSchoolYearPY4',
      },
    },
    {
      qDef: {
        qDef: `Only(${setCY} [ss_Score])`,
        qLabel: 'ssScoreCY',
      },
    },
    {
      qDef: {
        qDef: `Only(${setPY} [ss_Score])`,
        qLabel: 'ssScorePY',
      },
    },
    {
      qDef: {
        qDef: `Only(${setPY2} [ss_Score])`,
        qLabel: 'ssScorePY2',
      },
    },
    {
      qDef: {
        qDef: `Dual(MaxString(${set} [ss_Group]), Max(${set} [ss_Group]))`,
        qLabel: 'ssGroup',
      },
    },
    {
      qDef: {
        qDef: `Dual(MaxString(${set} [ss_Metric]), Max(${set} [ss_Metric]))`,
        qLabel: 'ssMetric',
      },
    },
    {
      qDef: {
        qDef: `Dual(MaxString(${set} [ss_MetricGroup]), Max(${set} [ss_MetricGroup]))`,
        qLabel: 'ssMetricGroup',
      },
    },
    // this is rare
    {
      qDef: {
        qDef: `Dual(MaxString(${setPY} [ss_MetricGroup]), Max(${setPY} [ss_MetricGroup]))`,
        qLabel: 'ssMetricGroupPY',
      },
    },
    {
      qDef: {
        qDef: `Dual(MaxString(${set} [ss_Distance]), Max(${set} [ss_Distance]))`,
        qLabel: 'ssDistance',
      },
    },
    {
      qDef: {
        qDef: `Dual(MaxString(${set} [ss_TargetGroup]), Max(${set} [ss_TargetGroup]))`,
        qLabel: 'ssTargetGroup',
      },
    },
    {
      qDef: {
        qDef: `Dual(MaxString(${set} [ss_Cycle]), Max(${set} [ss_Cycle]))`,
        qLabel: 'ssCycle',
      },
    },
  ]

  return {
    qInfo: { qType: 'visualization' },
    qHyperCubeDef: {
      qDimensions,
      qMeasures,
      qInitialDataFetch: [{ qWidth: 16, qHeight: 625 }],
    },
  }
}
