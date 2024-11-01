import { connect } from "react-redux";

const AddNewQuestionPage = (props) => {
  return (
    <div>
      <h3 className="center">Add New Question Page</h3>
    </div>
  );
};

const mapStateToProps = () => ({
  // tweetIds: Object.keys(tweets).sort(
  //   (a, b) => tweets[b].timestamp - tweets[a].timestamp
  // ),
});

export default connect(mapStateToProps)(AddNewQuestionPage);
