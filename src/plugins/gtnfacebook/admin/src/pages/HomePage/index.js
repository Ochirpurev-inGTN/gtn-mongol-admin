/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { myInstance } from "../../utils/axiosInstance";
const url = "/gtnfacebook/fetchposts"; // new url for fetching posts from facebook API

const HomePage = () => {
  const btnFetchHandler = async () => {
    const res = await myInstance(url).catch((err) => () => {
      console.log("my err ==", err);
    });
  };
  return (
    <div>
      <h1>{pluginId}&apos; </h1>
      <br />
      <button
        onClick={() => btnFetchHandler()}
        style={{
          background: "lime",
          paddingLeft: "3px",
          paddingRight: "3px",
          paddingTop: "2px",
          paddingBottom: "2px ",
        }}
      >
        {" "}
        fetch posts{" "}
      </button>
    </div>
  );
};

export default memo(HomePage);
