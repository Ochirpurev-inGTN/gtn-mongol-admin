const axios = require("axios");

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  async getFacebookPosts(pageId, pageToken, limit) {
    // console.log("my service in gtnfacebook plugin is hooked !!!! ");
    const { data } = await axios.get(
      `https://graph.facebook.com/v13.0/${pageId}/feed?fields=permalink_url,message,created_time&limit=${
        limit ? limit : 5
      }&access_token=${pageToken}`
    );
    if (data) {
      return data;
    } else {
      return null;
    }
  },
});
