import React from 'react';

// https://apexcharts.com/docs/options/xaxis/
import ApexChart from 'react-apexcharts';
import { ICoinHistoryData } from './Interface';
import { formatAgo } from 'modules';

interface IChartProps {
  data: ICoinHistoryData[];
}
export function ApexChartCandlestick({ data }: IChartProps) {
  return (
    <>
      <ApexChart
        type="candlestick"
        height="200px"
        series={[
          {
            name: '시세',
            data: data?.map(price => ({
              x: formatAgo(price.time_close * 1000),
              y: [price.open, price.high, price.low, price.close],
            })),
          },
        ]}
        options={{
          theme: {
            mode: 'light',
          },
          grid: { show: false },
          chart: {
            type: 'candlestick',
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
            animations: {
              speed: 300,
            },
            background: 'transparent',
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#00B746',
                downward: '#EF403C',
              },
              wick: {
                useFillColor: true,
              },
            },
          },
          tooltip: {
            style: {
              fontSize: '12px',
            },
            y: {
              formatter: value => `$${value.toFixed(3)}`,
            },
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
        }}
      />
    </>
  );
}
