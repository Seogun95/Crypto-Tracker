import styled from 'styled-components';
import { BiTrendingDown, BiTrendingUp, BiMinus } from 'react-icons/bi';
import { IGridListProps } from './Interface';

export function GridList({ percentChange, children, time }: IGridListProps) {
  return (
    <>
      <GridListItem percent={percentChange}>
        {children}
        {percentChange && (
          <>
            <Time>
              <span>{`${time} 보다\n`}</span>
              {percentChange > 0 ? '상승' : percentChange < 0 ? '하락' : ''}
            </Time>
            <PercentageContainer>
              <Percent>{percentChange}%</Percent>
              {percentChange > 0 ? (
                <BiTrendingUp />
              ) : percentChange < 0 ? (
                <BiTrendingDown />
              ) : (
                <BiMinus />
              )}
            </PercentageContainer>
          </>
        )}
      </GridListItem>
    </>
  );
}

const GridListItem = styled.div<{ percent?: number }>`
  ${props => props.theme.FlexCol};
  justify-content: space-between;
  background-color: ${props => props.theme.bgColorDeep};
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: ${props => props.theme.shadow.box};
  font-weight: bold;
  color: ${props =>
    props.percent && props.percent > 0
      ? props.theme.greenColor
      : props.percent && props.percent < 0
      ? props.theme.accentColor
      : props.theme.color};
`;

const Time = styled.span`
  font-size: 0.9rem;
  padding-bottom: 0.2rem;
  span {
    color: ${props => props.theme.color};
    opacity: 0.5;
  }
`;

const PercentageContainer = styled.div`
  ${props => props.theme.FlexRow};
  justify-content: space-between;
  align-items: center;
  svg {
    font-size: 2.5rem;
  }
`;
const Percent = styled.span`
  font-size: 2rem;
  min-width: 6.25rem;
`;
