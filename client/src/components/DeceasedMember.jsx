import { AiOutlineFieldNumber } from 'react-icons/ai';
import { FaRegCalendarAlt, FaRegCalendarCheck } from 'react-icons/fa';
import { BsInfoSquare, BsFillInfoSquareFill } from 'react-icons/bs';
import image from '../assets/person.png';
import { Link, Form, useOutletContext } from 'react-router-dom';
import MemberInfo from './MemberInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { styled } from 'styled-components';
import { deathAnnouncement, comfortMessage } from '../utils/constants';

day.extend(advancedFormat);

const DeceasedMember = ({
  createdAt,
  deceasedAssociationName,
  deceasedFirstName,
  deceasedLastAndMiddleNames,
  deceasedMemberMatriculation,
  dateOfDeath,
  placeOfDeath,
  deceasedRegistrationDate,
}) => {
  const dateAnnounced = day(createdAt).format('MMM Do, YYYY');
  const temps = day(createdAt).add(90, 'd').format('MMM Do, YYYY');
  dateOfDeath = day(dateOfDeath).format('MMM Do, YYYY');
  deceasedRegistrationDate = day(deceasedRegistrationDate).format(
    'MMM Do, YYYY'
  );
  const time = day(Date.now());
  const tod = day(createdAt.toString());
  const m = time.diff(tod, 'days');
  return (
    <div className='card p-4 bg-base-200 shadow-xl '>
      <div className=' sm:flex   items-stretch gap-4'>
        <div className='avatar flex justify-center '>
          <div className='w-52  rounded '>
            <img src={image} alt='image' className='text-primary' />
          </div>
        </div>
        <div className='z-0'>
          <div className=' sm:flex justify-between items-center mb-2'>
            <div className=''>
              <h2 className='  sm:text-2xl lg:text-4xl font-bold uppercase text-center'>
                {deceasedFirstName} {deceasedLastAndMiddleNames}:{' '}
                <span className='text-primary'>1947 ~ 2023</span>
              </h2>
            </div>
            <div className='sm:text-2xl lg:text-4xl font-bold uppercase text-center'>
              {dateAnnounced}
            </div>
          </div>
          <div className='mb-2'>
            <p>
              {deathAnnouncement[Math.floor(Math.random() * 5)]}
              <span className='uppercase font-bold px-1'>
                {deceasedFirstName} {deceasedLastAndMiddleNames}
              </span>
              which occurred on{' '}
              <span className=' font-bold uppercase'>{dateOfDeath} </span> in{' '}
              <span className=' font-bold uppercase'>{placeOfDeath}.</span>
            </p>
          </div>
          <div className='mb-2'>
            <p>
              <span className='uppercase font-bold pr-1'>
                {deceasedFirstName} {deceasedLastAndMiddleNames}
              </span>
              was an unconditional SAGI member since{' '}
              <span className=' font-bold pr-1 uppercase'>
                {deceasedRegistrationDate}
              </span>{' '}
              and before leaving us,{' '}
              <span className='uppercase font-bold px-1'>
                {deceasedFirstName} {deceasedLastAndMiddleNames}
              </span>{' '}
              was affiliated to the association:
              <span className='uppercase font-bold px-1'>
                {deceasedAssociationName}
              </span>
              under the matriculation:
              <span className=' font-bold px-1'>
                {deceasedMemberMatriculation}.
              </span>
            </p>
          </div>
          <p>
            {comfortMessage[Math.floor(Math.random() * 3)]}
            {/* <span className='capitalize '>
              <Link to='/' className=' text-primary'>
                read more
              </Link>
            </span> */}
          </p>
        </div>
      </div>
    </div>
  );
};
export default DeceasedMember;
