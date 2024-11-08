import { connect } from "react-redux";

const LeaderBoardPage = (props) => {
  return (
    <div>
      <table class="user-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="user-info">
                <img src="path/to/avatar1.jpg" alt="Sarah Edo" />
                <div>
                  <strong>Sarah Edo</strong>
                  <br />
                  <span>sarahedo</span>
                </div>
              </div>
            </td>
            <td>4</td>
            <td>2</td>
          </tr>
          <tr>
            <td>
              <div class="user-info">
                <img src="path/to/avatar2.jpg" alt="Mike Tsamis" />
                <div>
                  <strong>Mike Tsamis</strong>
                  <br />
                  <span>mtsamis</span>
                </div>
              </div>
            </td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>
              <div class="user-info">
                <img src="path/to/avatar3.jpg" alt="Tyler McGinnis" />
                <div>
                  <strong>Tyler McGinnis</strong>
                  <br />
                  <span>tylermcginnis</span>
                </div>
              </div>
            </td>
            <td>2</td>
            <td>2</td>
          </tr>
          <tr>
            <td>
              <div class="user-info">
                <img src="path/to/avatar4.jpg" alt="Zenobia Oshikanlu" />
                <div>
                  <strong>Zenobia Oshikanlu</strong>
                  <br />
                  <span>zoshikanlu</span>
                </div>
              </div>
            </td>
            <td>1</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = () => ({
  // tweetIds: Object.keys(tweets).sort(
  //   (a, b) => tweets[b].timestamp - tweets[a].timestamp
  // ),
});

export default connect(mapStateToProps)(LeaderBoardPage);
