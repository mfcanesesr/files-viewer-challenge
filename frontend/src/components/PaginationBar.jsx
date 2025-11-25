import React from 'react';
import styled from 'styled-components';
import { Row, Col, Pagination } from 'react-bootstrap';

const PaginationRow = styled(Row)`
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: 1.25rem;
  padding-top: 0.75rem;
`;

const InfoText = styled.span`
  font-size: 0.78rem;
  color: ${(p) => p.theme.colors.textMuted};
`;

const Nav = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const StyledPagination = styled(Pagination)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  .page-item {
    margin: 0 1px;
  }

  .page-link {
    border-radius: ${(p) => p.theme.radius.pill};
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.04);
    color: ${(p) => p.theme.colors.textMain};
    font-size: 0.78rem;
    padding: 0.2rem 0.7rem;
    min-width: 34px;
    cursor: pointer;
    transition: all 0.12s ease;
  }

  .page-link:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    text-decoration: none;
  }

  .page-item.active .page-link {
    background: ${(p) =>
      p.theme.colors.toolBox2 || p.theme.colors.primary};
    border-color: ${(p) =>
      p.theme.colors.toolBox2 || p.theme.colors.primary};
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.45);
  }

  .page-item.disabled .page-link {
    opacity: 0.5;
    cursor: default;
    background: rgba(255, 255, 255, 0.03);
  }
`;

export function PaginationBar({
  totalRows,
  rowsPerPage,
  currentPage,
  onChangePage,
}) {
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const safeCurrent = Math.min(currentPage, totalPages);

  const start = totalRows === 0 ? 0 : (safeCurrent - 1) * rowsPerPage + 1;
  const end = Math.min(safeCurrent * rowsPerPage, totalRows);

  const pages = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pages.push(i);
  }

  const goTo = (page) => {
    if (page < 1 || page > totalPages) return;
    onChangePage(page);
  };

  return (
    <PaginationRow className="align-items-center">
      <Col xs={12} md={6} className="mb-2 mb-md-0">
        <InfoText>
          Showing {start || 0}–{end || 0} of {totalRows} rows
        </InfoText>
      </Col>
      <Col
        xs={12}
        md={6}
        className="d-flex justify-content-md-end justify-content-start"
      >
        <Nav>
          <StyledPagination size="sm">
            <Pagination.Prev
              onClick={() => goTo(safeCurrent - 1)}
              disabled={safeCurrent === 1}
            >
              ‹ Previous
            </Pagination.Prev>

            {pages.map((p) => (
              <Pagination.Item
                key={p}
                active={p === safeCurrent}
                onClick={() => goTo(p)}
              >
                {p}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => goTo(safeCurrent + 1)}
              disabled={safeCurrent === totalPages}
            >
              Next ›
            </Pagination.Next>
          </StyledPagination>
        </Nav>
      </Col>
    </PaginationRow>
  );
}