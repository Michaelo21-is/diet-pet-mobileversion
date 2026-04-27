import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import axios from "axios";
import { useAuth } from "../contex/AuthContext"

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter();
  const { accessToken } = useAuth();
  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;

      if (!apiBaseUrl) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/api/user/isLogedIn`, {
          headers: {
            accessToken: accessToken,
          },
        });

        const data = await response.data;
        const loggedIn = Boolean(data?.isLogedIn);

        setIsLoggedIn(loggedIn);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkIsLoggedIn();
  }, []);

  if (isLoggedIn === false) {
    return <Redirect href="/login" />;
  }

  return (
    <View className="items-center justify-center bg-black flex-1">
      <Text className="bg-white text-black justify-center">
        {isLoggedIn ? "Welcome back" : "App loaded"}
      </Text>
      <Text>hello world</Text>
    </View>
  );
};

export default HomePage;
