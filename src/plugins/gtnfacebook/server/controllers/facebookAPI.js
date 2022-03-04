module.exports = ({ strapi }) => ({
  async miniiAction(ctx, next) {
    const idForGtnJapanese = process.env.PAGE_ID_SURGALT;
    const page_token_surgalt = process.env.PAGE_TOKEN_SURGALT;

    const pageIdMain = process.env.PAGE_ID_MAIN_PAGE;
    const pageTokenMain = process.env.PAGE_TOKEN_MAIN_PAGE;

    console.log(" ------ * ------- * --------");
    console.log("minii action ehellee");
    const posts1 = await strapi
      .service("plugin::gtnfacebook.myService")
      .getFacebookPosts(pageIdMain, pageTokenMain);

    console.log("my main page posts ===", posts1.data?.length);

    if (posts1.data) {
      await strapi.db
        .query("api::facebook-main-page.facebook-main-page")
        .createMany({
          data: posts1.data.map((post) => {
            return {
              postId: post.id,
              message: post.message?.slice(0, 100),
              permalink: post.permalink_url,
              created_time: post.created_time
            };
          }),
        })
        .then((data) => {
          console.log("data from db query === ", data);
        });
    }
    // surgalt page n post tataj bn 

    const posts = await strapi
      .service("plugin::gtnfacebook.myService")
      .getFacebookPosts(idForGtnJapanese, page_token_surgalt);

    console.log("my main page posts ===", posts.data?.length);

    if (posts.data) {
      await strapi.db
        .query("api::facebook-post.facebook-post")
        .createMany({
          data: posts.data.map((post) => {
            return {
              postId: post.id,
              message: post.message?.slice(0, 100),
              permalink: post.permalink_url,
              created_time: post.created_time
            };
          }),
        })
        .then((data) => {
          console.log("data from db query === ", data);
        });
    }

    ctx.body = "Facebook posts are fetched.";
    console.log("minii action duuslaa");
    console.log(" ------ * ------- * --------");
    next();
  },
});

/**
 * posts g db ruu nemeh uildeliig doorh code g ashiglaj implement hiih
 * // async function myFetch(pageId, pageToken) {
//   
  if (posts) {
    const posts = result.data.data;
    return posts;
    // await strapi.db
    //   .query("api::facebook-post.facebook-post")
    //   .createMany({
    //     data: posts.map((post) => {
    //       return {
    //         postId: post.id,
    //         message: post.message.slice(0, 100),
    //         permalink: post.permalink_url,
    //       };
    //     }),
    //   })
    //   .then((data) => {
    //     console.log("data from db query === ", data);
    //   });
  }
// }
 */
