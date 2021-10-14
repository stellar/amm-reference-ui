import { rest } from "msw";

import { STELLAR_EXPERT_AMM_URL } from "constants/apiUrls";

export const handlers = [
  rest.get(`${STELLAR_EXPERT_AMM_URL}/pool/1/stats`, (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        id: "1234095834602134",
        assets: [
          {
            amount: "30000000",
            asset:
              "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
          },
          {
            amount: "90000000",
            asset: "XLM",
          },
        ],
        fee: 30,
        shares: "1000",
        trades: 43423423,
        total_value_locked: "100500",
        earned_fees: [
          {
            asset:
              "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
            "24h": "100000",
            "7d": "700000",
            "1y": "36500000",
          },
          {
            asset: "XLM",
            "24h": "400000",
            "7d": "2800000",
            "1y": "146000000",
          },
        ],
        volume: [
          {
            asset:
              "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
            "24h": "92065453464",
            "7d": "644458174248",
            "1y": "33603890514360",
          },
          {
            asset: "XLM",
            "24h": "305546654654",
            "7d": "2138826582578",
            "1y": "111524528948710",
          },
        ],
      }),
    ),
  ),
  rest.get(`${STELLAR_EXPERT_AMM_URL}/pool/1/history`, (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        _links: {
          self: {
            href: "/explorer/public/pool/1234095834602134/history?order=desc&limit=100",
          },
          prev: {
            href: "/explorer/public/pool/1234095834602134/history?order=asc&limit=100&cursor=613f14189cbc3d04b6674cdf",
          },
          next: {
            href: "/explorer/public/pool/1234095834602134/history?order=desc&limit=100&cursor=613f14189cbc3d04b66707ec",
          },
        },
        _embedded: {
          records: [
            {
              ts: 1631522192,
              paging_token: "613f14189cbc3d04b6674cdf",
              shares: "921",
              trades: 3423,
              total_value_locked: "92572",
              earned_fees: [
                {
                  asset:
                    "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
                  amount: "100000",
                },
                {
                  asset: "XLM",
                  amount: "400000",
                },
              ],
              volume: [
                {
                  asset:
                    "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
                  volume: "92065453464",
                },
                {
                  asset: "XLM",
                  volume: "305546654654",
                },
              ],
            },
            {
              ts: 1634074591,
              paging_token: "613f14189cbc3d04b66707ec",
              shares: "1000",
              trades: 1922,
              total_value_locked: "100500",
              earned_fees: [
                {
                  asset:
                    "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
                  amount: "217000",
                },
                {
                  asset: "XLM",
                  amount: "648000",
                },
              ],
              volume: [
                {
                  asset:
                    "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
                  volume: "31054645464",
                },
                {
                  asset: "XLM",
                  volume: "94546541313",
                },
              ],
            },
            {
              ts: 1633968262,
              paging_token: "613f14189cbc3d04b66707ec",
              shares: "1000",
              trades: 1922,
              total_value_locked: "120100",
              earned_fees: [
                {
                  asset:
                    "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
                  amount: "217000",
                },
                {
                  asset: "XLM",
                  amount: "648000",
                },
              ],
              volume: [
                {
                  asset:
                    "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
                  volume: "31054645464",
                },
                {
                  asset: "XLM",
                  volume: "94546541313",
                },
              ],
            },
            {
              ts: 1633881862,
              paging_token: "613f14189cbc3d04b66707ec",
              shares: "1000",
              trades: 1922,
              total_value_locked: "8100",
              earned_fees: [
                {
                  asset:
                    "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
                  amount: "217000",
                },
                {
                  asset: "XLM",
                  amount: "648000",
                },
              ],
              volume: [
                {
                  asset:
                    "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
                  volume: "31054645464",
                },
                {
                  asset: "XLM",
                  volume: "94546541313",
                },
              ],
            },
            {
              ts: 1633795462,
              paging_token: "613f14189cbc3d04b66707ec",
              shares: "1000",
              trades: 1922,
              total_value_locked: "12100",
              earned_fees: [
                {
                  asset:
                    "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
                  amount: "217000",
                },
                {
                  asset: "XLM",
                  amount: "648000",
                },
              ],
              volume: [
                {
                  asset:
                    "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1",
                  volume: "31054645464",
                },
                {
                  asset: "XLM",
                  volume: "94546541313",
                },
              ],
            },
          ],
        },
      }),
    ),
  ),
];
