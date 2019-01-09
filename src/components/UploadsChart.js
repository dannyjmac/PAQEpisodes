import React, { Component } from "react";
import { Bar, HorizontalBar } from "react-chartjs-2";
import Responsive from "react-responsive";

const Mobile = props => <Responsive {...props} maxWidth={680} />;
const Default = props => <Responsive {...props} minWidth={681} />;

class UploadsChart extends Component {
  render() {
    const data = {
      labels: [...this.props.labels],
      datasets: [
        {
          backgroundColor: "rgb(154, 49, 42)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [...this.props.uploads]
        }
      ]
    };

    var options = {
      responsive: true,
      legend: {
        display: false
      },
      maintainAspectRatio: false
    };
    return (
      <div className="charts">
        <div className="charts__title">
          <h5> Uploads over the last 18 months (per week) </h5>
        </div>

        <div className="charts__vertical-chart">
          <Default>
            <Bar data={data} width={100} height={300} options={options} />
          </Default>
        </div>

        <div className="charts__horizontal-chart">
          <Mobile>
            <HorizontalBar
              data={data}
              width={100}
              height={900}
              options={options}
            />
          </Mobile>
        </div>
      </div>
    );
  }
}

export default UploadsChart;
