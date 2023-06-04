import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import App from 'App';

import Layout from './Layout/Layout';
import NotFound from './Layout/NotFound';
import Coin from 'pages/Coin';
import Coins from 'pages/Coins';

const router = createBrowserRouter([
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
          },
        ],
      },
    ],
  },
]);

export default router;
