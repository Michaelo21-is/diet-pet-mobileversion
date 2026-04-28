import { Pressable, Text, View } from "react-native";

export default function ProgressHeader({ step, setStep, totalSteps = 3 }) {

  return (
    <View className="absolute left-0 right-0 top-0 z-30 px-6 pt-12 mt-4">
      <View className=" items-center justify-between rounded-2xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 px-4 py-5">

        <Text className="text-xl font-extrabold tracking-wide text-[#5b3a29]">
          Progress {step}/{totalSteps}
        </Text>
      </View>
    </View>
  );
}
