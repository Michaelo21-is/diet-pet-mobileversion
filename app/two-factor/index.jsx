import { useRef, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useAuth } from "../../contex/AuthContext";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const TwoFactorPage = () => {
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;  
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const { tempToken, setAccessToken, setTempToken } = useAuth();
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]);
  // On every render, code is recalculated by joining all the strings in the array into one string
  const code = codeDigits.join("");

  function handleDigitChange(value, index) {
    // kepping it to be single digit saving the last digit
    const cleanValue = value.replace(/[^0-9]/g, "").slice(-1);
    const updatedCode = [...codeDigits];
    updatedCode[index] = cleanValue;
    setCodeDigits(updatedCode);

    if (cleanValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyPress(event, index) {
    if (event.nativeEvent.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleOnSubmit() {
    if (code.length !== 6) {
      Alert.alert("code length should be 6");
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/validate_two_factor`, {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
          tempToken: tempToken,
        },
      });

      if (!response.ok) {
        Alert.alert("something went bad please try again later");
        return;
      }
      const responseData = await response.json();
      if (responseData.message !== "2FA code verified successfully") {
        Alert.alert(responseData.message);
        return;
      }
      await SecureStore.setItemAsync("access_token", responseData.accessToken);
      await SecureStore.setItemAsync("refresh_token", responseData.refreshToken);
      setAccessToken(responseData.accessToken);
      setTempToken(null);
      router.push("/set-pet");
    } catch (e) {
      Alert.alert("something went bad please try again later");
    }
  }

  return (
    <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
      <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
      <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />

      <View className="mt-40 rounded-3xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 p-6 shadow-xl">
        <Text className="text-3xl font-extrabold tracking-wide text-[#5b3a29]">
          Verify Account
        </Text>
        <Text className="mt-2 text-base text-[#7f5d49]">
          Enter the 6-digit code we sent to your email
        </Text>

        <View className="mt-8 flex-row justify-between">
          {codeDigits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              caretHidden={true}
              value={digit}
              onChangeText={(value) => handleDigitChange(value, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              className={`h-14 w-14 rounded-2xl bg-[#fff7e6] text-2xl font-bold tracking-wide text-[#4a2f24] ${
            focusedIndex === index
                ? "border-2 border-[#7f5539]"
                : "border border-[#b08968]"
            }`}
            />
          ))}
        </View>

        <Pressable
          onPress={handleOnSubmit}
          className="mt-8 rounded-2xl bg-[#7f5539] px-4 py-4"
        >
          <Text className="text-center text-base font-bold tracking-wide text-[#fff8eb]">
            Confirm
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TwoFactorPage;
