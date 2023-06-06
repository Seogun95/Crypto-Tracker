import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

interface CoinObject {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const [coins, setCoins] = useState<CoinObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await axios('https://api.coinpaprika.com/v1/coins');
      setCoins(res.data.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Title>코인</Title>
        </Header>
        {loading ? (
          <Loading>로딩중</Loading>
        ) : (
          <CoinsList>
            {coins.map(coin => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={coin}>
                  <img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt="코인 이미지"
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}

const Container = styled.article`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  height: 10vh;
`;

const Title = styled.h1`
  color: ${props => props.theme.pointColor};
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${props => props.theme.bgColor2};
  color: ${props => props.theme.color2};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    transition: 0.2s ease-in;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 20px;
    gap: 10px;
    img {
      max-width: 30px;
      width: 100%;
      border-radius: 100%;
    }
  }

  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Loading = styled.span`
  text-align: center;
  display: block;
`;
