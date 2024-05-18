import React from "react";
import "./VideoComponent.css";
import bgVideo from "./WebsiteHeroVideo.mp4";
import 'bootstrap/dist/css/bootstrap.css';

const VideoComponent = () => {
  return (
    <div>
      <div className="background-video">
        <video src={bgVideo} autoPlay loop muted></video>
      </div>
    </div>
  );
};

export default VideoComponent;
