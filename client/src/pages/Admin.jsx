import { FaSuitcaseRolling } from 'react-icons/fa';
import { FaUsersRectangle, FaUsers } from 'react-icons/fa6';
import { FaCircleCheck } from 'react-icons/fa6';
import { GiConfirmed } from 'react-icons/gi';
import { BiTransfer } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { ImSad } from 'react-icons/im';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';

import { toast } from 'react-toastify';
import { StatItem } from '../components';
export const loader = async () => {
  try {
    const response = await customFetch.get('/users/admin/app-stats');
    return response.data;
  } catch (error) {
    toast.error('Unauthorized to access this page');
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const {
    users,
    vestedMembers,
    pendingMembers,
    confirmedMembers,
    membersToRemove,
    membersToTransfer,
    deceasedMembers,
  } = useLoaderData();
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 pt-6 '>
      <StatItem
        title='active associations'
        count={users}
        icon={<FaUsersRectangle />}
        bcg='bg-base-100'
        borderColor='border-primary'
        color='text-primary'
      />
      <StatItem
        title='total membership'
        count={vestedMembers + pendingMembers}
        icon={<FaUsers />}
        bcg='bg-base-100'
        borderColor='border-primary'
        color='text-primary'
      />
      <StatItem
        title='vested members'
        count={vestedMembers}
        icon={<FaCircleCheck />}
        bcg='bg-green-100'
        borderColor='border-green-700'
        color='text-green-700'
      />
      <StatItem
        title='pending matriculations'
        count={pendingMembers}
        icon={<FaSuitcaseRolling />}
        bcg='bg-amber-100'
        borderColor='border-amber-500'
        color='text-amber-500'
      />
      <StatItem
        title='confirmed applications'
        count={confirmedMembers}
        icon={<GiConfirmed />}
        bcg='bg-cyan-100'
        borderColor='border-cyan-500'
        color='text-cyan-500'
      />
      <StatItem
        title='members to be removed'
        count={membersToRemove}
        icon={<RiDeleteBin5Line />}
        bcg='bg-red-100'
        borderColor='border-red-500'
        color='text-red-500'
      />
      <StatItem
        title='members to be transferred'
        count={membersToTransfer}
        icon={<BiTransfer />}
        bcg='bg-blue-100'
        borderColor='border-blue-500'
        color='text-blue-500'
      />
      <StatItem
        title='members to be transferred'
        count={deceasedMembers}
        icon={<ImSad />}
        bcg='bg-violet-100'
        borderColor='border-violet-500'
        color='text-violet-500'
      />
    </div>
  );
};
export default Admin;
