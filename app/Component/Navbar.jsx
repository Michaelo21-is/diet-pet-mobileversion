import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
export default function Navbar({ pageNum }){
    const router = useRouter();

    const navItems = [
        { key: "home", icon: "home", onPress: () => router.push("/") },
        { key: "settings", icon: "user", onPress: () => router.push("/") },
        { key: "add", icon: "plus-square", onPress: () => router.push("/") },
    ];

    return(
        <View className="absolute bottom-9">
            <View className="h-20 flex-row items-center rounded-[40px] border-white bg-[#b08968]/35 px-5 shadow-2xl gap-6 ml-4">
                {navItems.map((item, index) => {
                    const isActive = index === pageNum;
                    return ( 
                        <Pressable
                            key={item.key}
                            onPress={item.onPress}
                            className={`items-center justify-center ${
                                isActive ? "h-12 w-12 rounded-full bg-[#b08968]" : "h-11 w-11"
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
