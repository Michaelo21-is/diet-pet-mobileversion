import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AiReview({ result }) {
  return (
    <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
      <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
      <View className="absolute right-0 bottom-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />

      <View className="mt-24 rounded-3xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 p-6 shadow-xl">
        <Text className="text-3xl font-extrabold tracking-wide text-[#5b3a29]">
          Ai review
        </Text>

        <View className="mt-[18px] rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4">
          <Text className="text-base font-semibold leading-6 text-[#4a2f24]">
            {result?.aiReview}
          </Text>
        </View>

        <Pressable
          className="mt-6 rounded-2xl bg-[#7f5539] px-6 py-4 shadow-xl"
          onPress={() => router.push("/")}
        >
          <Text className="text-center text-base font-extrabold tracking-wide text-[#fff8eb]">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
