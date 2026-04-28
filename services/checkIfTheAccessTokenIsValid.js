import { getItemAsync } from "expo-secure-store";

export async function checkIfTheAccessTokenIsValid({ accessToken }) {
  if (!accessToken) {
    const token = await getItemAsync("accessToken");

    if (!token) {
      return {
        token: null,
        shouldSetAccessToken: false,
        shouldNavigateToLogin: true,
      };
    }

    return {
      token: token,
      shouldSetAccessToken: true,
      shouldNavigateToLogin: false,
    };
  }

  return {
    token: accessToken,
    shouldSetAccessToken: false,
    shouldNavigateToLogin: false,
  };
}