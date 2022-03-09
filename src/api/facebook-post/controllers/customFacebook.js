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
        .query("api::facebook-post.facebook-post")
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
    const surgalPageToken = process.env.PAGE_TOKEN_SURGALT;
    const pageId = process.env.PAGE_ID_SURGALT;
    const entries = await strapi.db
      .query("api::facebook-post.facebook-post")
      .findMany({ limit: 10 });
    const { data } = await strapi
      .service("plugin::gtnfacebook.myService")
      .getFacebookPosts(pageId, surgalPageToken, 10);

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
  async fromFacebookHook(ctx, next) {
    ctx.body = "Ok";
    console.log("ctx body == ", JSON.stringify(ctx.request.body));
    if (ctx.request.body) {
      const surgalPageToken = process.env.PAGE_TOKEN_SURGALT;
      const mainPageToken = process.env.PAGE_TOKEN_MAIN_PAGE;
      const pageId = ctx.request.body.entry[0].changes[0].value.from.id;
      switch (pageId) {
        case process.env.PAGE_ID_SURGALT:
          {
            const { data } = await axios.get(
              `https://graph.facebook.com/v13.0/${pageId}/feed?fields=permalink_url,message,created_time&limit=1&access_token=${surgalPageToken}`
            );
            if (data) {
              const entry = await strapi.db
                .query("api::facebook-post.facebook-post")
                .create({
                  data: {
                    postId: data.data[0].id,
                    message: data.data[0].message?.slice(0, 100),
                    permalink: data.data[0].permalink_url,
                    created_time: data.data[0].created_time,
                    publishedAt: Date.now(),
                  },
                });
              console.log("my entry  in surgal  === ", entry);
            }
          }
          break;
        case process.env.PAGE_ID_MAIN_PAGE:
          {
            const { data } = await axios.get(
              `https://graph.facebook.com/v13.0/${pageId}/feed?fields=permalink_url,message,created_time&limit=1&access_token=${mainPageToken}`
            );
            if (data) {
              const entry = await strapi.db
                .query("api::facebook-main-page.facebook-main-page")
                .create({
                  data: {
                    postId: data.data[0].id,
                    message: data.data[0].message?.slice(0, 100),
                    permalink: data.data[0].permalink_url,
                    created_time: data.data[0].created_time,
                    publishedAt: Date.now(),
                  },
                });
              console.log("my entry in main === ", entry);
            }
          }
          break;
        default: {
          // nothing to add
          console.log("Wrong facebook webhook value");
        }
      }
    }
    next();
  },
};
