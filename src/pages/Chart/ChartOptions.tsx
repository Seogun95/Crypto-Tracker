import React from 'react';
import styled from 'styled-components';

// https://apexcharts.com/docs/options/xaxis/
import ApexChart from 'react-apexcharts';
import { ICoinHistoryData } from './Interface';
import { formatAgo } from 'modules';

interface IChartProps {
  data: ICoinHistoryData[];
}
export function ChartOptions({ data }: IChartProps) {
  return (
    <>
      <ApexChart
        type="line"
        series={[
          {
            name: 'Price',
            data: data?.map(price => Number(price.close)) as number[],
          },
        ]}
        options={{
          theme: {
            mode: 'light',
          },
          colors: ['#0acf97'],
          fill: {
            type: 'gradient',
            gradient: {
              gradientToColors: ['#fffa75'],
              shadeIntensity: 1,
              stops: [0, 100],
            },
          },
          stroke: {
            show: true,
            curve: 'smooth',
          },
          chart: {
            type: 'area',
            height: 500,
            width: 700,
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
            animations: {
              enabled: true,
              easing: 'linear',
              speed: 100,
            },
            background: 'transparent',
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
            categories: data?.map(date => formatAgo(date.time_close * 1000)),
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
        }}
      />
    </>
  );
}
