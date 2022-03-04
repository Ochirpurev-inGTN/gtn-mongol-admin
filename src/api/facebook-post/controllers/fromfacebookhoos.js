const axios = require("axios");

module.exports = {
  async fromFacebookHookVerfication(ctx, next) {
    // console.log("ctx query == ", ctx.request.query);
    const fbHookToken = process.env.FROM_FACEBOOK_PAGE_WEBHOOK;
    const fbChallenge = ctx.request.query["hub.challenge"];
    const fbToken = ctx.request.query["hub.verify_token"];
    if (fbHookToken == fbToken) {
      ctx.body = fbChallenge;
    } else {
      ctx.body = "Token is invalud";
    }
    next();
  },
  async fromFacebookHook(ctx, next) {
    console.log("ctx body == ",JSON.stringify(ctx.request.body));
    ctx.body = "Ok";
    next();
  },
};
