module.exports = {
  fetchFacebookPosts: {
    task: ({ strapi }) => {
      strapi.controller('api::facebook-post.custom-facebook').fetchPostsFromFacebook().catch(err => console.log('Error occured in cron task and error is  ==',err))
      strapi.controller('api::facebook-main-page.custom-facebook').fetchPostsFromFacebook().catch(err => console.log('Error occured in cron task and error is  ==',err))
      // console.log("1-6 udurt 11:15 tsagt hevlegdene. and now === ", Date());
    },
    options: {
      rule: "0 8 16  * * 1-6",
      // rule: "*/10 *  *  * * *",
      tz: "Asia/Ulaanbaatar",
    },
  },
};
