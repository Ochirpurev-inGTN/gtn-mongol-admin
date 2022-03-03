'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('gtnfacebook')
      .service('myService')
      .getWelcomeMessage();
  },
};
