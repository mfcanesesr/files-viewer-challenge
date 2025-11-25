import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Badge, Spinner } from 'react-bootstrap';
import { LayoutCard } from './components/LayoutCard';
import { HeaderBar } from './components/HeaderBar';
import { FiltersBar } from './components/FiltersBar';
import { FilesTable } from './components/FilesTable';
import { PaginationBar } from './components/PaginationBar';
import { useFilesData } from './hooks/useFilesData';

const ErrorAlert = styled.div`
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => p.theme.colors.dangerBg};
  border: 1px solid ${(p) => p.theme.colors.dangerBorder};
  color: ${(p) => p.theme.colors.dangerText};
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
`;

const FileBadge = styled(Badge)`
  border-radius: ${(p) => p.theme.radius.pill};
  padding: 0.22rem 0.7rem;
  border: 1px solid #e4e6f2;
  background: #f9fafb;
  color: ${(p) => p.theme.colors.textMain};
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 500;
`;

const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => p.theme.colors.accent};
`;

function App() {
  const [selectedFile, setSelectedFile] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const {
    files,
    rows,
    activeFileName,
    loading,
    loadingFiles,
    error
  } = useFilesData(selectedFile);

  // filtrar por texto
  const filteredRows = useMemo(() => {
    if (!search) return rows;
    const lower = search.toLowerCase();
    return rows.filter((r) => r.text.toLowerCase().includes(lower));
  }, [rows, search]);

  // resetear página cuando cambian filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedFile]);

  // paginación
  const totalRows = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  return (
    <LayoutCard>
      <HeaderBar
        rightContent={
          <FiltersBar
            files={files}
            loadingFiles={loadingFiles}
            selectedFile={selectedFile}
            onChangeFile={setSelectedFile}
            search={search}
            onChangeSearch={setSearch}
          />
        }
      />

      {/* Badges + loader */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          {activeFileName && (
            <FileBadge bg="light" text="dark">
              <Dot />
              <span>{activeFileName}</span>
            </FileBadge>
          )}
        </div>
        <div>
          {loading && (
            <span className="text-muted small">
              <Spinner animation="border" size="sm" className="me-2" />
              Loading data...
            </span>
          )}
        </div>
      </div>

      {/* Error */}
      {error && <ErrorAlert>{error}</ErrorAlert>}

      {/* Tabla */}
      <FilesTable rows={paginatedRows} loading={loading} />

      {/* Paginación */}
      <PaginationBar
        totalRows={totalRows}
        rowsPerPage={rowsPerPage}
        currentPage={safePage}
        onChangePage={setCurrentPage}
      />
    </LayoutCard>
  );
}

export default App;
