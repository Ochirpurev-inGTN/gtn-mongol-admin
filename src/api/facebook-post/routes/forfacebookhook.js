module.exports = {
  routes: [
    {
      method: "GET",
      path: "/fbhookreciever",
      handler: "api::facebook-post.custom-facebook.fromFacebookHookVerfication",
      config: {
        auth: false,
      },
    },
    // {
    //   method: "POST",
    //   path: "/fbhookreciever",
    //   handler: "api::facebook-post.fromfacebookhoos.fromFacebookHook",
    //   config: {
    //     auth: false,
    //   },
    // },
  ],
};
