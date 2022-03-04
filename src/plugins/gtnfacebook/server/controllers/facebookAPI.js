module.exports = ({ strapi }) => ({
  async miniiAction(ctx, next) {
    const idForGtnJapanese = "424423691696784";
    const page_token_surgalt = process.env.PAGE_TOKEN_SURGALT;
    console.log(" ------ * ------- * --------");
    console.log("minii action ehellee");
    const posts = await strapi
      .service("plugin::gtnfacebook.myService")
      .getFacebookPosts(idForGtnJapanese, page_token_surgalt);

    console.log("my post ===", posts);
    ctx.body = "Oroldoj bn...";
    console.log("minii action duuslaa");
    console.log(" ------ * ------- * --------");
    next();
  },
});

/**
 * posts g db ruu nemeh uildeliig doorh code g ashiglaj implement hiih
 * // async function myFetch(pageId, pageToken) {
//   
//   if (posts) {
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
// }
 */
