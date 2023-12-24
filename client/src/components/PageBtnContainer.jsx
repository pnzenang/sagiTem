import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import styled from 'styled-components';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllMembersContext } from '../pages/AllMembers';

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllMembersContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <div className='mt-1 flex justify-end '>
        <div className='join'>
          <button
            className='btn prev-btn bg-base-300 btn-xs sm:btn-md join-item mr-2'
            onClick={() => {
              let prevPage = currentPage - 1;
              if (prevPage < 1) prevPage = numOfPages;
              handlePageChange(prevPage);
            }}
          >
            <HiChevronDoubleLeft />
            prev
          </button>
          <div className='btn-container'>
            {pages.map((pageNumber) => {
              return (
                <button
                  className={`btn btn-xs sm:btn-md page-btn join-item  w-8 sm:w-12 ${
                    pageNumber === currentPage && 'bg-base-300'
                  }`}
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <button
            className='btn next-btn bg-base-300 btn-xs sm:btn-md join-item ml-2'
            onClick={() => {
              let nextPage = currentPage + 1;
              if (nextPage > numOfPages) nextPage = 1;
              handlePageChange(nextPage);
            }}
          >
            next
            <HiChevronDoubleRight />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section``;

export default PageBtnContainer;
