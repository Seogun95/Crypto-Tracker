import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function Coin() {
  const { coinId } = useParams<'coinId'>();
  console.log('params --->', coinId);
  return (
    <>
      <h1>Coin: {coinId}</h1>
    </>
  );
}
