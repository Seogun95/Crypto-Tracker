import { fetchCoinHistory } from 'modules';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';

import styled from 'styled-components';

import { ChartOptions } from './ChartOptions';
import { IChartProps, ICoinHistoryData } from './Interface';

export function Chart() {
  const { coinId } = useOutletContext<IChartProps>();

  const { isLoading, data } = useQuery<ICoinHistoryData[]>(
    ['coinHistory', coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 20000000 }
  );

  return (
    <>
      <div>
        {isLoading ? '차트 로딩중...' : data && <ChartOptions data={data} />}
      </div>
    </>
  );
}
