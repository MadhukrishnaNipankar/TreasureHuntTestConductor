import {
  GET_NEXT_QUESTION,
  VERIFY_ANSWER,
  END_TEST,
  GET_ALL_QUESTION,
  getRandomBaseUrl,
} from "../api";

export const startTest = () => {
  return async (dispatch) => {
    try {
      localStorage.setItem("start_test", true);
      dispatch({
        type: "START_TEST",
        startTest: true,
        question: "",
        question_no: 0,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getAllQuestionCount = () => {
  const BASEURL = getRandomBaseUrl();
  return async (dispatch) => {
    try {
      const res = await fetch(BASEURL + GET_ALL_QUESTION, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "TOTAL_COUNT",
        response: data.totalQuestionCount,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const nextQuestion = () => {
  const BASEURL = getRandomBaseUrl();
  return async (dispatch) => {
    try {
      const res = await fetch(BASEURL + GET_NEXT_QUESTION, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      console.log(data);
      if (!data) throw new Error(data.message);
      dispatch({
        type: "NEXT_QUESTION",
        question: data.data.question,
        question_no: data.data.questionId,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const verifyAnswer = (answer, quesNo) => {
  const BASEURL = getRandomBaseUrl();
  return async (dispatch) => {
    try {
      const res = await fetch(BASEURL + VERIFY_ANSWER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          questionId: quesNo,
          answer: answer,
        }),
      });
      const data = await res.json();
      if (data.data.answerCorrect) {
        dispatch({
          type: "VERIFY_ANS",
          response: true,
        });
      } else {
        dispatch({
          type: "VERIFY_ANS",
          response: false,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };
};

export const endTest = (quesNo, ans) => {
  const BASEURL = getRandomBaseUrl();
  return async (dispatch) => {
    try {
      const res = await fetch(BASEURL + END_TEST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          questionId: quesNo,
          answer: ans,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "END_TEST",
      });
      alert(data.message);
      localStorage.setItem("start_test", false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
};
