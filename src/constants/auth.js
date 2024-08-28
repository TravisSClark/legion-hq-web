const auth = {
  v1: {
    domain: 'dev-7x3ata5x3bauon0d.us.auth0.com',
    audience: 'dev-7x3ata5x3bauon0d.us.auth0.com/userinfo',
    clientID: 'udjx2TtB49l1FM6UdWpABXFwG7D7bEk3'
  },
  dev: {
    redirectUri: 'http://localhost:3000/callback',
    returnTo: 'http://localhost:3000'
  },
  // staging: {
  //   redirectUri: 'https://d37xhki8rk4762.cloudfront.net/callback',
  //   returnTo: 'https://d37xhki8rk4762.cloudfront.net'
  // },
  prod: {
    redirectUri: 'https://legionhq2.com/callback',
    returnTo: 'https://legionhq2.com'
  }
};

export default auth;
