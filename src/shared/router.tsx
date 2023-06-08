import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import App from 'App';

import { Chart, Coin, Coins, Price } from 'pages';
import { Layout, NotFound } from 'shared/Layout';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: (
        <Suspense fallback={null}>
          <NotFound />
        </Suspense>
      ),
      children: [
        {
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Coins />,
            },
            {
              path: ':coinId',
              element: <Coin />,
              children: [
                {
                  path: 'chart',
                  element: <Chart />,
                },
                {
                  path: 'price',
                  element: <Price />,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
