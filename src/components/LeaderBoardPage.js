import { connect } from "react-redux";

const LeaderBoardPage = (props) => {
  const { users } = props;
  let userValues = Object.values(users).sort((preUser, nextUser) => {
    let sum =
      Object.keys(nextUser.answers).length +
      nextUser.questions.length -
      (Object.keys(preUser.answers).length + preUser.questions.length);

    return sum;
  });

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {userValues.length > 0 &&
            userValues.map((item, key) => {
              return (
                <tr key={key}>
                  <td>
                    <div className="user-info">
                      <img src={item.avatarURL} alt={item.name} />
                      <div>
                        <strong>{item.name}</strong>
                        <br />
                        <span>{item.id}</span>
                      </div>
                    </div>
                  </td>
                  <td data-testid={"answered"}>
                    {Object.keys(item.answers).length}
                  </td>
                  <td>{item.questions.length}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(LeaderBoardPage);
