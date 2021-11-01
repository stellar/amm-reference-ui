import { rest } from "msw";

import { STELLAR_EXPERT_AMM_URL } from "constants/apiUrls";

export const handlers = [
  rest.get(`${STELLAR_EXPERT_AMM_URL}/pools`, (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        _embedded: {
          records: [
            {
              id: "bb4e56ed4d47d4ee09c772021b60d2698fe6567e4148f976ffc0af23b5e66e4a",
              paging_token:
                "bb4e56ed4d47d4ee09c772021b60d2698fe6567e4148f976ffc0af23b5e66e4a",
              assets: [
                {
                  asset: "XLM",
                  amount: "42088044932",
                  domain: "stellar.org",
                  toml_info: {
                    image: "https://stellar.expert/img/vendor/stellar.svg",
                    orgName: "Stellar",
                    name: "Lumen",
                  },
                },
                {
                  asset:
                    "USDC-GBL74ETHLQJQUQW7YQT4KO3HJVR74TIHSBW6ENRBSFHUTATBRKKLGW4Y-1",
                  amount: "3231564823",
                  domain: "dev.blocktimefinancial.com",
                  toml_info: {
                    orgName: "Block Time Financial, LLC",
                    image:
                      "https://dev.blocktimefinancial.com/.well-known/testnetLogo.jpg",
                    status: "test",
                    anchorAssetType: "fiat",
                  },
                },
              ],
              type: 0,
              fee: 30,
              shares: "11610822420",
              accounts: 5,
              trades: 126,
              total_value_locked: "0",
              earned_fees: [
                {
                  asset: "XLM",
                  all_time: 178141313,
                },
                {
                  asset:
                    "USDC-GBL74ETHLQJQUQW7YQT4KO3HJVR74TIHSBW6ENRBSFHUTATBRKKLGW4Y-1",
                  all_time: 36419144,
                },
              ],
              volume: [
                {
                  asset: "XLM",
                  all_time: 169412321178,
                },
                {
                  asset:
                    "USDC-GBL74ETHLQJQUQW7YQT4KO3HJVR74TIHSBW6ENRBSFHUTATBRKKLGW4Y-1",
                  all_time: 15602088390,
                },
              ],
              created: 1633550895,
              updated: 1635767908,
            },
            {
              id: "02449937ed825805b7a945bb6c027b53dfaf140983c1a1a64c42a81edd89b5e0",
              paging_token:
                "02449937ed825805b7a945bb6c027b53dfaf140983c1a1a64c42a81edd89b5e0",
              assets: [
                {
                  asset: "XLM",
                  amount: "624020680",
                  domain: "stellar.org",
                  toml_info: {
                    image: "https://stellar.expert/img/vendor/stellar.svg",
                    orgName: "Stellar",
                    name: "Lumen",
                  },
                },
                {
                  asset:
                    "A2-GCO47UX6AINCBVPNXIIDPWL33D6QWGUA4RBXSQWQXF75KTX7QJK3ZBD2-1",
                  amount: "8035160450",
                },
              ],
              type: 0,
              fee: 30,
              shares: "2236067977",
              accounts: 1,
              trades: 1,
              total_value_locked: "0",
              earned_fees: [
                {
                  asset: "XLM",
                  all_time: 28127938,
                },
                {
                  asset:
                    "A2-GCO47UX6AINCBVPNXIIDPWL33D6QWGUA4RBXSQWQXF75KTX7QJK3ZBD2-1",
                  all_time: 0,
                },
              ],
              volume: [
                {
                  asset: "XLM",
                  all_time: 9375979320,
                },
                {
                  asset:
                    "A2-GCO47UX6AINCBVPNXIIDPWL33D6QWGUA4RBXSQWQXF75KTX7QJK3ZBD2-1",
                  all_time: 7535160450,
                },
              ],
              created: 1634961403,
              updated: 1634996297,
            },
            {
              id: "0466a6bbafdc293b87f2ea7615919244057242b21ebf46b38d64536e8d2ac3c0",
              paging_token:
                "0466a6bbafdc293b87f2ea7615919244057242b21ebf46b38d64536e8d2ac3c0",
              assets: [
                {
                  asset: "XLM",
                  amount: "10010753057",
                  domain: "stellar.org",
                  toml_info: {
                    image: "https://stellar.expert/img/vendor/stellar.svg",
                    orgName: "Stellar",
                    name: "Lumen",
                  },
                },
                {
                  asset:
                    "CHEESE-GC7FTJWCBNS346DDVQERJF5FDSWB2UX5YQURCSRPCCTIWLVDTGHLTXFZ-2",
                  amount: "9309681012",
                },
              ],
              type: 0,
              fee: 30,
              shares: "9652784650",
              accounts: 3,
              trades: 7,
              total_value_locked: "0",
              earned_fees: [
                {
                  asset: "XLM",
                  all_time: 570000,
                },
                {
                  asset:
                    "CHEESE-GC7FTJWCBNS346DDVQERJF5FDSWB2UX5YQURCSRPCCTIWLVDTGHLTXFZ-2",
                  all_time: 1658627,
                },
              ],
              volume: [
                {
                  asset: "XLM",
                  all_time: 754552475,
                },
                {
                  asset:
                    "CHEESE-GC7FTJWCBNS346DDVQERJF5FDSWB2UX5YQURCSRPCCTIWLVDTGHLTXFZ-2",
                  all_time: 746751260,
                },
              ],
              created: 1634049421,
              updated: 1635277793,
            },
            {
              id: "1d02ef4a3485858732314f46436f66a6ca5c9b8b27ed15297838856088eee405",
              paging_token:
                "1d02ef4a3485858732314f46436f66a6ca5c9b8b27ed15297838856088eee405",
              assets: [
                {
                  asset:
                    "ETH-GATPY6X6OYTXKNRKVP6LEMUUQKFDUW5P7HL4XI3KWRCY52RAWYJ5FLMC-1",
                  amount: "4151535",
                },
                {
                  asset:
                    "YBX-GCIWMQHPST7LQ7V4LHAF2UP6ZSDCFRYYP7IM4BBAFSBZMVTR3BB4OQZ5-1",
                  amount: "2205146",
                },
              ],
              type: 0,
              fee: 30,
              shares: "3000000",
              accounts: 1,
              trades: 11,
              total_value_locked: "0",
              earned_fees: [
                {
                  asset:
                    "ETH-GATPY6X6OYTXKNRKVP6LEMUUQKFDUW5P7HL4XI3KWRCY52RAWYJ5FLMC-1",
                  all_time: 473247,
                },
                {
                  asset:
                    "YBX-GCIWMQHPST7LQ7V4LHAF2UP6ZSDCFRYYP7IM4BBAFSBZMVTR3BB4OQZ5-1",
                  all_time: 57428,
                },
              ],
              volume: [
                {
                  asset:
                    "ETH-GATPY6X6OYTXKNRKVP6LEMUUQKFDUW5P7HL4XI3KWRCY52RAWYJ5FLMC-1",
                  all_time: 318748081,
                },
                {
                  asset:
                    "YBX-GCIWMQHPST7LQ7V4LHAF2UP6ZSDCFRYYP7IM4BBAFSBZMVTR3BB4OQZ5-1",
                  all_time: 30488630,
                },
              ],
              created: 1634514560,
              updated: 1635371312,
            },
          ],
        },
      }),
    ),
  ),
];
