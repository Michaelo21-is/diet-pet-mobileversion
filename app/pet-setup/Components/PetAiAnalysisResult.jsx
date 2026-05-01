import { Pressable, ScrollView, Text, View } from "react-native";

function MacroRow({ label, value }) {
  return (
    <View className="mt-3 rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4">
      <Text className="text-sm font-semibold tracking-wide text-[#6f4e37]">
        {label}
      </Text>
      <Text className="mt-1 text-xl font-extrabold text-[#4a2f24]">
        {value}
      </Text>
    </View>
  );
}

export default function PetAiAnalysisResult({ result, setStep, petName, petType }) {

  function handleOnSubmit(){
    if(petType !== DOG){
      setStep((prev) => prev + 2);
      return;
    } 
    setStep((prev) => prev + 1)
  }
  

  return (
    <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
      <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
      <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />

      <ScrollView className="mt-24" contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="rounded-3xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 p-6 shadow-xl">
          <Text className="text-3xl font-extrabold tracking-wide text-[#5b3a29]">
            AI Analysis Result
          </Text>
          <Text className="mt-2 text-base text-[#7f5d49]">
            Recommended daily nutrition for {petName}
          </Text>

          <View className="mt-5 rounded-2xl border border-[#b08968] bg-[#f1ddc3] px-4 py-4">
            <Text className="text-sm font-semibold tracking-wide text-[#6f4e37]">
              Recommended Diet
            </Text>
            <Text className="mt-1 text-base font-bold text-[#4a2f24]">
              Personalized plan based on your pet details
            </Text>
          </View>

          <MacroRow label="Calories" value={result.calorie} />
          <MacroRow label="Protein" value={result.protein} />
          <MacroRow label="Fat" value={result.fat} />

          <Pressable
            onPress={() => setStep(handleOnSubmit)}
            className="mt-6 rounded-2xl bg-[#7f5539] px-6 py-4 shadow-xl"
          >
            <Text className="text-center text-base font-extrabold tracking-wide text-[#fff8eb]">
              Continue
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}