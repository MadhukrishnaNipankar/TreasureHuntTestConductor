const ALL_BASE_URLS = [
  "https://treasure-hunt-test-conductor-backend.vercel.app/",
  "https://treasure-hunt-test-conductor-seven.vercel.app/",
  "https://treasure-hunt-test-conductor-eiel.vercel.app/",
];

// Function to randomly select a base URL
export function getRandomBaseUrl() {
  const randomIndex = Math.floor(Math.random() * ALL_BASE_URLS.length);
  return ALL_BASE_URLS[randomIndex];
}

export const LOGIN_VERIFY_USER = "api/v1/user/";
export const GET_NEXT_QUESTION = "api/v1/user/getNextQuestion";
export const VERIFY_ANSWER = "api/v1/user/verifyAnswer";
export const END_TEST = "api/v1/user/endTest";
export const ADMIN_LOGIN = "api/v1/admin";
export const GET_ALL_USERS = "api/v1/admin/getAllUsers";
export const GET_RESULT = "api/v1/admin/getResults";
export const RESET_USER = "api/v1/admin/resetData";
export const RESET_ALL_USERS = "api/v1/admin/resetAllUserData";
export const GET_ALL_QUESTION = "api/v1/user/getTotalQuestionCount";
