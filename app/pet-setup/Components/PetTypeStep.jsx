import { Pressable, Text, View } from "react-native";

const petOptions = [
  { label: "DOG", value: "DOG" },
  { label: "CAT", value: "CAT" },
];

export default function PetTypeStep({ formData, setFormData, setStep }) {
  function handleSelectPetType(selectedType) {
    setFormData((prev) => ({
      ...prev,
      petType: selectedType,
    }));

  }

  return (
    <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
      <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
      <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />

      <View className="mt-40 rounded-3xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 p-9 shadow-xl">
        <Text className="text-3xl font-extrabold tracking-wide text-[#5b3a29]">
          Choose Pet Type
        </Text>
        <Text className="mt-2 text-base text-[#7f5d49]">
          Select one option to continue
        </Text>

        <View className="mt-8 flex-row justify-between gap-4">
          {petOptions.map((option) => {
            const isSelected = formData?.petType === option.value;

            return (
              <Pressable
                key={option.value}
                onPress={() => handleSelectPetType(option.value)}
                className={`flex-1 rounded-2xl px-4 py-10 ${
                  isSelected
                    ? "border-2 border-[#7f5539] bg-[#f1ddc3]"
                    : "border border-[#b08968] bg-[#fff7e6]"
                }`}
              >
                <Text className="text-center text-2xl font-extrabold tracking-widest text-[#4a2f24]">
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
