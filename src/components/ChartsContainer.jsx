import React, { useState } from 'react'

import BarChart from './BarChart'
import AreaChart from './AreaChart'
import Wrapper from '../assets/wrappers/ChartsContainer'
import { useSelector } from 'react-redux'
import useSelection from 'antd/es/table/hooks/useSelection'

const ChartsContainer = () => {
	const [barChart, setBarChart] = useState(true)
	const { monthlyApplications: data } = useSelector(store => store.allJobs)
	return <Wrapper>
    <h4>monthly applications</h4>
    <button type="button" onClick={()=> setBarChart(!barChart)}>
      {barChart ? 'area chart' : 'bar chart'}
    </button>
    {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
  </Wrapper>
}
export default ChartsContainer
