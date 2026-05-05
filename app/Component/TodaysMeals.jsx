import { View, Text } from "react-native"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
export default function TodayMeals({ foodName, calorie, protein, fat , intakeTime}){
  return(
    <View className="rounded-3xl bg-white p-3 shadow-sm">
                  <View className="flex-row">
                    <View className="mr-3 h-20 w-20 items-center justify-center rounded-2xl bg-[#f7c58f]">
                      <MaterialCommunityIcons name="food" size={32} color="#7a4f29" />
                    </View>
                    <View className="flex-1">
                      <View className="mb-1 flex-row items-start justify-between">
                        <Text className="text-lg font-semibold text-[#2d2538]">{foodName}</Text>
                        <Text className="text-xs text-[#a4a0ac]">{intakeTime}</Text>
                      </View>
                      <Text className="mb-2 text-xl font-bold text-[#2d2538]">{calorie}</Text>
                      <View className="flex-row items-center">
                        <Feather name="activity" size={13} color="#ef6f6c" />
                        <Text className="ml-1 mr-3 text-xs font-semibold text-[#9f99aa]">{protein}</Text>
                        <Feather name="wind" size={13} color="#e9a35e" />
                        <Text className="ml-1 mr-3 text-xs font-semibold text-[#9f99aa]">{fat}</Text>
                      </View>
                    </View>
                  </View>
                </View>
  )
}