import { useState } from "react";
import { Alert, View } from "react-native";
import WalkoutSetPage from "./Components/WalkoutSet";
import axios from "axios";
import { useAuth } from "../../contex/AuthContext";
import { checkIfTheAccessTokenIsValid } from "../../services/checkIfTheAccessTokenIsValid";
import { refreshAccessToken } from "../../services/refreshTokenServices";
import { useRouter } from "expo-router";
export default function walkoutAnalyze(){
    const router = useRouter();
    const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;
    const { accessToken, setAccessToken } = useAuth();
    const [form, setForm] = useState({
        km: "",
        duration: "",
        activityLevel: ""
    });
    const [walkOutOverView, setWalkOutOverView] = useState ({
        caloriesBurned: "",
        equivalentStandardWalks: "",
        aiReview: ""
    });
    const [step, setStep] = useState(0)

    async function handleOnSubmit(){
        async function requestAnalyze(validToken){
            const response = await axios.post(`${apiBaseUrl}/api/dog/start_walk`,
                form,
                {headers:{
                    accessToken: validToken
                }}
            );
            const responseData = await response.data;
            setWalkOutOverView({
                caloriesBurned: responseData.caloriesBurned,
                equivalentStandardWalks: responseData.equivalentStandardWalks,
                activityLevel: responseData.activityLevel,
                aiReview: responseData.aiReview,
            });
        }
        const validToken = await checkIfTheAccessTokenIsValid({accessToken});
        if(validToken.shouldNavigateToLogin){
            router.push("/login");
        }
        if(validToken.shouldSetAccessToken){setAccessToken(validToken.token);}
        try{
            requestAnalyze(validToken.token)
        }
        catch(e){
            if(e.response.status !== 403){
                router.push("/");
                Alert.alert("something went bad please try again later")
            }
            const newAccessToken = await refreshAccessToken();
            setAccessToken(newAccessToken);
            requestAnalyze(newAccessToken);
        }
    }
    return (
    <View className = "flex-1">
        {step === 0 && (
        <WalkoutSetPage
            handleOnSubmit={handleOnSubmit}
            setForm={setForm}
            form={form}
        />
        )}
    </View>
    );
}