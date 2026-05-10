import { useState, useEffect } from "react";
import { useAuth } from "../../contex/AuthContext";
import { checkIfTheAccessTokenIsValid } from "../../services/checkIfTheAccessTokenIsValid";
import { refreshAccessToken } from "../../services/refreshTokenServices";
import { useRouter } from "expo-router";
import axios from "axios";
import { Alert, Pressable } from "react-native";
import Navbar from "../Component/Navbar";
import {View, Text, TextInput, ScrollView} from "react-native"
export default function UserSettingPage(){
    const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL; 
    const { accessToken, setAccessToken } = useAuth();
    const router = useRouter();
    const [form, setForm] = useState({
        petWighetKg: "",
        petCalorieBalance: "",
        petProteinBalance: "",
        petFatBalance: ""
    })
    // is for comparing if change was been made
    const [petCurrentDeatils, setPetCurrentDeatils] = useState({
        petWighetKg: "",
        petCalorieBalance: "",
        petProteinBalance: "",
        petFatBalance: ""
    }) 
    useEffect(() => {
        async function getPetDeatils(){
            async function requestPetDetails(validToken){
                const response = await axios.get(`${apiBaseUrl}/api/pet/get-pet-details`,
                    {headers:{
                        accessToken: validToken,
                    }});
                const responseData = await response.data;
                setForm({
                petWighetKg: String(responseData.petWeightKg),
                petCalorieBalance: String(responseData.dailyCaloriesIntake),
                petProteinBalance: String(responseData.dailyProteinIntake),
                petFatBalance: String(responseData.dailyFatIntake),
                });
                setPetCurrentDeatils({
                petWighetKg: String(responseData.petWeightKg),
                petCalorieBalance: String(responseData.dailyCaloriesIntake),
                petProteinBalance: String(responseData.dailyProteinIntake),
                petFatBalance: String(responseData.dailyFatIntake),
                }); 
            }
            const tokenResponse = await checkIfTheAccessTokenIsValid({accessToken});
            if(tokenResponse.shouldNavigateToLogin){
                router.push("/login");
                return;
            }     
            if(tokenResponse.shouldSetAccessToken){
                setAccessToken(tokenResponse.token);
            }
            try{
                requestPetDetails(tokenResponse.token);
            }
            catch(e){
                if(e.response.status !== 403){
                    Alert.alert("something bad heppen to the server pls try again later");
                    router.push("/");
                }
                const newToken = await refreshAccessToken();
                setAccessToken(newToken);
                requestPetDetails(newToken);
            }
        }
        getPetDeatils();
    },[])
    async function handleOnSubmit(){
        async function requestPetUpdate(validToken){
            const response = axios.post(`${apiBaseUrl}/api/pet/update-pet-details`,
                form,
                {headers:{
                    accessToken:validToken,
                }}
            );
            const responseData = response.data;
            Alert.alert("succesfully update");
        }
        try{
            requestPetUpdate(accessToken)
        }
        catch(e){
            if(e.response.status !== 403){
                Alert.alert("something bad heppen to the server pls try again later");
                router.push("/");
            }
            const newAccessToken = await refreshAccessToken();
            setAccessToken(newAccessToken);
            requestPetUpdate(newAccessToken);
        }
    } 

    return(
    <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
      <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
      <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />

      <ScrollView
        className="mt-32"
        contentContainerStyle={{ paddingBottom: 28 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="rounded-3xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 p-6 shadow-xl ">
          <Text className="text-3xl font-extrabold tracking-wide text-[#5b3a29]">
            pet deatils
          </Text>
        
          <View className="mt-6">
            <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
              pet weight kg
            </Text>
            <TextInput
              value={form.petWighetKg}
              keyboardType="numeric"
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, petWighetKg: value }))
              }
              placeholder="Enter pet calorie balance"
              placeholderTextColor="#a88a74"
              className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4 text-md font-semibold text-[#4a2f24]"
            />
          </View>  
          <View className="mt-6">
            <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
              calorie balance
            </Text>
            <TextInput
              value={form.petCalorieBalance}
              keyboardType="numeric"
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, petCalorieBalance: value }))
              }
              placeholder="Enter pet calorie balance"
              placeholderTextColor="#a88a74"
              className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4 text-md font-semibold text-[#4a2f24]"
            />
          </View>
          <View className="mt-6">
            <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
              perotein balance
            </Text>
            <TextInput
              value={form.petProteinBalance}
              keyboardType="numeric"
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, petProteinBalance: value }))
              }
              placeholder="Enter pet calorie balance"
              placeholderTextColor="#a88a74"
              className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4 text-md font-semibold text-[#4a2f24]"
            />
          </View>
          <View className="mt-6">
            <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
              fat balance
            </Text>
            <TextInput
              value={form.petFatBalance}
              keyboardType="numeric"
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, petFatBalance: value }))
              }
              placeholder="Enter pet calorie balance"
              placeholderTextColor="#a88a74"
              className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4 text-md font-semibold text-[#4a2f24]"
            />
          </View>

         <View className="mt-5">

        </View>
        </View>
      </ScrollView>
      <View className = "absolute bottom-52 left-10 right-10">
        <Pressable className=" bg-[#7f5539]/80 p-5 rounded-2xl" onPress={handleOnSubmit}>
            <Text className="text-white font-semibold text-lg text-center"> save </Text>
        </Pressable>
      </View>
      <Navbar pageNum={1}/>
    </View>
    )

}