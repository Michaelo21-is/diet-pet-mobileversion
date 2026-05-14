import { useState } from "react";
import {View, Text, TextInput, ScrollView, Pressable} from "react-native"
import Navbar from "../../Component/Navbar"

const ACTIVITY_LEVEL_OPTIONS = [
  "CHILLWALK",
  "PLAYWALK",
  "INTENSESPORT",
];

export default function WalkoutSetPage({handleOnSubmit, setForm, form}){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function selectActivityLevel(level) {
      setForm((prev) => ({ ...prev, activityLevel: level }));
      setIsDropdownOpen(false);
    }

    return(
        <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
              <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
              <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />
        
              <ScrollView
                className="mt-40"
                contentContainerStyle={{ paddingBottom: 28 }}
                keyboardShouldPersistTaps="handled"
              >
                <View className="rounded-3xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 p-6 shadow-xl ">
                  <Text className="text-3xl font-extrabold tracking-wide text-[#5b3a29]">
                    Walkout Form
                  </Text>
                
                  <View className="mt-6">
                    <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
                      walked km
                    </Text>
                    <TextInput
                      value={form.km}
                      keyboardType="numeric"
                      onChangeText={(value) =>
                        setForm((prev) => ({ ...prev, km: value }))
                      }
                      placeholder="Enter pet calorie balance"
                      placeholderTextColor="#a88a74"
                      className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4 text-md font-semibold text-[#4a2f24]"
                    />
                  </View>  
                  <View className="mt-6">
                    <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
                      How long was the walk in min?
                    </Text>
                    <TextInput
                      value={form.duration}
                      keyboardType="numeric"
                      onChangeText={(value) =>
                        setForm((prev) => ({ ...prev, duration: value }))
                      }
                      placeholder="Enter pet calorie balance"
                      placeholderTextColor="#a88a74"
                      className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4 text-md font-semibold text-[#4a2f24]"
                    />
                  </View>

                  <View className="mt-6">
                    <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
                      Main Activity
                    </Text>

                    <Pressable
                      onPress={() => setIsDropdownOpen((prev) => !prev)}
                      className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4"
                    >
                      <View className="flex-row items-center justify-between">
                        <Text className={`text-md font-semibold ${form.activityLevel ? "text-[#4a2f24]" : "text-[#a88a74]"}`}>
                          {form.activityLevel || "Select activity level"}
                        </Text>
                      </View>
                    </Pressable>

                    {isDropdownOpen && (
                      <View className="mt-2 overflow-hidden rounded-2xl border border-[#b08968] bg-[#fff7e6]">
                        {ACTIVITY_LEVEL_OPTIONS.map((level, index) => (
                          <Pressable
                            key={level}
                            onPress={() => selectActivityLevel(level)}
                            className={`px-3 py-3 ${index !== ACTIVITY_LEVEL_OPTIONS.length - 1 ? "border-b border-[#ead6bc]" : ""}`}
                          >
                            <Text
                              className={`text-md font-semibold ${
                                form.activityLevel === level ? "text-[#7f5539]" : "text-[#4a2f24]"
                              }`}
                            >
                              {level}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
        
                 <View className="mt-5">
        
                </View>
                </View>
              </ScrollView>
              <View className = "absolute bottom-40 left-10 right-10">
                <Pressable className=" bg-[#7f5539]/80 p-5 rounded-2xl" onPress={handleOnSubmit}>
                    <Text className="text-white font-semibold text-lg text-center"> save </Text>
                </Pressable>
              </View>
              <Navbar pageNum={2}/>
            </View>
    )
}