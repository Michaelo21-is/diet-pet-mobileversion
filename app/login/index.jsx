import { useState } from "react";
import { TextInput, Alert, View, Text, Pressable } from "react-native";
import { useAuth } from "../../contex/AuthContext";
import { useRouter } from "expo-router"
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

const LoginPage = () => {
    const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;
    const router = useRouter();
    const { setAccessToken } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        });
    function checkingIfTheInputFromTheUser(){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email.trim()) {
                Alert.alert("Missing email", "Email field should not be empty");
                return false;
        }
    if(!emailRegex.test(formData.email)){
      Alert.alert("Invalid email", "Please enter a valid email address");
    return false;
    }  
    if (!formData.password.trim()) {
        Alert.alert("Missing password", "Password field should not be empty");
        return false;
      }
    
        return true;
    }
    async function handleOnSubmit(){
        const checkForm = checkingIfTheInputFromTheUser();
        if(checkForm === false)return;
        try{
            const response = await axios.post(`${apiBaseUrl}/api/auth/sign-in`,
                formData,{
                    headers:{
                        "Content-Type": "application/json",
                    }
                }
            );
            
            const data = response.data;
            if(data.message !== "Login successful"){
                Alert.alert(data.message);
                return;
            }
            router.push("/")
        }
        catch(e){

        }
        saveTokens(data.accessToken, data.refreshToken);
        
    }
    async function saveTokens(accessToken, refreshToken) {
        await SecureStore.setItemAsync('access_token', accessToken);
        await SecureStore.setItemAsync('refresh_token', refreshToken);
        setAccessToken(accessToken);
    };
    return (
    <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
        <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
        <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />

        <View className="mt-40 rounded-3xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 p-6 shadow-xl">
            <Text className="text-3xl font-extrabold tracking-wide text-[#5b3a29]">
                Welcome Back
            </Text>
            <Text className="mt-2 text-base text-[#7f5d49]">
                Sign in to your cozy pet kitchen
            </Text>

            <View className="mt-8">
                <Text className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#6f4e37]">
                    Email
                </Text>
                <TextInput
                placeholder="name@example.com"
                placeholderTextColor="#9c7b5f"
                value={formData.email}
                onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, email: text }))
                }
                className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-3 text-[#4a2f24]"
                />
            </View>

            <View className="mt-5">
                <Text className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#6f4e37]">
                    Password
                </Text>
                <TextInput
                placeholder="********"
                placeholderTextColor="#9c7b5f"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, password: text }))
                }
                className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-3 text-[#4a2f24]"
                />
            </View>

            <Pressable
            onPress={handleOnSubmit}
            className="mt-8 rounded-2xl bg-[#7f5539] px-4 py-4"
            >
            <Text className="text-center text-base font-bold tracking-wide text-[#fff8eb]">
                Log In
            </Text>
            </Pressable>
        </View>

       <View className="mt-6 flex-row justify-center">
        <Text className="text-md tracking-wide text-[#8a6b56]">
            Don’t have an account?{" "}
        </Text>

        <Pressable onPress={() => router.push("/sign-up")}>
            <Text className="text-md font-bold tracking-wide text-[#7f5539] underline">
            Create Account
            </Text>
        </Pressable>
        </View>
    </View>
);
}
export default LoginPage;

