import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function PetDetailsStep({
  formData,
  setFormData,
  suggestedPetBreed,
  perfomPrefixToFindPetBreed,
}) {
  const [isBreedFocused, setIsBreedFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const filteredBreedOptions = useMemo(
  () => (suggestedPetBreed || []).filter(Boolean),
  [suggestedPetBreed]
);

  async function handleBreedChange(value) {
    setFormData((prev) => ({ ...prev, petBreed: value }));

    if (!value.trim()) {
      return;
    }

    await perfomPrefixToFindPetBreed(value);
  }

  function handleChooseBreed(selectedBreed) {
    setFormData((prev) => ({ ...prev, petBreed: selectedBreed }));
    setIsBreedFocused(false);
  }

  async function handleUploadPetImage() {
    try {
      const permissionResponse =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResponse.status !== "granted") {
        Alert.alert("Please allow photo access to upload pet image");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (result.canceled || !result.assets?.[0]?.uri) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        petImage: result.assets[0].uri,
      }));
    } catch (e) {
      Alert.alert("Failed to pick image, please try again");
    }
  }

  const showBreedDropdown =
    isBreedFocused &&
    Boolean(formData?.petBreed?.trim()) &&
    filteredBreedOptions.length > 0;

  const selectedDate = formData?.birthDate
    ? new Date(formData.birthDate)
    : new Date();

  function formatDateToIso(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function handleDateChange(event, date) {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    if (date) {
      setFormData((prev) => ({
        ...prev,
        birthDate: formatDateToIso(date),
      }));
    }

    if (Platform.OS !== "ios") {
      setShowDatePicker(false);
    }
  }

  return (
    <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
      <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
      <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />

      <ScrollView
        className="mt-24"
        contentContainerStyle={{ paddingBottom: 28 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="rounded-3xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 p-6 shadow-xl">
          <Text className="text-3xl font-extrabold tracking-wide text-[#5b3a29]">
            Pet Details
          </Text>
          <Text className="mt-2 text-base text-[#7f5d49]">
            Fill your pet information to continue
          </Text>

          <View className="mt-6">
            <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
              Pet Name
            </Text>
            <TextInput
              value={formData?.petName || ""}
              onChangeText={(value) =>
                setFormData((prev) => ({ ...prev, petName: value }))
              }
              placeholder="Enter pet name"
              placeholderTextColor="#a88a74"
              className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4 text-base font-semibold text-[#4a2f24]"
            />
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
              Pet Breed
            </Text>
            <TextInput
              value={formData?.petBreed || ""}
              onFocus={() => setIsBreedFocused(true)}
              onBlur={() => setTimeout(() => setIsBreedFocused(false), 120)}
              onChangeText={handleBreedChange}
              placeholder="Start typing breed..."
              placeholderTextColor="#a88a74"
              className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4 text-base font-semibold text-[#4a2f24]"
            />

            {showBreedDropdown && (
              <View className="mt-2 max-h-40 overflow-hidden rounded-2xl border border-[#b08968] bg-[#fff7e6]">
                {filteredBreedOptions.slice(0, 8).map((breed) => (
                  <Pressable
                    key={breed}
                    onPress={() => handleChooseBreed(breed)}
                    className="border-b border-[#ebd9bf] px-4 py-3 last:border-b-0"
                  >
                    <Text className="text-base font-semibold text-[#4a2f24]">
                      {breed}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View className="mt-4">
            <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
              Birth Date
            </Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4"
            >
              <Text className="text-base font-semibold text-[#4a2f24]">
                {formData?.birthDate || "Select birth date"}
              </Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                maximumDate={new Date()}
                onChange={handleDateChange}
              />
            )}
          </View>

          <View className="mt-5">
            <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
              Pet Image (Optional)
            </Text>
            <Pressable
              onPress={handleUploadPetImage}
              className="rounded-2xl border border-dashed border-[#7f5539] bg-[#f1ddc3] px-4 py-4"
            >
              <Text className="text-center text-base font-bold tracking-wide text-[#5b3a29]">
                Upload Pet Image
              </Text>
            </Pressable>

            {formData?.petImage ? (
              <Image
                source={{ uri: formData.petImage }}
                className="mt-3 h-40 w-full rounded-2xl"
                resizeMode="cover"
              />
            ) : null}
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
