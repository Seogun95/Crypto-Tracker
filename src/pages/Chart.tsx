import { fetchCoinHistory } from 'modules';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

interface IChartProps {
  coinId: string;
}
export function Chart() {
  const { coinId } = useOutletContext<IChartProps>();

  const { isLoading, data } = useQuery(['coinHistory', coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <>
      <div>Chart</div>
    </>
  );
}
