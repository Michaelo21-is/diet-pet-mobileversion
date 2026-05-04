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
      <Text className="mb-1 text-[11px] text-[#908d98]">{day}</Text>
      <View
        className={`h-12 w-12 items-center justify-center rounded-2xl border bg-white ${
          active ? "border-[#93d36b]" : "border-[#e4deeb]"
        }`}
      >
        <Text className="text-sm font-semibold" style={{ color: active ? accent : "#6d6875" }}>
          {date}
        </Text>
      </View>
    </View>
  );
}

export default function CalenderForHomePage({ className = "mb-5" }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className={className}>
      {weekDays.map((item, idx) => (
        <DayPill
          key={`${item.day}-${item.date}`}
          day={item.day}
          date={item.date}
          active={idx === 2}
          accent={idx === 2 ? "#60bf5d" : "#d95d5d"}
        />
      ))}
    </ScrollView>
  );
}