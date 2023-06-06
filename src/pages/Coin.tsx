import axios from 'axios';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { LocationState, IInfoData, IPriceData } from 'interface';
import { Link } from 'react-router-dom';
import { useMatch } from 'react-router-dom';

export function Coin() {
  const { coinId } = useParams<'coinId'>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as LocationState;
  const [info, setInfo] = useState<IInfoData>();
  const [price, setPrice] = useState<IPriceData>();
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  const numberFormat = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };
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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [coinId]);

  return (
    <>
      <Container>
        <Header>
          <Title>{state?.name || '로딩중...'}</Title>
        </Header>
        {loading ? (
          <Loading>로딩중...</Loading>
        ) : (
          <>
            {price && info && (
              <>
                <CoinWrapper>
                  <OverviewContainer>
                    <OverviewItem>
                      <span>랭크</span>
                      <span>{info?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                      <span>심볼</span>
                      <span>{info?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                      <span>오픈소스</span>
                      <span>{info?.open_source ? '사용가능' : '사용불가'}</span>
                    </OverviewItem>
                  </OverviewContainer>
                  <Description>{info?.description}</Description>
                  <OverviewContainer>
                    <OverviewItem>
                      <span>총 공급</span>
                      <span>{numberFormat(price?.total_supply)}</span>
                    </OverviewItem>
                    <OverviewItem>
                      <span>최대 공급</span>
                      <span>{numberFormat(price?.max_supply)}</span>
                    </OverviewItem>
                  </OverviewContainer>
                  <TapContainer>
                    <Tap isActive={chartMatch !== null}>
                      <Link to="chart">Chart</Link>
                    </Tap>
                    <Tap isActive={priceMatch !== null}>
                      <Link to="price">Price</Link>
                    </Tap>
                  </TapContainer>
                  <Outlet />
                </CoinWrapper>
              </>
            )}
          </>
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

const Loading = styled.span`
  text-align: center;
  display: block;
`;

const CoinWrapper = styled.section`
  gap: 1rem;
  ${props => props.theme.FlexCol};
`;
const OverviewContainer = styled.article`
  ${props => props.theme.FlexRow};
  justify-content: space-between;
  background-color: ${props => props.theme.bgColorDeep};
  padding: 1rem;
  border-radius: 1rem;
`;

const OverviewItem = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  gap: 10px;
  span:first-child {
    font-size: 0.8rem;
  }
`;

const Description = styled.p`
  text-align: justify;
  margin: 1rem 0;
`;

const TapContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: space-between;
  gap: 1rem;
`;

const Tap = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  background-color: ${props => props.theme.bgColorDeep};
  border-radius: 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 12px;
  color: ${props =>
    props.isActive ? props.theme.accentColor : props.theme.color};
  a {
    display: block;
  }
`;
