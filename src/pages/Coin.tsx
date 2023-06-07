import {
  Outlet,
  useLocation,
  useParams,
  useMatch,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';

import { LocationState, IInfoData, IPriceData } from 'interface';
import { fetchDataTickers, fetchDataInfo, numberFormat } from 'modules';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

export function Coin() {
  const { coinId } = useParams<'coinId'>();
  const { state } = useLocation() as LocationState;
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ['info', coinId],
    () => fetchDataInfo(String(coinId))
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ['price', coinId],
    () => fetchDataTickers(String(coinId)),
    { refetchInterval: 20000000 }
  );

  const isLoading = infoLoading || priceLoading;

  return (
    <>
      <Container>
        <Helmet>
          <title>
            {state?.name
              ? state.name
              : isLoading
              ? '로딩중...'
              : infoData?.name}
          </title>
          <link
            rel="icon"
            type="image/png"
            href={`https://coinicons-api.vercel.app/api/icon/${state?.symbol.toLowerCase()}`}
            sizes="16x16"
          />
        </Helmet>
        <Header>
          <Title>
            {state?.name
              ? state.name
              : isLoading
              ? '로딩중...'
              : infoData?.name}
          </Title>
          <img
            src={`https://coinicons-api.vercel.app/api/icon/${
              state?.symbol
                ? state.symbol.toLowerCase()
                : infoData?.symbol.toLowerCase()
            }`}
            alt={`${state?.name || infoData?.name}`}
          />
        </Header>
        {isLoading ? (
          <Loading>로딩중...</Loading>
        ) : (
          <>
            {infoData && priceData && (
              <>
                <CoinWrapper>
                  <OverviewContainer>
                    <OverviewItem>
                      <span>순위</span>
                      <span>{infoData?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                      <span>티커</span>
                      <span>{infoData?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                      <span>현재가</span>
                      <span>${priceData?.quotes.USD.price.toFixed(2)}</span>
                    </OverviewItem>
                  </OverviewContainer>
                  <OverviewContainer>
                    <p>{infoData?.description}</p>
                  </OverviewContainer>
                  <OverviewContainer>
                    <OverviewItem>
                      <span>총량</span>
                      <span>{numberFormat(priceData?.total_supply)}</span>
                    </OverviewItem>
                    <OverviewItem>
                      <span>최대 발행량</span>
                      <span>{numberFormat(priceData?.max_supply)}</span>
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
                  <Outlet context={{ coinId, priceData }} />
                </CoinWrapper>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}

const Container = styled.main`
  padding: 0rem 1.25rem 3.125rem;
  max-width: 30rem;
  margin: 0 auto;
`;

const Header = styled.nav`
  ${props => props.theme.FlexRow};
  ${props => props.theme.FlexCenter};
  height: 10vh;
  img {
    width: 30px;
    height: 100%;
    object-fit: contain;
    margin-left: 0.5rem;
  }
`;

const Title = styled.h1`
  ${props => props.theme.FlexRow};
  color: ${props => props.theme.pointColor};
  img {
    width: 100%;
    height: 100%;
  }
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
  box-shadow: ${props => props.theme.shadow.box};
`;

const OverviewItem = styled.div`
  ${props => props.theme.FlexCol};
  ${props => props.theme.FlexCenter};
  gap: 10px;
  span:first-child {
    font-size: 0.8rem;
  }
`;

const TapContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: space-between;
  gap: 1rem;
`;

const Tap = styled.span<{ isActive: boolean }>`
  position: relative;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: ${props =>
    props.isActive ? props.theme.pointColor : props.theme.color};
  transition: 0.2s ease;
  &:before {
    content: '';
    position: absolute;
    height: 2px;
    width: 2rem;
    transform: translate(-50%, -50%);
    bottom: 0px;
    border-radius: 5px;
    background-color: ${props =>
      props.isActive ? props.theme.pointColor : 'transparent'};
    transition: background-color 0.3s ease 0s;
  }
  a {
    display: block;
  }
`;
