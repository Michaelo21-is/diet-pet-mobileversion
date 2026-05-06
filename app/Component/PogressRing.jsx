import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProgressRing({value, total,color,size = 86,stroke = 8, iconName = "fire"}) {
  const clampedTotal = Math.max(total || 0, 1);
  const progress = Math.min(Math.max((value || 0) / clampedTotal, 0), 1);
  const angle = `${progress * 360}deg`;

  return (
    <View
      style={{ width: size, height: size }}
      className="items-center justify-center rounded-full bg-[#f1dfcb]"
    >
      <View
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          borderWidth: stroke,
          borderColor: "#d9c4ae",
        }}
      />

      <View
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          borderWidth: stroke,
          borderColor: color,
          borderLeftColor: "transparent",
          borderBottomColor: "transparent",
          transform: [{ rotate: angle }],
        }}
      />

      <View
        className="items-center justify-center rounded-full bg-[#fffaf3]"
        style={{ width: size - 24, height: size - 24 }}
      >
        <MaterialCommunityIcons name={iconName} size={20} color={color} />
      </View>
    </View>
  );
}
