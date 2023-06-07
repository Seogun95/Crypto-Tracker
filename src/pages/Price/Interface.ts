import { IPriceData } from 'interface';
import { ReactNode } from 'react';

export interface IGridListProps {
  time?: string;
  percentChange?: number;
  children?: ReactNode;
}

export interface IPricePros {
  priceData: IPriceData;
}

export interface IGridListData {
  time: string;
  percentChange: number;
}
