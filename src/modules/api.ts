import axios from 'axios';

export const numberFormat = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const fetchCoins = async () => {
  return await axios
    .get('https://api.coinpaprika.com/v1/coins')
    .then(res => res.data);
};

const BASE_COIN_URL = 'https://api.coinpaprika.com/v1';

export const fetchDataInfo = async (coinId: string) => {
  return await axios
    .get(`${BASE_COIN_URL}/coins/${coinId}`)
    .then(res => res.data);
};

export const fetchDataTickers = async (coinId: string) => {
  return await axios
    .get(`${BASE_COIN_URL}/tickers/${coinId}`)
    .then(res => res.data);
};

export const fetchCoinHistory = async (coinId: string) => {
  return await axios
    .get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then(res => res.data);
};
