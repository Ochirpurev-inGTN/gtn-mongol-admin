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
            const entry = await strapi.db
              .query("api::facebook-post.facebook-post")
              .create({
                data: {
                  postId: data.data[0],
                  message: data.data[0].message.slice(0, 100),
                  permalink: data.data[0].permalink_url,
                  created_time: data.data[0].created_time,
                },
              });
            console.log("my entry  in surgal  === ", entry);
          }
          break;
        case process.env.PAGE_ID_MAIN_PAGE:
          {
            const { data } = await axios.get(
              `https://graph.facebook.com/v13.0/${pageId}/feed?fields=permalink_url,message,created_time&limit=1&access_token=${mainPageToken}`
            );
            const entry = await strapi.db
              .query("api::facebook-main-page.facebook-main-page")
              .create({
                data: {
                  postId: data.data[0],
                  message: data.data[0].message?.slice(0, 100),
                  permalink: data.data[0].permalink_url,
                  created_time: data.data[0].created_time,
                },
              });
            console.log("my entry in main === ", entry);
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

/**
 * if (posts) {
//     const posts = result.data.data;
//     return posts;
//     // await strapi.db
//     //   .query("api::facebook-post.facebook-post")
//     //   .createMany({
//     //     data: posts.map((post) => {
//     //       return {
//     //         postId: post.id,
//     //         message: post.message.slice(0, 100),
//     //         permalink: post.permalink_url,
//     //       };
//     //     }),
//     //   })
//     //   .then((data) => {
//     //     console.log("data from db query === ", data);
//     //   });
//   }
 */

//  {
//    "object":"page",
//  "entry":
//   [{
//    "id":"0",
//    "time":1646361275,
//    "changes":
//       [{
//        "field":"feed",
//        "value":
//           {
//               "item":"status",
//               "post_id":"44444444_444444444",
//               "verb":"add",
//               "published":1,
//               "created_time":1646361275,
//               "message":"Example post content.",
//               "from":{"name":"Test Page","id":"1067280970047460"}
//           }
//       }]
//   }]
// }
