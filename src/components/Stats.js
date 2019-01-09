import React, { Component } from "react";
import UploadsChart from "./UploadsChart";
import moment from "moment";

const url =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=50&playlistId=UUvO6uJUVJQ6SrATfsWR5_aA&key=AIzaSyAZmNaQKLqCfFbfHk8IeGf16Ll6CFnY2JM";

class Stats extends Component {
  constructor() {
    super();

    this.state = {
      episodeUploadDates: "",
      uploadsAWeek: [],
      labels: []
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
    let episodeDates = [];
    this.state.episodeUploadDates.forEach(item =>
      episodeDates.push(new Date(item))
    );

    // .. The current date
    let todaysDate = new Date();

    // .. The date 18 months ago
    const eighteenMonthsAgo = moment().subtract(18, "months");

    // Reverses the array so that the first index 0 is the earliest date
    episodeDates = episodeDates.reverse();

    let counter = 0,
      pastDate = 542,
      startDate = moment(eighteenMonthsAgo),
      oneWeekLater = moment().subtract(542, "days");

    const uploadsAWeek = [];

    episodeDates = episodeDates.filter(episode =>
      moment(episode).isAfter(eighteenMonthsAgo)
    );

    while (oneWeekLater.isBefore(episodeDates[episodeDates.length])) {
      episodeDates.map(episode => {
        if (
          moment(episode).isAfter(startDate) &&
          moment(episode).isBefore(oneWeekLater)
        ) {
          counter++;
        }
      });
      uploadsAWeek.push(counter);
      startDate = moment(startDate).add(7, "days");
      oneWeekLater = moment(startDate).add(7, "days");
      counter = 0;
    }

    let labels = [];
    let weekDates = eighteenMonthsAgo;
    uploadsAWeek.forEach(week => {
      labels.push(weekDates.format().substring(0, 10));
      weekDates = moment(weekDates).add(1, "weeks");
    });

    this.setState({ uploadsAWeek: uploadsAWeek, labels: labels });
  }

  render() {
    return (
      <div>
        <UploadsChart
          uploads={this.state.uploadsAWeek}
          labels={this.state.labels}
        />
      </div>
    );
  }
}

export default Stats;
