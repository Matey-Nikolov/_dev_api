import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationComponent({ currentPage, itemsPerPage, totalItems, setCurrentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
        {i}
      </Pagination.Item>,
    );
  };

  return (
    <Pagination className="justify-content-center">
        {pageNumbers}
    </Pagination>
  );
}

export default PaginationComponent;