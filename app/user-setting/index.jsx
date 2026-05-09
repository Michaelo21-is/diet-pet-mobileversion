import { useState, useEffect } from "react";
import { useAuth } from "../contex/AuthContext";
import { checkIfTheAccessTokenIsValid } from "../../services/checkIfTheAccessTokenIsValid";
import { refreshAccessToken } from "../../services/refreshTokenServices";
import { useRouter } from "expo-router";
import axios from "axios";
export default function UserSettingPage(){
    const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL; 
    const { accessToken, setAccessToken } = useAuth();
    const router = useRouter();
    const [form, setForm] = useState({
        petWighetKg: "",
        petCalorieBalance:"",
        petProteinBalance:"",
    })
    // is for comparing if change was been made
    const [petCurrentDeatils, setPetCurrentDeatils] = useState({
        petWighetKg: "",
        petCalorieBalance:"",
        petProteinBalance:"",
    }) 
    useEffect(() => {
        async function getPetDeatils(){
            async function requestPetDetails(validToken){
                const response = await axios.get(`${apiBaseUrl}/api/get-pet-details`,
                    {headers:{
                        accessToken: validToken,
                    }});
                const responseData = await response.data;
                setForm({
                    petWighetKg: responseData.dailyCaloriesIntake,
                    petCalorieBalance:responseData.dailyProteinIntake,
                    petProteinBalance:responseData.dailyFatIntake,
                });
                setPetCurrentDeatils({
                    petWighetKg: responseData.dailyCaloriesIntake,
                    petCalorieBalance:responseData.dailyProteinIntake,
                    petProteinBalance:responseData.dailyFatIntake,
                });    
            }
            const tokenResponse = await checkIfTheAccessTokenIsValid({accessToken});
            if(tokenResponse.shouldNavigateToLogin){
                router.push("/login");
                return;
            }     
            if(tokenResponse.shouldSetAccessToken){
                setAccessToken(tokenResponse.token);
            }
            try{
                requestPetDetails(tokenResponse.token);
            }
            catch(e){
                if(e.response.status !== 403){
                    router.push("/login");
                }
                const newToken = await refreshAccessToken();
                setAccessToken(newToken);
                requestPetDetails(newToken);
            }
        }
    },[])
    function handleOnSubmit(){

    }

}