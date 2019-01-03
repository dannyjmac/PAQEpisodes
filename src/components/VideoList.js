import React, { Component } from "react";
import { LoadMore } from "./LoadMore.js";

const url =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=15&playlistId=UUvO6uJUVJQ6SrATfsWR5_aA&key=AIzaSyAZmNaQKLqCfFbfHk8IeGf16Ll6CFnY2JM";

class VideoList extends Component {
  constructor() {
    super();

    this.state = {
      videoList: "",
      sections: []
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ videoList: data }));
  }

  loadMore(buttonId, pageToken) {
    const urlWithToken = url + "&pageToken=" + pageToken;
    fetch(urlWithToken)
      .then(res => res.json())
      .then(data => this.setState({ videoList: data }));
  }

  render() {
    if (this.state.videoList) {
      return (
        <div className="episodes-container">
          {this.state.videoList.items.map(item => (
            <div className="episodes">
              <img
                src={item.snippet.thumbnails.medium.url}
                width="220px"
                alt="thumbnail"
              />
              <div className="episodes__description">{item.snippet.title}</div>
            </div>
          ))}
          <LoadMore videoList={this.state.videoList} loadMore={this.loadMore} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default VideoList;
