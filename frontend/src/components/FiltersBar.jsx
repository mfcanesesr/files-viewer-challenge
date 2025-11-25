import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const RoundedSelect = styled(Form.Select)`
  border-radius: ${(p) => p.theme.radius.pill};
  border-color: #e0e3f0;
  font-size: 0.86rem;

  &:focus {
    border-color: ${(p) => p.theme.colors.text};
    box-shadow: 0 0 0 0.15rem #4f46e526;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 220px;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.78rem;
  color: #a1a6bc;
`;

const SearchInput = styled(Form.Control)`
  border-radius: ${(p) => p.theme.radius.pill};
  border-color: #e0e3f0;
  font-size: 0.86rem;
  padding-left: 26px;

  &:focus {
    border-color: ${(p) => p.theme.colors.primary};
    box-shadow: 0 0 0 0.15rem rgba(79, 70, 229, 0.15);
  }
`;

export function FiltersBar({
  files,
  loadingFiles,
  selectedFile,
  onChangeFile,
  search,
  onChangeSearch
}) {
  return (
    <>
      <RoundedSelect
        value={selectedFile}
        onChange={(e) => onChangeFile(e.target.value)}
        style={{ maxWidth: 220 }}
      >
        <option value="">
          {loadingFiles ? 'Loading files...' : 'All files'}
        </option>
        {files.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </RoundedSelect>

      <SearchWrapper>
        <SearchIcon>⌕</SearchIcon>
        <SearchInput
          type="search"
          placeholder="Search text..."
          value={search}
          onChange={(e) => onChangeSearch(e.target.value)}
        />
      </SearchWrapper>
    </>
  );
}
