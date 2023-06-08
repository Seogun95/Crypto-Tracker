import { fetchCoinHistory } from 'modules';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';

import styled, { useTheme } from 'styled-components';

import { ApexChartLine } from './ApexChartLine';
import { IChartProps, ICoinHistoryData } from './Interface';
import { ApexChartCandlestick } from './ApexChartCandlestick';

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
        {isLoading
          ? '차트 로딩중...'
          : data && (
              <>
                <ApexChartLine data={data} />
                <ApexChartCandlestick data={data} />
              </>
            )}
      </div>
    </>
  );
}
