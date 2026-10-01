const publicHost = 'seaworld-prod.premiumasp.net';

// export const environment = {
//   partion: true,
//   baseUrl: 'https://seeworld.premiumasp.net/api/',
//   serverBaseUrl: 'https://seeworld.premiumasp.net/api/',
//   imageUrl: 'https://seeworld.premiumasp.net/images/',
//   publicBaseUrl: 'https://seaworldholidays.com',
// };

export const environment = {
  partion: true,
  baseUrl: 'https://seeworld-api-prod.premiumasp.net/api/',
  serverBaseUrl: 'https://seeworld-api-prod.premiumasp.net/api/',
  imageUrl: 'https://seeworld-api-prod.premiumasp.net/images/',
  publicBaseUrl: `https://${publicHost}`,
  ssrAllowedHosts: `localhost,127.0.0.1,seaworldholidays.com,www.seaworldholidays.com,${publicHost}`,
};
