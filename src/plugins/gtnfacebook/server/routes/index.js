module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/fetchposts',
    handler: 'plugin::gtnfacebook.facebookController.miniiAction',
    config: {
        // auth: false
    }
}
];
