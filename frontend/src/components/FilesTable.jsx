import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

const Wrapper = styled.div`
  border-radius: 18px;
  overflow: hidden;

  background: radial-gradient(
      circle at top left,
      rgba(255, 120, 180, 0.012),
      transparent 75%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(120, 90, 255, 0.18),
      transparent 55%
    ),
    rgba(18, 10, 32, 0.1);

  backdrop-filter: blur(22px) saturate(170%);
  -webkit-backdrop-filter: blur(22px) saturate(170%);


`;

const StyledTable = styled(Table)`
  margin-bottom: 0;
  background: transparent;

  /* 🔹 color base de TODO el contenido de la tabla */
  color: rgba(255, 255, 255, 0.96);

  thead,
  tbody,
  tr,
  td,
  th {
    background-color: transparent !important;
  }

  thead th {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.6);
    ...
  }

  tbody td {
    font-size: 0.85rem;
    padding-top: 0.65rem;
    padding-bottom: 0.65rem;
    border-top: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);

    /* 🔹 aseguramos blanco en texto y number */
    color: rgba(255, 255, 255, 0.96);
  }
`;

const RowTr = styled.tr`
  transition: background-color 0.18s ease, transform 0.06s ease,
    box-shadow 0.18s ease;

  background: rgba(255, 255, 255, 0.01);

  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.03);
  }

  &:hover {
    background: rgba(180, 120, 255, 0.14);
    box-shadow: inset 0 0 0 1px rgba(220, 180, 255, 0.45);
    transform: translateY(-1px);
  }
`;

const FileNameChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.22rem 0.7rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px) saturate(180%);
  -webkit-backdrop-filter: blur(14px) saturate(180%);

  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.96);
  font-size: 0.82rem;
  font-weight: 500;
  white-space: nowrap;
`;

const HexText = styled.span`
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.96);
  opacity: 0.9;
`;

export function FilesTable({ rows, loading }) {
  return (
    <Wrapper>
      <StyledTable responsive className="align-middle">
        <thead>
          <tr>
            <th style={{ width: '18%' }}>File</th>
            <th>Text</th>
            <th style={{ width: '14%' }}>Number</th>
            <th style={{ width: '32%' }}>Hex</th>
          </tr>
        </thead>

        <tbody>
          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-muted py-4">
                No data found.
              </td>
            </tr>
          )}

          {rows.map((row) => (
            <RowTr key={row.id}>
              <td>
                <FileNameChip>{row.file}</FileNameChip>
              </td>
              <td className="text-truncate">{row.text}</td>
              <td>{row.number}</td>
              <td className="text-truncate">
                <HexText>{row.hex}</HexText>
              </td>
            </RowTr>
          ))}
        </tbody>
      </StyledTable>
    </Wrapper>
  );
}
