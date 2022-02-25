// const axios = require('axios')
import axios from "axios";

module.exports = async () => {
    const result1 = await axios.get(
        "https://graph.facebook.com/v13.0/424423691696784/feed?fields=permalink_url,message&access_token=EAAGcgb0ZCYZCgBAIElIA5CrBi9yuvyy8rrW1JWdAEKr9rOINKOuEC9AvhuraZBp5EK7jTQYAxozbu3FknSJZAOpM5EqmlLiMOmj6oPrDwtPFLaZCHgq9recJfgvAF9re2IHIJb3E5yPyTIktPoGb15B9nPCgcbgA6eNyZCSyBX4vv0lx33plUD"
      );
      if (result1.data.data) {
        console.log("my list 1 ===", result1.data.data);
      }
}