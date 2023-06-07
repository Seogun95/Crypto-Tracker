import React, { Suspense } from 'react';
import styled, { useTheme } from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export function Layout() {
  return (
    <>
      <Suspense fallback={null}>
        <Wrapper>
          <Header />
          <Outlet />
        </Wrapper>
      </Suspense>
    </>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 3.125rem;
`;
