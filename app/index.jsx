import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import axios from "axios";
import { useAuth } from "../contex/AuthContext"
import { checkIfTheAccessTokenIsValid } from "../services/checkIfTheAccessTokenIsValid";
import { refreshAccessToken } from "../services/refreshTokenServices"

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter();
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;
  const { accessToken, setAccessToken } = useAuth();
  useEffect(() => {
    const checkIsLoggedIn = async () => {

      async function checkIfIsLoggedIn (token){
          const response =  await axios.get(`${apiBaseUrl}/api/user/isLogedIn`, {
            headers: {
              accessToken: token,
            },
          });
          const data = await response.data;
        
        if( data === "user should need to setup his pet details" ){
          router.push("/pet-setup");
          return;
        }
        setIsLoggedIn(true);
      }
      try{
        const tokenResponse = await checkIfTheAccessTokenIsValid({accessToken});
        if(tokenResponse.shouldNavigateToLogin){router.push("/login"); return}
        if(tokenResponse.shouldSetAccessToken){setAccessToken(tokenResponse.token);}
        await checkIfIsLoggedIn(tokenResponse.token)
        return;
      } catch (e) {
        if(e.response.status !== 403){
          router.push("/login");
          return;
        }
        try{
          const newAccessToken = await refreshAccessToken();
          await checkIfIsLoggedIn(newAccessToken)
          return;
        }
        catch(e){
          router.push("/login");
        }
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
