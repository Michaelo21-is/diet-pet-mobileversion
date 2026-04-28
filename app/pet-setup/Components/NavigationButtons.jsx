import { Pressable, Text, View } from "react-native";

export default function NavigationButtons({ step, setStep, handleOnSubmit }) {
  const isFirstStep = step <= 1; 
  function handleNext() {
    if (step === 3) {
      handleOnSubmit();
    }

    setStep((prev) => prev + 1);
  }

  return (
    <View className="absolute bottom-8 right-6 z-30 flex-row gap-4">
      <Pressable
          onPress={() => !isFirstStep && setStep((prev) => Math.max(1, prev - 1))}
          disabled={isFirstStep}
          className={`rounded-2xl px-6 py-4 ${
            isFirstStep ? "bg-[#e6d7bf]" : "bg-[#7f5539]"
          }`}
        >
          <Text
            className={`text-sm font-bold ${
              isFirstStep ? "text-[#9f8b77]" : "text-[#fff8eb]"
            }`}
          >
            Back
          </Text>
      </Pressable>
      <Pressable
        onPress={handleNext}
        className="rounded-2xl bg-[#7f5539] px-6 py-4 shadow-xl"
      >
        <Text className="text-base font-extrabold tracking-wide text-[#fff8eb]">
          Next
        </Text>
      </Pressable>
    </View>
  );
}