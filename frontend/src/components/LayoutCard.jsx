import React from 'react';
import styled from 'styled-components';
import { Container, Card } from 'react-bootstrap';

const Root = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  overflow: hidden;

  background: #05060b;

  &:before {
    content: "";
    position: absolute;
    inset: 0;

    background: 
      radial-gradient(
        circle at 15% 20%,
        rgba(255, 100, 130, 0.23),
        transparent 60%
      ),
      radial-gradient(
        circle at 85% 80%,
        rgba(110, 50, 255, 0.25),
        transparent 55%
      ),
      radial-gradient(
        circle at 50% 0%,
        rgba(255, 80, 80, 0.15),
        transparent 70%
      );

    filter: blur(35px);
    z-index: 1;
  }

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(0,0,0,0) 60%,
      rgba(0,0,0,0.4) 100%
    );
    z-index: 2;
  }
`;

const Centered = styled(Container)`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  display: flex;
  justify-content: center;
`;

const GlassCard = styled.div`
  width: 100%;
  max-width: 1100px;
  z-index: 10;

  border-radius: 20px;
  padding: 2rem;

  /* efecto glazed glass */
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(22px) saturate(160%);
  -webkit-backdrop-filter: blur(22px) saturate(160%);

  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.4);
`;

export function LayoutCard({ children }) {
  return (
    <Root>
      <Centered fluid>
        <GlassCard className="shadow-sm">
          <Card.Body>{children}</Card.Body>
        </GlassCard>
      </Centered>
    </Root>
  );
}
