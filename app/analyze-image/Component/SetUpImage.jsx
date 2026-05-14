import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, Image, Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef } from "react";
import { useRouter } from "expo-router";

export default function SetUpImage({ SetPicture, picture, onNext }) {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const cameraRef = useRef(null);

  async function takeAPicture() {
    if (!cameraRef.current) {
      return;
    }

    try {
      const data = await cameraRef.current.takePictureAsync();
      SetPicture((prev) => ({
      ...prev,
      file: data.uri,
      fileName: data.uri.split("/").pop(),
      fileType:data.uri.split(".").pop().toLowerCase(),
    }));
    } catch (e) {
      console.log("failed to take picture error message:", e);
    }
  }

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center p-5">
        <Text className="mb-4 text-center text-black font-semibold">
          We need your permission to open the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      {!picture ? (
        <>
          <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

          <View className="absolute top-20 left-5">
            <Pressable
              className="rounded-3xl bg-white p-4"
              onPress={() => router.push("/")}
            >
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </Pressable>
          </View>

          <View className="absolute bottom-14 w-full items-center">
            <Pressable onPress={takeAPicture} className="rounded-full bg-white p-5">
              <Text className="text-lg font-bold text-black">Take A Picture</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: picture }} style={{ flex: 1 }} resizeMode="cover" />

          <View className="absolute bottom-14 w-full flex-row-reverse gap-4 px-5">
            <Pressable
              onPress={() => onNext()}
              className="mr-2 w-28 items-center rounded-full bg-white py-4"
            >
              <Text className="text-base font-bold text-black">Next</Text>
            </Pressable>

            <Pressable
              onPress={() => SetPicture("")}
              className="w-28 items-center rounded-full bg-slate-50 py-4"
            >
              <Text className="text-base font-bold text-black">Retake</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}