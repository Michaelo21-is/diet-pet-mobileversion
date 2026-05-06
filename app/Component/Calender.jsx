import { ScrollView, Text, View } from "react-native";

const weekDays = [
  { day: "Sun", date: 10 },
  { day: "Mon", date: 11 },
  { day: "Tue", date: 12 },
  { day: "Wed", date: 13 },
  { day: "Thu", date: 14 },
  { day: "Fri", date: 15 },
  { day: "Sat", date: 16 },
];

function DayPill({ day, date, active, accent }) {
  return (
    <View className="mr-2 items-center">
      <Text className="mb-1 text-[11px] text-[#8b6a53]">{day}</Text>
      <View
        className={`h-12 w-12 items-center justify-center rounded-2xl border bg-[#fffaf3] ${
          active ? "border-[#b86a3f]" : "border-[#e2d2bf]"
        }`}
      >
        <Text className="text-sm font-semibold" style={{ color: active ? accent : "#7a614d" }}>
          {date}
        </Text>
      </View>
    </View>
  );
}

export default function CalenderForHomePage() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 px-4">
      {weekDays.map((item, idx) => (
        <DayPill
          key={`${item.day}-${item.date}`}
          day={item.day}
          date={item.date}
          active={idx === 2}
          accent={idx === 2 ? "#b86a3f" : "#8c7b5a"}
        />
      ))}
    </ScrollView>
  );
}
