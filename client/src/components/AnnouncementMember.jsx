import { AiOutlineFieldNumber } from 'react-icons/ai';
import { FaRegCalendarAlt, FaRegCalendarCheck } from 'react-icons/fa';
import { BsInfoSquare, BsFillInfoSquareFill } from 'react-icons/bs';

import {
  Link,
  Form,
  useNavigation,
  redirect,
  useOutletContext,
} from 'react-router-dom';
import MemberInfo from './MemberInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { styled } from 'styled-components';

day.extend(advancedFormat);

const AnnouncementMember = ({
  _id,
  firstName,
  lastAndMiddleNames,
  memberMatriculation,
  associationName,
  associationCode,
  createdAt,
  delegateRecommendation,
  memberStatus,
  borderColor,
}) => {
  const date = day(createdAt).format('MMM Do, YYYY');
  const { user } = useOutletContext();
  const temps = day(createdAt).add(90, 'd').format('MMM Do, YYYY');
  const time = day(Date.now());
  const tod = day(createdAt.toString());
  const m = time.diff(tod, 'days');
  const matriculationSituation =
    memberStatus === 'pending' || m < 90 ? 'pending' : memberMatriculation;

  memberStatus === 'vested' && delegateRecommendation === 'deceased' && m >= 90
    ? (borderColor = 'border-purple-600')
    : m >= 90 && delegateRecommendation === 'confirm'
    ? (borderColor = 'border-green-500')
    : delegateRecommendation === 'remove'
    ? (borderColor = 'border-red-600 ')
    : delegateRecommendation === 'deceased'
    ? (borderColor = 'border-purple-600 ')
    : delegateRecommendation === 'transfer'
    ? (borderColor = 'border-blue-500 ')
    : (borderColor = 'border-amber-400');

  return (
    <div
      className={`col-span-1 divide-y divide-primary  bg-base-200 hover:bg-base-300  rounded border-t-8 ${borderColor} px-2 shadow`}
    >
      <div className='flex w-full items-center justify-between space-x-6 p-2'>
        <div className='inline-flex items-center rounded-md bg-base-100 px-1 py-1 text-4xl font-medium text-primary ring-1 ring-inset uppercase '>
          {associationCode}
        </div>
        <div className='flex-1 truncate'>
          <div className='flex items-center space-x-3 capitalize'>
            <h3 className='truncate text-2xl '>
              {firstName} {lastAndMiddleNames}
            </h3>
          </div>
          <p className='mt-1 truncate text-xs capitalize '>{associationName}</p>
        </div>
      </div>
      <div className='grid grid-cols-2 p-3'>
        <div className='text-md  flex pb-2 capitalize'>
          <MemberInfo
            icon={<AiOutlineFieldNumber />}
            text={matriculationSituation}
          />
        </div>

        <div className='text-base  flex py-2 truncate capitalize'>
          <MemberInfo icon={<BsInfoSquare />} text={delegateRecommendation} />
        </div>

        <div className='text-base flex py-2 '>
          <MemberInfo icon={<FaRegCalendarAlt />} text={date} />
        </div>

        <div className='text-base  flex py-2'>
          <MemberInfo icon={<FaRegCalendarCheck />} text={temps} />
        </div>

        <div className='text-base flex py-2 capitalize'>
          <MemberInfo icon={<BsFillInfoSquareFill />} text={memberStatus} />
        </div>

        <div className=' flex py-2 gap-2'>
          <Link
            to={`/dashboard/death-announcement/${_id}`}
            className='btn-xm bg-secondary rounded capitalize px-2 py-1 truncate text-white'
          >
            announce dead
          </Link>
        </div>
      </div>
    </div>
    // </Wrapper>
  );
};
const Wrapper = styled.section``;
export default AnnouncementMember;
