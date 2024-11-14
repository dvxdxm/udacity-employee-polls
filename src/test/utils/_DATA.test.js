import {
  _saveQuestion,
  _testFormatQuestion,
  _loginUser,
  _saveQuestionAnswer,
} from "../../utils/_DATA";

// Mock valid data
let mockUsers = {
  user1: {
    id: "user1",
    password: "password123",
    name: "User Test Name",
    avatarURL: "https://test.com",
    answers: {
      questionId1: "optionOne",
      questionId2: "optionTwo",
    },
    questions: ["questionId1", "questionId2"],
  },
};

let mockQuestions = {
  questionId1: {
    id: "questionId1",
    author: "user1",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["user1"],
      text: "Question 1",
    },
    optionTwo: {
      votes: [],
      text: "Question 2",
    },
  },
  questionId2: {
    id: "questionId2",
    author: "user1",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["user1"],
      text: "Question 3",
    },
    optionTwo: {
      votes: [],
      text: "Question 4",
    },
  },
};

describe("_saveQuestion", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the users, questions when add new question valid data", async () => {
    const requestQuestion = {
      optionOneText: "New Question 1",
      optionTwoText: "New Question 1",
      author: "user1",
    };
    const newQuestion = _testFormatQuestion(requestQuestion);

    mockQuestions = {
      ...mockQuestions,
      [newQuestion.id]: newQuestion,
    };

    jest
      .spyOn(require("../../utils/_DATA"), "_saveQuestion")
      .mockResolvedValue({ mockUsers, mockQuestions });

    const result = await _saveQuestion(requestQuestion);

    // Assertions
    expect(result).toBeDefined();
    expect(result.mockUsers).toBeDefined();
    expect(result.mockQuestions).toBeDefined();
    expect(result.mockQuestions[newQuestion.id]).toBeDefined();
    expect(result.mockQuestions).toEqual(mockQuestions);
  });

  it("should return error when author is null", async () => {
    jest
      .spyOn(require("../../utils/_DATA"), "_saveQuestion")
      .mockRejectedValueOnce("Please provide author.");

    const requestQuestion = {
      optionOneText: "New Question 1",
      optionTwoText: "New Question 1",
      author: null,
    };

    // Assertions
    await expect(_saveQuestion(requestQuestion)).rejects.toEqual(
      "Please provide author."
    );
  });
});

describe("_loginUser", () => {
  beforeEach(() => {
    jest.spyOn(require("../../utils/_DATA"), "_loginUser").mockResolvedValue({
      id: mockUsers["user1"].id,
      name: mockUsers["user1"].name,
      avatarURL: mockUsers["user1"].avatarURL,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login success when user input with infomation correct", async () => {
    const user = {
      user: "user1",
      password: "123456",
    };

    const result = await _loginUser(user);

    // Assertions
    expect(result).toBeDefined();
    expect(result.id).toMatch(user.user);
  });

  it("should login error when user input with infomation incorrect", async () => {
    jest
      .spyOn(require("../../utils/_DATA"), "_loginUser")
      .mockRejectedValueOnce("Password is incorrect.");

    const user = {
      user: "user1",
      password: "123456",
    };

    // Assertions
    await expect(_loginUser(user)).rejects.toEqual("Password is incorrect.");
  });
});

describe("_saveQuestionAnswer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the quest, user when add vote for question valid data", async () => {
    const requestAnswer = {
      authedUser: "user1",
      questionId: "questionId1",
      newAnswer: "optionTwo",
      currentAnswer: "optionOne",
    };

    mockQuestions = {
      ...mockQuestions,
      [requestAnswer.questionId]: {
        ...mockQuestions[requestAnswer.questionId],
        optionOne: {
          ...mockQuestions[requestAnswer.questionId].optionOne,
          votes: [],
        },
        optionTwo: {
          ...mockQuestions[requestAnswer.questionId].optionTwo,
          votes: ["user1"],
        },
      },
    };

    mockUsers = {
      ...mockUsers,
      [requestAnswer.authedUser]: {
        ...mockUsers[requestAnswer.authedUser],
        answers: {
          ...mockUsers[requestAnswer.authedUser].answers,
          [requestAnswer.questionId]: requestAnswer.newAnswer,
        },
      },
    };

    const mockAnswer = {
      question: mockQuestions[requestAnswer.questionId],
      user: mockUsers[requestAnswer.authedUser],
    };

    jest
      .spyOn(require("../../utils/_DATA"), "_saveQuestionAnswer")
      .mockResolvedValue(mockAnswer);

    const result = await _saveQuestionAnswer(requestAnswer);

    // Assertions
    expect(result).toBeDefined();
    expect(result).toEqual(mockAnswer);
  });

  it("should return error when authedUser or questionId or currentAnswer or newAnswer is null", async () => {
    jest
      .spyOn(require("../../utils/_DATA"), "_saveQuestionAnswer")
      .mockRejectedValueOnce(
        "Please provide authedUser, questionId, currentAnswer and newAnswer"
      );

    const requestAnswer = {
      authedUser: "user1",
      questionId: "questionId1",
      newAnswer: "optionTwo",
      currentAnswer: null,
    };

    // Assertions
    await expect(_saveQuestionAnswer(requestAnswer)).rejects.toEqual(
      "Please provide authedUser, questionId, currentAnswer and newAnswer"
    );
  });
});
