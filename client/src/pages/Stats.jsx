import { useLoaderData } from 'react-router-dom';
import { ChartContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';

export const loader = async () => {
  try {
    const response = await customFetch.get('/members/stats');
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications, delegateDefaultStats } =
    useLoaderData();

  return (
    <div className='w-full'>
      <StatsContainer
        defaultStats={defaultStats}
        delegateDefaultStats={delegateDefaultStats}
      />
      {monthlyApplications?.length > 1 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </div>
  );
};
export default Stats;
