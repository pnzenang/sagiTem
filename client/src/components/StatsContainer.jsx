import { FaSuitcaseRolling } from 'react-icons/fa';
import { FaUsersRectangle } from 'react-icons/fa6';
import { FaCircleCheck } from 'react-icons/fa6';
import { BiTransfer } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { GiConfirmed } from 'react-icons/gi';
import { ImSad } from 'react-icons/im';
import StatItem from './StatItem';

const StatsContainer = ({ defaultStats, delegateDefaultStats, data }) => {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 pt-6 '>
      <StatItem
        title='total members'
        count={defaultStats?.pending + defaultStats?.vested}
        icon={<FaUsersRectangle />}
        bcg='bg-base-100'
        borderColor='border-primary'
        color='text-primary'
      />

      <StatItem
        title='vested members'
        count={defaultStats?.vested}
        icon={<FaCircleCheck />}
        bcg='bg-green-100'
        borderColor='border-green-600'
        color='text-green-600'
      />
      <StatItem
        title='pending matriculations'
        count={defaultStats?.pending}
        icon={<FaSuitcaseRolling />}
        bcg='bg-amber-100'
        borderColor='border-amber-500'
        color='text-amber-500'
      />
      <StatItem
        title='confirmed applications'
        count={delegateDefaultStats?.confirm}
        icon={<GiConfirmed />}
        bcg='bg-cyan-100'
        borderColor='border-cyan-500'
        color='text-cyan-500'
      />
      <StatItem
        title='members to be removed'
        count={delegateDefaultStats?.remove}
        icon={<RiDeleteBin5Line />}
        bcg='bg-red-100'
        borderColor='border-red-500'
        color='text-red-500'
      />
      <StatItem
        title='members to be transferred'
        count={delegateDefaultStats?.transfer}
        icon={<BiTransfer />}
        bcg='bg-blue-100'
        borderColor='border-blue-500'
        color='text-blue-500'
      />
      <StatItem
        title='deceased members '
        count={delegateDefaultStats?.deceased}
        icon={<ImSad />}
        bcg='bg-violet-100'
        borderColor='border-violet-500'
        color='text-violet-500'
      />
    </div>
  );
};
export default StatsContainer;
