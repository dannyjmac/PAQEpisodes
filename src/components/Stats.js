import React, { Component } from "react";
import UploadsChart from "./UploadsChart";

const url =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=50&playlistId=UUvO6uJUVJQ6SrATfsWR5_aA&key=AIzaSyAZmNaQKLqCfFbfHk8IeGf16Ll6CFnY2JM";

class Stats extends Component {
  constructor() {
    super();

    this.state = {
      episodes: [],
      episodeUploadDates: ""
    };

    this.getUploadDates = this.getUploadDates.bind(this);
    this.getEpisodes = this.getEpisodes.bind(this);
  }

  componentDidMount() {
    this.getEpisodes(url);
  }

  getEpisodes(episodesUrl) {
    if (!this.episodeUploadDates) {
      fetch(episodesUrl)
        .then(res => res.json())
        .then(data => this.getUploadDates(data));
    }
  }
  getUploadDates(episodes) {
    episodes.items.map(item =>
      this.setState({
        episodeUploadDates: [
          ...this.state.episodeUploadDates,
          item.snippet.publishedAt
        ]
      })
    );
    if (episodes.hasOwnProperty("nextPageToken")) {
      this.getEpisodes(url + "&pageToken=" + episodes.nextPageToken);
    }
    this.getUploadsWeekly();
  }

  getUploadsWeekly() {
    // Turns episodes in the state into timestamps for ease of manipulating
    let episodeDatesUnix = [];
    this.state.episodeUploadDates.forEach(item =>
      episodeDatesUnix.push(new Date(item).getTime())
    );
    // Reverses the array so that the first index 0 is the earliest date
    episodeDatesUnix = episodeDatesUnix.reverse();

    // Getting the timestamp for...

    // .. The current date
    let todaysDate = new Date();

    // .. The date 18 months ago
    let eighteenMonthsAgo = new Date();
    eighteenMonthsAgo.setDate(todaysDate.getDate() - 549);

    // 1 week in seconds
    const sevenDays = 604800;

    // Todays date timestamp
    todaysDate = todaysDate.getTime();
    eighteenMonthsAgo = eighteenMonthsAgo.getTime();
  }

  render() {
    return (
      <div>
        <UploadsChart />
      </div>
    );
  }
}

export default Stats;
