import "../global.css";
import { Slot } from "expo-router";
import { AuthProvider } from "../contex/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot/>
    </AuthProvider>
  );
}
