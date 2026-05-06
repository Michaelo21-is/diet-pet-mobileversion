import { Text, View } from "react-native";
import ProgressRing from "./PogressRing";
export default function MacroCard({ title, intake, unit, color, icon, total }){
    
      return (
        <View className="mr-3 w-[110px] rounded-3xl bg-[#fffaf3] p-3 shadow-sm">
          <View className="flex-row items-end">
            <Text className="text-xl font-extrabold text-[#5a3e2b]">{Math.round(intake)}</Text>
            <Text className="mb-[2px] text-xs text-[#8b6a53]">/{total}{unit}</Text>
          </View>
          <Text className="mb-3 text-[11px] text-[#8b6a53]">{title}</Text>
          <View className="items-center">
            <ProgressRing value={intake} total={total} color={color} size={62} stroke={6} iconName={icon} />
          </View>
        </View>
      );
    
}
