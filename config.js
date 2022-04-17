const config = {
    // Backend config
    // s3: {
    //   REGION: "us-west-2",
    //   BUCKET: "calmemaybe",
    // },
    // apiGateway: {
    //   REGION: "us-west-2",
    //   URL: "process.env.REACT_APP_API_URL",
    // },
    cognito: {
      REGION: "us-west-2",
      USER_POOL_ID: "us-west-2_9BfJgweSp",
      APP_CLIENT_ID: "2of7491tnjbfpi95t33mr5tqbh",
      IDENTITY_POOL_ID: "us-west-2:32cbffb8-1f33-43d9-9b07-6fb28ab7ec88",
    },
  };
  
  export default config;