import { Pressable, ScrollView, Text, View } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import axios from "axios";
import { useAuth } from "../contex/AuthContext";
import { checkIfTheAccessTokenIsValid } from "../services/checkIfTheAccessTokenIsValid";
import { refreshAccessToken } from "../services/refreshTokenServices";
import Navbar from "./Component/Navbar";
import CalenderForHomePage from "./Component/Calender";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import ProgressRing from "./Component/PogressRing";
import MacroCard from "./Component/MacroCard";
import TodayMeals from "./Component/TodaysMeals";


const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [petDailyDietTrack, setPetDailyTrack] = useState({
    caloriesBalance: 0,
    proteinBalance: 0,
    fatBalance: 0,    caloriesIntake: 0,
    proteinIntake: 0,
    fatIntake: 0,
  });
  const [dogDailyWalkoutTrack, setDogDailyWalkoutTrack] = useState({
    dailyBalanceDailyWalkout: 0,
    dailyBalanceWalkoutDistance: 0,
    dailyBalanceWalkoutTime: 0,
    dailyIntakeWalkout: 0,
    dailyIntakeWalkoutDistance: 0,
    dailyIntakeWalkoutTime: 0,
  });
  const [ petEatActivity, setPetEatActivity ] = useState({
    foodName: [],
    grams: [],
    calories: [],
    fat: [],
    protein: [],
    foodImagePath: [],
    AiReview: [],
    time: []
  }); 
  const [ DogWalkoutActivity, setDogWalkoutActivity ] = useState({
    walkoutDistance: [],
    walkoutTimeMin: [],
    calorieBurned: [],
    AiReview: [],
    time: [],
  });
  const [petType, setPetType] = useState("");
  const router = useRouter();
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;
  const { accessToken, setAccessToken } = useAuth();

  async function checkIsLoggedIn() {
    async function checkIfIsLoggedIn(token) {
      const response = await axios.get(`${apiBaseUrl}/api/user/isLogedIn`, {
        headers: {
          accessToken: token,
        },
      });
      const data = await response.data;

      if (data === "user should need to setup his pet details") {
        router.push("/pet-setup");
        return;
      }
      setIsLoggedIn(true);
    }
    try {
      const tokenResponse = await checkIfTheAccessTokenIsValid({ accessToken });
      if (tokenResponse.shouldNavigateToLogin) {
        router.push("/login");
        return;
      }
      if (tokenResponse.shouldSetAccessToken) {
        setAccessToken(tokenResponse.token);
      }
      await checkIfIsLoggedIn(tokenResponse.token);
      return tokenResponse.token;
    } catch (e) {
      if (e.response?.status !== 403) {
        router.push("/login");
        return;
      }
      try {
        const newAccessToken = await refreshAccessToken();
        setAccessToken(newAccessToken);
        await checkIfIsLoggedIn(newAccessToken);
        return newAccessToken;
      } catch (_refreshError) {
        router.push("/login");
      }
    }
  }

  async function loadPetDailyTrack(validToken) {
    async function getPetDailyTrackResponse(token) {
      const response = await axios.get(`${apiBaseUrl}/api/pet/get-pet-daily-diet-track`, {
        headers: {
          accessToken: token,
        },
      });
      const responseData = await response.data;
      setPetDailyTrack({
        caloriesBalance: responseData.caloriesBalance,
        proteinBalance: responseData.proteinBalance,
        fatBalance: responseData.fatBalance,
        caloriesIntake: responseData.caloriesIntake,
        proteinIntake: responseData.proteinIntake,
        fatIntake: responseData.fatIntake,
      });
      setDogDailyWalkoutTrack({
        dailyBalanceDailyWalkout: responseData.dailyBalanceDailyWalkout,
        dailyBalanceWalkoutDistance: responseData.dailyBalanceWalkoutDistance,
        dailyBalanceWalkoutTime: responseData.dailyBalanceWalkoutTime,
        dailyIntakeWalkout: responseData.dailyIntakeWalkout,
        dailyIntakeWalkoutDistance: responseData.dailyIntakeWalkoutDistance,
        dailyIntakeWalkoutTime: responseData.dailyIntakeWalkoutTime,
      });
      setPetType(responseData.petType);
    }
    try {
      await getPetDailyTrackResponse(validToken);
    } catch (e) {
      if (e.response?.status !== 403) {
        router.push("/login");
        return;
      }
      try{
        const newAccessToken = await refreshAccessToken();
        await getPetDailyTrackResponse(newAccessToken);
        setAccessToken(newAccessToken);
      }
      catch(e){
        console.log("refreshToken Failed, error message: ", e);
        router.push("/login");
      }
    }
  }
  async function getPetDailyActivity(validToken){
    async function requestPetDailyActivity(validToken){
      const response = await axios.get(`${apiBaseUrl}/api/pet/get-pet-daily-activity`,
        { headers:{
          accessToken: validToken,
        }}
      );
      const responseData = await response.data;
      console.log(responseData);
    }
    try{
      await requestPetDailyActivity(validToken);
    }
    catch(e){
      if(e.response.status !== 403){
        router.push("/login");
        return; 
      }
      try{
        const newAccessToken = await refreshAccessToken();
        await requestPetDailyActivity(newAccessToken);
        setAccessToken(newAccessToken);
      }
      catch(e){
        console.log("refreshToken Failed, error message: ", e);
        router.push("/login");
      }
    }
  }

  useEffect(() => {
    async function initHomePage() {
      const validToken = await checkIsLoggedIn();
      if (!validToken) {
        return;
      }
      await loadPetDailyTrack(validToken);
      await getPetDailyActivity(validToken)
    }
    initHomePage();
  }, []);



  if (isLoggedIn === false) {
    return <Redirect href="/login" />;
  }

  return (
    <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-32">
        <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
        <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />

        <View className="px-6 pt-16">
          <View className="mb-5 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="mr-2 h-9 w-9 items-center justify-center rounded-xl bg-[#2d2538]">
                <MaterialCommunityIcons name="paw" size={19} color="#ffffff" />
              </View>
              <View>
                <Text className="text-2xl font-extrabold text-[#2d2538]">DietPet AI</Text>
                <Text className="text-xs text-[#9a94a4]">{petType} wellness tracker</Text>
              </View>
            </View>
          </View>

          <CalenderForHomePage className="mb-5" />
        </View>

        <View className="rounded-t-[30px] bg-[#f7f6fb] px-6 pt-7">
          <View className="mb-4 rounded-3xl bg-white px-5 py-5 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View>
                <View className="flex-row items-end">
                  <Text className="text-5xl font-extrabold text-[#2b2437]">{Math.round(petDailyDietTrack.caloriesBalance)}</Text>
                  <Text className="mb-2 text-2xl text-[#9e99a7]">/{Math.round(petDailyDietTrack.caloriesIntake)}</Text>
                </View>
                <Text className="mt-1 text-sm text-[#8f8b97]">Calories eaten</Text>
              </View>
              <ProgressRing
                value={petDailyDietTrack.caloriesIntake}
                total={petDailyDietTrack.caloriesBalance}
                color="#25222d"
                size={104}
                stroke={9}
                iconName="fire"
              />
            </View>
          </View>

          <View className="mb-2 flex-row">
            <MacroCard
              title={"Protein eaten"}
              intake={petDailyDietTrack.proteinIntake}
              total={petDailyDietTrack.proteinBalance}
              unit={"g"}
              color={"#ef6f6c"}
              icon={"food-drumstick"}
            />
            <MacroCard
              title={"Fat eatan"}
              intake={petDailyDietTrack.fatIntake}
              total={petDailyDietTrack.fatBalance}
              unit={"g"}
              color={"#6f9ceb"}
              icon={"water-outline"}
            />
          </View>

          <View className="my-4 flex-row items-center justify-center">
            <View className="h-2 w-2 rounded-full bg-[#3f3948]" />
            <View className="mx-2 h-2 w-2 rounded-full bg-[#d8d3df]" />
            <View className="h-2 w-2 rounded-full bg-[#d8d3df]" />
          </View>

          <View className="mb-4">
            <Text className="mb-3 text-2xl font-bold text-[#2d2538]">Today’s Meals</Text>
              <TodayMeals foodName={petEatActivity.foodName} protein={petEatActivity.protein} fat={petEatActivity.fat}
               calorie={petEatActivity.calories} intakeTime={petEatActivity.time} />
            
          </View>

      
        </View>

      <Navbar pageNum={0} />
    </View>
  );
};

export default HomePage;