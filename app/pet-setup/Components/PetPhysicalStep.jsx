import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

function BooleanField({ label, value, onSelect }) {
  return (
    <View className="mt-4">
      <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
        {label}
      </Text>
      <View className="flex-row gap-3">
        <Pressable
          onPress={() => onSelect(true)}
          className={`flex-1 rounded-2xl px-4 py-4 ${
            value === true
              ? "border-2 border-[#7f5539] bg-[#f1ddc3]"
              : "border border-[#b08968] bg-[#fff7e6]"
          }`}
        >
          <Text className="text-center text-base font-bold text-[#4a2f24]">
            TRUE
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onSelect(false)}
          className={`flex-1 rounded-2xl px-4 py-4 ${
            value === false
              ? "border-2 border-[#7f5539] bg-[#f1ddc3]"
              : "border border-[#b08968] bg-[#fff7e6]"
          }`}
        >
          <Text className="text-center text-base font-bold text-[#4a2f24]">
            FALSE
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function PetPhysicalStep({ formData, setFormData }) {
  function handleWeightChange(value) {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const normalized = cleaned.split(".").slice(0, 2).join(".");

    setFormData((prev) => ({
      ...prev,
      petWeightKg: normalized ? Number(normalized) : null,
    }));
  }

  return (
    <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
      <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
      <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />

      <ScrollView className="mt-24" contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="rounded-3xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 p-6 shadow-xl">
          <Text className="text-3xl font-extrabold tracking-wide text-[#5b3a29]">
            Physical Setup
          </Text>
          <Text className="mt-2 text-base text-[#7f5d49]">
            Fill physical details for your pet
          </Text>

          <View className="mt-6">
            <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
              
            </Text>
            <TextInput
              value={
                formData?.petWeightKg === null || formData?.petWeightKg === undefined
                  ? ""
                  : String(formData.petWeightKg)
              }
              onChangeText={handleWeightChange}
              keyboardType="decimal-pad"
              placeholder="Enter weight in kg"
              placeholderTextColor="#a88a74"
              className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4 text-base font-semibold text-[#4a2f24]"
            />
          </View>

          <BooleanField
            label="Neutered"
            value={formData?.neutered}
            onSelect={(selectedValue) =>
              setFormData((prev) => ({ ...prev, neutered: selectedValue }))
            }
          />

          <BooleanField
            label="Tend To Be Fat"
            value={formData?.tendToBeFat}
            onSelect={(selectedValue) =>
              setFormData((prev) => ({ ...prev, tendToBeFat: selectedValue }))
            }
          />

          <BooleanField
            label="Has Yard"
            value={formData?.hasYard}
            onSelect={(selectedValue) =>
              setFormData((prev) => ({ ...prev, hasYard: selectedValue }))
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}
