module.exports = {
  async miniiAction(ctx, next) {
    console.log("ctx == ", ctx.querystring);
    console.log("FROM_FACEBOOK_PAGE_WEBHOOK == ", process.env.FROM_FACEBOOK_PAGE_WEBHOOK);
    const entry = await strapi.entityService.findOne(
      "api::facebook-post.facebook-post",
      1
    );
    console.log("my entry === ", entry);
    ctx.body = "Hello fkn Strapi world";
    next()
  },
};
