import { useState } from "react";
import { Pressable, Text, View, Alert, TextInput } from "react-native";
import { useRouter } from "expo-router"
import { getCalendars } from "expo-localization";
import { useAuth } from "../../contex/AuthContext";


const SignUpPage = () => {
  const { setTempToken } = useAuth();
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: (""),
    password : (""),
    timezone : (null)
  });
  function checkIfTheDeatilsValid(){
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
    if(formData.password.length < 6){
        Alert.alert("Weak password", "Password must be at least 6 characters long");
        return false;
    }  
        return true;
    }
  async function handleOnSubmit(){
    const checkIfUserDataValid = checkIfTheDeatilsValid();
    if(!checkIfUserDataValid)return;
    const deviceTimeZone = getCalendars()[0]?.timeZone ?? null;
    if(deviceTimeZone === null){
      Alert.alert(
      "Time zone not detected",
      "We couldn't detect your device time zone. Please check your device settings and try again."
      );
      return;
    }
    const payload = {
      ...formData,
      timeZone: deviceTimeZone,
    };
    try{
      const response = await fetch(`${apiBaseUrl}/api/auth/sign-up`,{
        method:"POST",
        body:JSON.stringify(payload),
        headers: {
        "Content-Type": "application/json",
      },
      })
      if(!response.ok){
        Alert.alert("something went bad please try again later");
      }
    
      const responseData = await response.json()
      if(responseData.message = "User created successfully"){
        Alert(responseData.message);
      }
      setTempToken(responseData.tempToken);
      router.push("/two-factor")
    }
    catch(e){
        console.log("SIGN UP ERROR:", e);
        console.log("API BASE URL:", apiBaseUrl);
        Alert.alert("please try again later something went wrong")
    }
  }
  return (
    <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
            <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
            <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />
    
            <View className="mt-40 rounded-3xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 p-6 shadow-xl">
                <Text className="text-3xl font-extrabold tracking-wide text-[#5b3a29]">
                        Create Account
                </Text>
                <Text className="mt-2 text-base text-[#7f5d49]">
                    Join us diet-pet and start track your journey
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
                    sign-up
                </Text>
                </Pressable>
            </View>
            <View className="mt-6 flex-row justify-center">
            <Text className="text-md tracking-wide text-[#8a6b56]">
                have alredy an account?{" "}
            </Text>

            <Pressable onPress={() => router.push("/login")}>
                <Text className="text-md font-bold tracking-wide text-[#7f5539] underline">
                Login 
                </Text>
            </Pressable>
            </View>
                    
        </View>
  );
};

export default SignUpPage;
