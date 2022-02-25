// 'use strict';
const axios = require("axios");
async function my() {
  const result1 = await axios.get(
    "https://graph.facebook.com/v13.0/424423691696784/feed?limit=2&fields=permalink_url,message&access_token=EAAGcgb0ZCYZCgBAIElIA5CrBi9yuvyy8rrW1JWdAEKr9rOINKOuEC9AvhuraZBp5EK7jTQYAxozbu3FknSJZAOpM5EqmlLiMOmj6oPrDwtPFLaZCHgq9recJfgvAF9re2IHIJb3E5yPyTIktPoGb15B9nPCgcbgA6eNyZCSyBX4vv0lx33plUD"
  );
  if (result1.data.data) {
    const posts = result1.data.data;
    await strapi.db
      .query("api::facebook-post.facebook-post")
      .createMany({
        data: posts.map((post) => {
          return {
            postId: post.id,
            message: post.message.slice(0, 100),
            permalink: post.permalink_url,
          };
        }),
      })
      .then((data) => {
        console.log("data from db query === ", data);
      });
  }
}
// my().catch((err) => console.log("error of strapi query func ===", err));
/**
 * facebook-post service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::facebook-post.facebook-post");
