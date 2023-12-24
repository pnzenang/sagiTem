import { useState } from 'react';
import BarChart from './BarChart';
import AreaCharts from './AreaCharts';

const ChartContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <div className='pt-10 text-center w-full '>
      <h4 className='text-2xl capitalize '> membership snapshot</h4>
      <button
        type='button'
        onClick={() => setBarChart(!barChart)}
        className='text-cyan-600 font-bold  text-center text-xl '
      >
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaCharts data={data} />}
    </div>
  );
};
export default ChartContainer;
