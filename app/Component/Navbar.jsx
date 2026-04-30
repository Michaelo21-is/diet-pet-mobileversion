import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
export default function Navbar(){
    const router = useRouter();

    const navItems = [
        { key: "home", icon: "home", onPress: () => router.push("/") },
        { key: "list", icon: "menu", onPress: () => router.push("/") },
        { key: "search", icon: "search", onPress: () => router.push("/") },
        { key: "settings", icon: "user", onPress: () => router.push("/") },
        { key: "add", icon: "plus-square", onPress: () => router.push("/") },
    ];

    return(
        <View className="absolute bottom-9 left-6 right-6">
            <View className="h-20 flex-row items-center justify-between rounded-[40px] border border-[#2f3b46] bg-[#111920] px-5 shadow-2xl">
                {navItems.map((item, index) => {
                    const isActive = index === 0;
                    return ( 
                        <Pressable
                            key={item.key}
                            onPress={item.onPress}
                            className={`items-center justify-center ${
                                isActive ? "h-12 w-12 rounded-full bg-[#f2f0e8]" : "h-11 w-11"
                            }`}
                        >
                            <Feather
                                name={item.icon}
                                size={22}
                                color={isActive ? "#111920" : "#f7f5ef"}
                            />
                        </Pressable>
                    );
                })}
            </View>
        </View>
    )
}
