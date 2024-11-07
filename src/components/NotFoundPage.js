import { connect } from "react-redux";

const NotFoundPage = (props) => {
  return (
    <div id="error-404" class="hidden">
      <h2>404 - Poll Not Found</h2>
      <p>Sorry, the poll you are looking for does not exist.</p>
    </div>
  );
};

const mapStateToProps = () => ({
  // tweetIds: Object.keys(tweets).sort(
  //   (a, b) => tweets[b].timestamp - tweets[a].timestamp
  // ),
});

export default connect(mapStateToProps)(NotFoundPage);
