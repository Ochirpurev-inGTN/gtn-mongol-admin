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
  async fetchPostsFromFacebook(ctx, next) {
    const savePostsToDB = async (postsData) => {
      await strapi.db
        .query("api::facebook-main-page.facebook-main-page")
        .createMany({
          data: postsData.map((post) => {
            return {
              postId: post.id,
              message: post.message?.slice(0, 100),
              permalink: post.permalink_url,
              created_time: post.created_time,
              publishedAt: Date.now(),
            };
          }),
        })
        .then((data) => {
          console.log("my new entries in surgalt page is === ", data);
        })
        .catch((err) =>
          console.log("error in fetchPostsFromFacebook === ", err)
        );
    };
    // console.log("fetchPostsFromFacebook controller started");
    const pageTokenMain = process.env.PAGE_TOKEN_MAIN_PAGE;
    const pageId = process.env.PAGE_ID_MAIN_PAGE;
    const entries = await strapi.db
      .query("api::facebook-main-page.facebook-main-page")
      .findMany({ limit: 10 });
    const { data } = await strapi
      .service("plugin::gtnfacebook.myService")
      .getFacebookPosts(pageId, pageTokenMain, 10);

    // console.log("my posts in: fetchPostsFromFacebook() === ", data);
    // console.log("my entries: fetchPostsFromFacebook() === ", entries);
    if (entries && data) {
      const tempNewPosts = data;
      entries.map((oldPost) => {
        // console.log("my old post == ", oldPost);

        const oldPostIndex = tempNewPosts.findIndex(
          ({ id }) => id === oldPost.postId
        );
        // console.log("my index === ", oldPostIndex);
        if (oldPostIndex !== -1) {
          tempNewPosts.splice(oldPostIndex, 1);
        }
        // console.log("my oldPostIndex === ", oldPostIndex);
      });

      // console.log("my new array === ", tempNewPosts);
      if (!tempNewPosts) {
        return;
      } else if (tempNewPosts) {
        savePostsToDB(tempNewPosts);
        return;
      }
    } else if (data) {
      savePostsToDB(data);
      return;
    } else {
      return null;
    }
  },
};
