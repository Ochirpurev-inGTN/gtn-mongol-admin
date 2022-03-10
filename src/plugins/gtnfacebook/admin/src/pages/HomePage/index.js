/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { myInstance } from "../../utils/axiosInstance";

const HomePage = () => {
  const [message, setmessage] = useState("");
  const [showMessage, setshowMessage] = useState(false);
  const urlMain = "/gtnfacebook/fetchpostsmain"; // new url for fetching posts from facebook API
  const urlSurgalt = "/gtnfacebook/fetchpostssurgalt"; // new url for fetching posts from facebook API

  useEffect(() => {
    setshowMessage(true);
  }, [message]);

  const btnFetchHandlerForMain = async () => {
    const res = await myInstance(urlMain).catch((err) => () => {
      console.log("my err ==", err);
    });
    if (res) {
      setmessage(res.data);
      // console.log('my res == ', res);
    }
  };
  const btnFetchHandlerForSurgalt = async () => {
    const res = await myInstance(urlSurgalt).catch((err) => () => {
      console.log("my err ==", err);
    });
    if (res) {
      setmessage(res.data);
      // console.log('my res == ', res);
    }
  };
  return (
    <div style={{ marginLeft: "8px", marginTop: "5px" }}>
      <h1>{pluginId}&apos; Custom plugin </h1>
      <br />
      <div className="" style={{ display: "flex", margin: "3px" }}>
        <button
          onClick={() => btnFetchHandlerForMain()}
          style={{
            background: "#4945ff",
            paddingLeft: "18px",
            paddingRight: "18px",
            paddingTop: "12px",
            paddingBottom: "12px ",
            color: "white",
            margin: "3px",
          }}
        >
          {" "}
          Fetch posts from Main page{" "}
        </button>
        <button
          onClick={() => btnFetchHandlerForSurgalt()}
          style={{
            background: "#4945ff",
            paddingLeft: "18px",
            paddingRight: "18px",
            paddingTop: "12px",
            paddingBottom: "12px ",
            color: "white",
            margin: "3px",
          }}
        >
          {" "}
          Fetch posts from Surgalt page{" "}
        </button>
      </div>
      {showMessage && (
        <div className="" style={{ margin: "3px" }}>
          <p className="">{message}</p>
        </div>
      )}
    </div>
  );
};

export default memo(HomePage);
