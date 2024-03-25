import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Space } from '../styles/variables';
import { BreakPoint, Color } from '../styles/variables';

const _Content = styled.div`
  height: 100%;
  padding: 0 ${Space * 2}px;
`;

const _FooterContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${BreakPoint.MOBILE}px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  background-color: ${Color.MONO_A};
  border-left: 1px solid ${Color.MONO_30};
  border-right: 1px solid ${Color.MONO_30};
`;

export const CommonLayout: React.FC = () => {
  return (
    <>
      <Container>
        <_Content>
          <Outlet />
        </_Content>
      </Container>
      <_FooterContainer>
        <Footer />
      </_FooterContainer>
    </>
  );
};
