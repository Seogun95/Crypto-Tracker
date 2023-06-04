import { DefaultTheme } from 'styled-components';

const blue = {
  brandColor1: '#F9FBFF',
  brandColor2: '#D0E4FF',
  brandColor3: '#A9CEFF',
  brandColor4: '#87BBFF',
  brandColor5: '#5FA4FF',
  brandColor6: '#1479FF',
  brandColor7: '#005EDA',
};

export const Theme: DefaultTheme = {
  blue,
  pointColor: '#30B198',
  subColor: '#FFC857',
  accentColor: '#EF476F',
  pointColorLight: '#44c5ac',
  transparentBackground: '#f5f6f7a6',
  bgColor: '#F8FAFB',
  color: '#191A23',
  transparentColor: 'rgba(25, 26, 35, 0.65)',
  transitionOption: 'ease-in-out 0.15s',
  boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.16)',
};

export const DarkTheme: DefaultTheme = {
  blue,
  pointColor: '#30B198',
  subColor: '#FFC857',
  accentColor: '#EF476F',
  pointColorLight: '#44c5ac',
  transparentBackground: '#21232E',
  bgColor: '#1e1e1e',
  color: '#E2E2E2',
  transparentColor: '#f5f6f7a6',
  transitionOption: 'ease-in-out 0.15s',
  boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.16)',
};
