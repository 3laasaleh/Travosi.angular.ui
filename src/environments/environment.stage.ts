const publicHost = 'stage.seaworldholidays.com';


export const environment = {
  indexingEnabled: false,
  partion: true,
  baseUrl: 'https://seeworld.premiumasp.net/api/',
  imageUrl: 'https://seeworld.premiumasp.net/images/',
  publicBaseUrl: `https://${publicHost}`,
  ssrAllowedHosts: `www.stage.seaworldholidays.com,${publicHost}`,
};
