let users = {
  sarahedo: {
    id: "sarahedo",
    password: "password123",
    name: "Sarah Edo",
    avatarURL:
      "https://img.icons8.com/?size=100&id=110193&format=png&color=000000",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  tylermcginnis: {
    id: "tylermcginnis",
    password: "abc321",
    name: "Tyler McGinnis",
    avatarURL:
      "https://img.icons8.com/?size=100&id=8FOh48dn2E41&format=png&color=000000",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  mtsamis: {
    id: "mtsamis",
    password: "xyz123",
    name: "Mike Tsamis",
    avatarURL:
      "https://img.icons8.com/?size=100&id=0QZdwge3kLde&format=png&color=000000",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
    },
    questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
  zoshikanlu: {
    id: "zoshikanlu",
    password: "pass246",
    name: "Zenobia Oshikanlu",
    avatarURL:
      "https://img.icons8.com/?size=100&id=975TGR2GPGX1&format=png&color=000000",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
    },
    questions: [],
  },
};

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "sarahedo",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["sarahedo"],
      text: "Build our new application with Javascript",
    },
    optionTwo: {
      votes: [],
      text: "Build our new application with Typescript",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "mtsamis",
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: "hire more frontend developers",
    },
    optionTwo: {
      votes: ["mtsamis", "sarahedo"],
      text: "hire more backend developers",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "sarahedo",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "conduct a release retrospective 1 week after a release",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "conduct release retrospectives quarterly",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "tylermcginnis",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "have code reviews conducted by peers",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "have code reviews conducted by managers",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "tylermcginnis",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["tylermcginnis"],
      text: "take a course on ReactJS",
    },
    optionTwo: {
      votes: ["mtsamis"],
      text: "take a course on unit testing with Jest",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "mtsamis",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["mtsamis", "zoshikanlu"],
      text: "deploy to production once every two weeks",
    },
    optionTwo: {
      votes: ["tylermcginnis"],
      text: "deploy to production once every month",
    },
  },
};

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _loginUser({ user, password }) {
  return new Promise((resolve, reject) => {
    if (!user || !password) {
      reject("Please provide User, Password");
    }

    setTimeout(() => {
      const existUser = users[user];
      if (!existUser) {
        reject("User is not exist.");
      }

      const correctPassword = existUser?.password === password;
      if (!correctPassword) {
        reject("Password is incorrect. Please try again ..");
      }

      const response = {
        id: existUser.id,
        name: existUser.name,
        avatarURL: existUser.avatarURL,
      };

      resolve(response);
    }, 500);
  });
}

export function _getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function _saveQuestion(question) {
  return new Promise((resolve, reject) => {
    if (
      !question.optionOneText ||
      !question.optionTwoText ||
      !question.author
    ) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question);
    setTimeout(() => {
      users = {
        ...users,
        [question.author]: {
          ...users[question.author],
          questions: [
            ...users[question.author]?.questions,
            formattedQuestion.id,
          ],
        },
      };

      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };

      resolve({ questions, users });
    }, 1000);
  });
}

export function _saveQuestionAnswer({
  authedUser,
  questionId,
  newAnswer,
  currentAnswer,
}) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !questionId || !newAnswer || !currentAnswer) {
      reject(
        "Please provide authedUser, questionId, currentAnswer and newAnswer"
      );
    }

    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [questionId]: newAnswer,
          },
          questions: [
            ...users[authedUser].questions.filter((f) => f !== questionId),
            questionId,
          ],
        },
      };

      questions = {
        ...questions,
        [questionId]: {
          ...questions[questionId],
          [newAnswer]: {
            ...questions[questionId][newAnswer],
            votes: questions[questionId][newAnswer]?.votes.concat([authedUser]),
          },
          [currentAnswer]: {
            ...questions[questionId][currentAnswer],
            votes: questions[questionId][currentAnswer]?.votes.filter(
              (f) => f !== authedUser
            ),
          },
        },
      };

      resolve({ question: questions[questionId], user: users[authedUser] });
    }, 500);
  });
}

// Export for target write unit test
export { formatQuestion as _testFormatQuestion };
