import { connect } from "react-redux";
import { Fragment } from "react";

const Dashboard = (props) => {
  return (
    <Fragment>
      <div class="section">
        <div class="section-title">New Questions</div>
        <div class="card-container">
          <div class="card">
            <div class="card-body">
              <div class="username">mtsamis</div>
              <div class="timestamp">4:11 PM | 11/23/2021</div>
            </div>
            <button class="show-btn">Show</button>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="username">sarahedo</div>
              <div class="timestamp">5:22 PM | 3/3/2017</div>
            </div>
            <button class="show-btn">Show</button>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="username">tylermcginnis</div>
              <div class="timestamp">6:42 AM | 12/24/2016</div>
            </div>
            <button class="show-btn">Show</button>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="username">sarahedo</div>
              <div class="timestamp">10:21 PM | 6/28/2016</div>
            </div>
            <button class="show-btn">Show</button>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-title">Done</div>
        <div class="card-container">
          <div class="card">
            <div class="card-body">
              <div class="username">tylermcginnis</div>
              <div class="timestamp">6:42 AM | 12/24/2016</div>
            </div>
            <button class="show-btn">Show</button>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="username">tylermcginnis</div>
              <div class="timestamp">6:42 AM | 12/24/2016</div>
            </div>
            <button class="show-btn">Show</button>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="username">tylermcginnis</div>
              <div class="timestamp">6:42 AM | 12/24/2016</div>
            </div>
            <button class="show-btn">Show</button>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="username">tylermcginnis</div>
              <div class="timestamp">6:42 AM | 12/24/2016</div>
            </div>
            <button class="show-btn">Show</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ tweets }) => ({
  // tweetIds: Object.keys(tweets).sort(
  //   (a, b) => tweets[b].timestamp - tweets[a].timestamp
  // ),
});

export default connect(mapStateToProps)(Dashboard);
