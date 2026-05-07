import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function ShowResult({ result, imageUri }) {
  const progressWidth = `${Math.max(0, Math.min(Number(result.foodScore), 100))}%`;
  const router = useRouter();
  const emojiForFoodSaftey = ({
    "UNSAFE": "🤢",
    "LIMITED":"🤞",
    "SAFE": "🍣 🥳🥳",
  })  
  return (
    <View className="flex-1 bg-[#f4f1ec]">
      <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
      <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="overflow-hidden rounded-b-[34px]">
            <Image source={{ uri: imageUri }} className="h-[300px] w-full" resizeMode="cover" />
        </View>

        <View className="-mt-7 rounded-t-[28px] bg-[#f4f1ec] px-5 pt-5 pb-7">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[29px] font-black text-[#1e1a17]">{result.foodName}</Text>
            </View>
            <View className="rounded-full border border-[#2d2723] px-4 py-2">
              <Text className="text-base font-bold text-[#1f1a17]">{Number(result.grams)} g</Text>
            </View>
          </View>

          <View className="mb-4 rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] px-4 py-4">
            <Text className="text-sm font-semibold text-[#6d665f]">Calories</Text>
            <Text className="mt-1 text-4xl font-black text-[#171310]">{Number(result.calories)}</Text>
          </View>

          <View className="mb-4 flex-row gap-2">
            <View className="flex-1 rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] p-3">
              <Text className="text-xs font-semibold text-[#6d665f]">Protein</Text>
              <Text className="mt-1 text-xl font-black text-[#171310]">{Number(result.protein)}g</Text>
            </View>
           
            <View className="flex-1 rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] p-3">
              <Text className="text-xs font-semibold text-[#6d665f]">Fats</Text>
              <Text className="mt-1 text-xl font-black text-[#171310]">{Number(result.fat)}g</Text>
            </View>
          </View>
          <View className="mb-5 rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] p-4">
                <Text className="text-lg font-bold text-[#1e1a17]">Safety Level</Text>
                <Text className = "text-lg font-semibold">{result.foodSafetyLevel} {emojiForFoodSaftey[result.foodSafetyLevel]}</Text>
          </View>

          <View className="mb-5 rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] p-4">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-[#1e1a17]">Health Score</Text>
              <Text className="text-lg font-black text-[#1e1a17]">{result.foodScore}/100</Text>
            </View>
            <View className="h-2 rounded-full bg-[#ded8d1]">
              <View className="h-2 rounded-full bg-[#49c95f]" style={{ width: progressWidth }} />
            </View>
          </View>

          <View>
            <Text className="mb-2 text-lg font-bold text-[#1e1a17]">AI Review</Text>
            <View className="rounded-2xl border border-[#e5dfd7] bg-[#fbfaf8] p-4">
              <Text className="text-sm leading-6 text-[#48413b]">{result.aiReview}</Text>
            </View>
          </View>
        </View>
         
      </ScrollView>
      <View className="absolute bottom-14 left-14 right-14">
            <Pressable className="flex-1 items-center justify-center rounded-full bg-black py-4" onPress={() => router.push("/")}>
            <Text className="text-base font-semibold text-white">Done</Text>
            </Pressable>
      </View>

     
    </View>
  );
}
