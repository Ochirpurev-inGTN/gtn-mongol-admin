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
    console.log("ctx body == ", ctx.request.body);
    console.log("--------");
    const changes = ctx.request.body?.changes;
    console.log("changes array ===", JSON.stringify(changes));
    ctx.body = "Ok";
    next();
  },
};
