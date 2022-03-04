const axios = require("axios");

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  async getFacebookPosts(pageId, pageToken) {
    console.log("my service in gtnfacebook plugin is hooked !!!! ");
    const { data } = await axios.get(
      `https://graph.facebook.com/v13.0/${pageId}/feed?fields=permalink_url,message&limit=10&access_token=${pageToken}`,
    );
    if (data) {
      return data;
    } else {
      return null;
    }
  },
});
