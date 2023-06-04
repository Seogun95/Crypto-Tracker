import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
  return (
    <>
      <div>Home</div>
      <Link to={'/about'}>About</Link>
    </>
  );
}
