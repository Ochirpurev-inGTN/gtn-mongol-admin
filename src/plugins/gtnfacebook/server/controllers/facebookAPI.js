module.exports = ({ strapi }) => ({
  async fetchMainPosts(ctx, next) {
    strapi
      .controller("api::facebook-main-page.custom-facebook")
      .fetchPostsFromFacebook()
      .catch((err) =>
        console.log("Error occured in cron task and error is  ==", err)
      );

    ctx.body = "Facebook Main page posts are fetched.";
    console.log(" ------ * fetchMainPosts action duuslaa * --------");
    next();
  },
  async fetchSurgaltPosts(ctx, next) {
    strapi
      .controller("api::facebook-post.custom-facebook")
      .fetchPostsFromFacebook()
      .catch((err) =>
        console.log("Error occured in cron task and error is  ==", err)
      );

    ctx.body = "Facebook Surgalt page posts are fetched.";
    console.log(" ------ * fetchSurgaltPosts action duuslaa * --------");
    next();
  },
});
