import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

interface LocationState {
  state: {
    name: string;
    symbol: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links_extended: object;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface IPriceData {}
export default function Coin() {
  const { coinId } = useParams<'coinId'>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as LocationState;
  const [info, setInfo] = useState<IInfoData>();
  const [price, setPrice] = useState<IPriceData>();

  useEffect(() => {
    (async () => {
      try {
        const { data: infoRes } = await axios.get(
          `https://api.coinpaprika.com/v1/coins/${coinId}`
        );
        const { data: priceRes } = await axios.get(
          `https://api.coinpaprika.com/v1/tickers/${coinId}`
        );
        setInfo(infoRes);
        setPrice(priceRes);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [coinId]);

  console.log('info --->', info);
  console.log('priceRes --->', price);

  return (
    <>
      <Container>
        <Header>
          <Title>{state?.name || '로딩중...'}</Title>
        </Header>
        {loading ? <Loading>로딩중...</Loading> : null}
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

const Loading = styled.span`
  text-align: center;
  display: block;
`;
