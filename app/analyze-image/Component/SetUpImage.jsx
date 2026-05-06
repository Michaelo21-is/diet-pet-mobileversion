import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, View } from 'react-native';
export default function SetUpImage({setAnalyzedFoodPicture, analyzedFoodPicture}){
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraOpen, setCameraOpen] = useState(false);
    function handleOpenCamera(){
        if(!permission.granted){
            return(
                <View className="p-5 justify-center">
                    <Text className="text-black font-semibold text-md">
                        We need your permission to open the camera
                    </Text>
                    <Button onPress={requestPermission} title='grant permission'/>
                </View>
            )
        }
        setCameraOpen(true);
        if(cameraOpen){
             return (
            <View className="flex-1">
                <CameraView
                facing="front"
                />

                <View className="absolute bottom-10 w-full items-center">
                <onPress
                    onPress={() => setCameraOpen(false)}
                    className="rounded-2xl bg-white px-6 py-3"
                >
                    <Text className="font-bold text-black">Close Camera</Text>
                </onPress>
                </View>
            </View>
            );
        }
    }
    return(
        <View className="flex-1 bg-[#efe1c6] px-6 pt-16 pb-8">
        <View className="absolute top-0 left-0 h-44 w-44 rounded-br-[80px] bg-[#b08968]/35" />
        <View className="absolute bottom-0 right-0 h-52 w-52 rounded-tl-[100px] bg-[#7f5539]/20"/>
            <View
                className="mt-24"
                contentContainerStyle={{ paddingBottom: 28 }}
            >

            </View>
        </View>      
    )
    
}