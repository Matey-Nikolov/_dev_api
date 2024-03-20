import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationComponent({ currentPage, itemsPerPage, totalItems, setCurrentPage }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    
    if (totalPages > 8 && (i !== 1 && i !== totalPages && Math.abs(currentPage - i) > 2)) 
      continue;

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