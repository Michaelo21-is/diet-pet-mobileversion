import { View, Text, Pressable } from "react-native";
import { useRouter } from '"expo-router";'
export default function ShowResult({result, walkoutStats}){
    const router = useRouter();
    return(
        <View className="flex-1 bg-[#f4f1ec]">
        <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
        <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
              >
                <View className="-mt-7 rounded-t-[28px] bg-[#f4f1ec] px-5 pt-5 pb-7">
                  <View className="mb-4 flex-row items-center justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-[29px] font-black text-[#1e1a17]">walk out overview</Text>
                    </View>
                    
                </View>
        
                  <View className="mb-4 rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] px-4 py-4">
                    <Text className="text-sm font-semibold text-[#6d665f]">walked km:</Text>
                    <Text className="mt-1 text-4xl font-black text-[#171310]">{Number(walkoutStats.km)}</Text>
                  </View>
        
                  <View className="mb-4 flex-row gap-2">
                    <View className="flex-1 rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] p-3">
                      <Text className="text-xs font-semibold text-[#6d665f]">time walked:</Text>
                      <Text className="mt-1 text-xl font-black text-[#171310]">{Number(walkoutStats.duration)}g</Text>
                    </View>
                   
                    <View className="flex-1 rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] p-3">
                      <Text className="text-xs font-semibold text-[#6d665f]">activity level:</Text>
                      <Text className="mt-1 text-xl font-black text-[#171310]">{Number(walkoutStats.activityLevel)}g</Text>
                    </View>
                  </View>
                  <View className="mb-5 rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] p-4">
                        <Text className="text-lg font-bold text-[#1e1a17]">calorie burned:</Text>
                        <Text className = "text-lg font-semibold">{result.caloriesBurned}</Text>
                  </View>
        
                  <View className="mb-5 rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] p-4">
                    <View className="mb-3 flex-row items-center justify-between">
                      <Text className="text-lg font-bold text-[#1e1a17]">your walk with the dog is equivalent of:</Text>
                      <Text className="text-lg font-black text-[#1e1a17]">{result.equivalentStandardWalks} of walk outs</Text>
                    </View>
                  </View>
        
                  <View>
                    <Text className="mb-2 text-lg font-bold text-[#1e1a17]">AI Review:</Text>
                    <View className="rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] p-4">
                      <Text className="text-sm leading-6 text-[#48413b]">{result.aiReview}</Text>
                    </View>
                  </View>
                </View>
                 
              </ScrollView>
              <Pressable onPress={() => router.push("/")}>
                <Text>
                    Done
                </Text>
              </Pressable>
        </View>
    );
}