module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/fetchpostsmain",
    handler: "plugin::gtnfacebook.facebookController.fetchMainPosts",
    config: {
      // auth: false
    },
  },
  {
    method: "GET",
    path: "/fetchpostssurgalt",
    handler: "plugin::gtnfacebook.facebookController.fetchSurgaltPosts",
    config: {
      // auth: false
    },
  },
];
