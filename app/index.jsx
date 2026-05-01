import { Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import axios from "axios";
import { useAuth } from "../contex/AuthContext"
import { checkIfTheAccessTokenIsValid } from "../services/checkIfTheAccessTokenIsValid";
import { refreshAccessToken } from "../services/refreshTokenServices"
import  Navbar  from "./Component/Navbar"
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
     <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-32">
        <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
        <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />
        <View className="absolute bottom-36 left-0 right-0 items-center">
        <Pressable className="flex-row items-center rounded-3xl border-2 border-[#7f5539] bg-[#b08968]/30 p-3">
          <Text className="text-xl text-center font-normal">
            analyze food
          </Text>

          <MaterialCommunityIcons
            className="ml-2"
            name="camera-plus"
            size={24}
            color="#1f2937"
          />
        </Pressable>
        </View>
        <Navbar pageNum={0}/>  

    </View>
  );
};

export default HomePage;
