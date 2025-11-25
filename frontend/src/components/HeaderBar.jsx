import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

const HeaderRow = styled(Row)`
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const TitlePill = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${(p) => p.theme.radius.pill};
  background: linear-gradient(
    135deg,
    ${(p) => p.theme.colors.toolBox},
    ${(p) => p.theme.colors.toolBox2}
  );
  box-shadow: 0 6px 16px rgba(239, 50, 69, 0.35);
`;

const Title = styled.h4`
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: ${(p) => p.theme.colors.textMain};
`;

const Subtitle = styled.small`
  display: block;
  font-size: 1rem;
  color: ${(p) => p.theme.colors.textMuted};
`;

export function HeaderBar({ rightContent }) {
  return (
    <HeaderRow className="align-items-center">
      <Col xs={12} md={6}>
        <TitleWrapper>
          <TitlePill />
          <div>
            <Title>React Test App</Title>
            <Subtitle>Files Viewer</Subtitle>
          </div>
        </TitleWrapper>
      </Col>
      <Col
        xs={12}
        md={6}
        className="d-flex justify-content-md-end mt-3 mt-md-0 gap-2"
      >
        {rightContent}
      </Col>
    </HeaderRow>
  );
}
