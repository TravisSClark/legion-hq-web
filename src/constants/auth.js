const auth = {
  v1: {
    domain: 'dev-55vqrwu2rswg2ekm.us.auth0.com',
    audience: 'https://dev-i-uenm-b.auth0.com/userinfo',
    clientID: '2cCGi7cP31tCqliGxAWcf5VAnlhgJNFY'
  },
  v2: {
    domain: 'legion-hq-login.auth0.com',
    audience: 'https://legion-hq-login.auth0.com/userinfo',
    clientID: '4LIptO8NBFnPepfS8mxVxjFRNUljZHmZ'
  },
  dev: {
    redirectUri: 'http://localhost:3000/callback',
    returnTo: 'http://localhost:3000'
  },
  staging: {
    redirectUri: 'https://d37xhki8rk4762.cloudfront.net/callback',
    returnTo: 'https://d37xhki8rk4762.cloudfront.net'
  },
  prod: {
    redirectUri: 'https://legionlistbuilder.com/callback',
    returnTo: 'https://legionlistbuilder.com'
  }
};

export default auth;
