import { View, Text } from "react-native"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
export default function TodayMeals({ foodName, calorie, protein, fat , intakeTime}){
  return(
    <View className="rounded-3xl bg-[#fffaf3] p-3 shadow-sm">
                  <View className="flex-row">
                    <View className="mr-3 h-20 w-20 items-center justify-center rounded-2xl bg-[#f1dfcb]">
                      <MaterialCommunityIcons name="food" size={32} color="#7f5539" />
                    </View>
                    <View className="flex-1">
                      <View className="mb-1 flex-row items-start justify-between">
                        <Text className="text-lg font-semibold text-[#5a3e2b]">{foodName}</Text>
                        <Text className="text-xs text-[#9a7a64]">{intakeTime}</Text>
                      </View>
                      <Text className="mb-2 text-xl font-bold text-[#5a3e2b]">{calorie}</Text>
                      <View className="flex-row items-center">
                        <Feather name="activity" size={13} color="#b86a3f" />
                        <Text className="ml-1 mr-3 text-xs font-semibold text-[#8b6a53]">{protein}</Text>
                        <Feather name="wind" size={13} color="#8c7b5a" />
                        <Text className="ml-1 mr-3 text-xs font-semibold text-[#8b6a53]">{fat}</Text>
                      </View>
                    </View>
                  </View>
                </View>
  )
}
