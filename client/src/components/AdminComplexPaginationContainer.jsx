import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import styled from 'styled-components';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAdminAllMembersContext } from '../pages/AdminAllMembers';

const AdminComplexPaginationContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAdminAllMembersContext();

  const { search, pathname } = useLocation();

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn mt-2 btn-xs sm:btn-md page-btn join-item  w-8 sm:w-12 ${
          activeClass && 'bg-base-300 border-1 border-primary'
        }`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    //first page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );
    //dot
    // if (currentPage > 3) {
    //   pageButtons.push(
    //     <span className='relative inline-flex items-center md:px-4 md:py-2 text-sm font-semibold'>
    //       ...
    //     </span>
    //   );
    // }

    // //page before active page
    // if (currentPage !== 1 && currentPage !== 2) {
    //   pageButtons.push(
    //     addPageButton({
    //       pageNumber: currentPage - 1,
    //       activeClass: false,
    //     })
    //   );
    // }

    //current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }
    // //dot
    // if (currentPage < numOfPages - 2) {
    //   pageButtons.push(
    //     <span className='relative inline-flex items-center md:px-4 md:py-2 text-sm font-semibold'>
    //       ...
    //     </span>
    //   );
    // }

    // //page after active page
    // if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
    //   pageButtons.push(
    //     addPageButton({
    //       pageNumber: currentPage + 1,
    //       activeClass: false,
    //     })
    //   );
    // }

    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <div className='mt-1 flex justify-end '>
        <div className='join'>
          <button
            className='btn prev-btn bg-base-300 btn-xs sm:btn-md join-item mr-2 mt-2'
            onClick={() => {
              let prevPage = currentPage - 1;
              if (prevPage < 1) prevPage = numOfPages;
              handlePageChange(prevPage);
            }}
          >
            <HiChevronDoubleLeft />
            prev
          </button>
          <div className='btn-container '>{renderPageButtons()}</div>
          <button
            className='btn next-btn bg-base-300 btn-xs sm:btn-md join-item ml-2 mt-2'
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

export default AdminComplexPaginationContainer;
