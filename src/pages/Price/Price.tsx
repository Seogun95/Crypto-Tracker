import { formatKoreanTime } from 'modules';
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { GridList } from './GridList';
import { IGridListData, IPricePros } from './Interface';

export function Price() {
  const { priceData } = useOutletContext<IPricePros>();
  const {
    ath_date,
    ath_price,
    percent_change_15m,
    percent_change_30m,
    percent_change_1h,
    percent_change_6h,
    percent_change_12h,
    percent_change_24h,
    percent_change_7d,
    percent_change_30d,
    percent_change_1y,
  } = priceData.quotes.USD;

  const gridListData: IGridListData[] = [
    { time: '15분 전', percentChange: percent_change_15m },
    { time: '30분 전', percentChange: percent_change_30m },
    { time: '1시간 전', percentChange: percent_change_1h },
    { time: '6시간 전', percentChange: percent_change_6h },
    { time: '12시간 전', percentChange: percent_change_12h },
    { time: '1일 전', percentChange: percent_change_24h },
    { time: '7일 전', percentChange: percent_change_7d },
    { time: '한달 전', percentChange: percent_change_30d },
    { time: '1년 전', percentChange: percent_change_1y },
  ];
  const gridItemCount = gridListData.filter(
    ({ percentChange }) => percentChange !== 0
  ).length;

  return (
    <>
      <GridContainer gridItemCount={gridItemCount}>
        <GridList>
          <HighPrice>
            <span>
              {formatKoreanTime(ath_date)} <br />
              최고가 코인 금액
            </span>
            <span>${ath_price.toFixed(2)}</span>
          </HighPrice>
        </GridList>
        {gridListData.map(({ time, percentChange }) => {
          if (percentChange === 0) {
            return null;
          }
          return (
            <GridList key={time} time={time} percentChange={percentChange} />
          );
        })}
      </GridContainer>
    </>
  );
}

const GridContainer = styled.article<{ gridItemCount: number }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  ${({ theme }) => theme.media.mobile`
      grid-template-columns: 1fr;
  `}

  > div {
    &:first-child {
      grid-column: 1 / span 2;
      background-color: ${props => props.theme.bgColor2};
      color: ${props => props.theme.color2};
    }
    &:last-child {
      grid-column: ${props => props.gridItemCount % 2 !== 0 && '1 / span 2'};
    }

    ${({ theme }) => theme.media.mobile`
      grid-column: 1 !important;
      grid-template-columns: 1fr;
    `}
  }
`;

const HighPrice = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 0.9rem;
    &:first-child {
      opacity: 0.9;
      line-height: 1.5;
    }
    &:last-child {
      font-size: 2rem;
    }
  }

  ${({ theme }) => theme.media.mobile`
    ${theme.FlexCol};
    align-items: flex-start;
    gap: .5rem;
  `}
`;
