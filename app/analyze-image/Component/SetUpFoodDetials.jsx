import { View, TextInput, Text, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native"
export default function SetUpFoodDeatils({setFoodDeatils, FoodDeatils, setStep, submit}){
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
                <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
                <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20" />
                <View className="rounded-3xl border border-[#8f6a50]/35 bg-[#f8efdc]/95 p-6 shadow-xl mt-40">
                            <Text className="text-3xl font-extrabold tracking-wide text-[#5b3a29]">
                            Food Deatils
                            </Text>
                            <Text className="mt-2 text-base text-[#7f5d49]">
                            this section is optional but for more accurate result should fill in
                            </Text>
                
                            <View className="mt-6">
                            <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
                                Food Name
                            </Text>
                            <TextInput
                                value={FoodDeatils.foodName}
                                onChangeText={(value) =>
                                setFoodDeatils((prev) => ({ ...prev, foodName: value }))
                                }
                                placeholder="Enter food name"
                                placeholderTextColor="#a88a74"
                                className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4 text-md font-semibold text-[#4a2f24]"
                            />
                            </View>
                            <View className="mt-6">
                            <Text className="mb-2 text-sm font-semibold tracking-wide text-[#6f4e37]">
                                food weight in grams
                            </Text>
                            <TextInput
                                value={FoodDeatils.grams}
                                onChangeText={(value) =>
                                setFoodDeatils((prev) => ({ ...prev, grams: value }))
                                }
                                placeholder="20g"
                                keyboardType="decimal-pad"
                                placeholderTextColor="#a88a74"
                                className="rounded-2xl border border-[#b08968] bg-[#fff7e6] px-4 py-4 text-md font-semibold text-[#4a2f24]"
                            />
                            </View>
                    </View>
                    <View className="absolute bottom-20 right-5 flex-row-reverse gap-3 justify-start">
                        <Pressable className = "bg-white p-5 rounded-3xl" onPress={() => {
                            setStep(3);
                            submit();
                            }}>
                            <Text className="font-semibold">
                                Next
                            </Text>
                        </Pressable>
                        <Pressable className="bg-slate-50 rounded-3xl p-5" onPress={() => setStep(1)}>
                            <Text className= "font-semibold">
                                Back
                            </Text>
                        </Pressable>
                    </View>        
            </View>
        </TouchableWithoutFeedback>
    )
}