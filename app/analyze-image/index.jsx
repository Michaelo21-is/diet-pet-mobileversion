import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useRouter } from "expo-router";
import SetUpImage from "./Component/SetUpImage";
import SetUpFoodDeatils from "./Component/SetUpFoodDetials";
import axios from "axios";
import { useAuth } from "../../contex/AuthContext";
import { refreshAccessToken } from "../../services/refreshTokenServices";
import { checkIfTheAccessTokenIsValid } from "../../services/checkIfTheAccessTokenIsValid";
import ShowResult from "./Component/ShowResult";
export default function AnalyzePicture() { 
  const { setAccessToken, accessToken }  = useAuth();
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL                                                                               
  const [step, setStep] = useState(1);  
  const [analyzedFoodPicture, setAnalyzedFoodPicture] = useState({
    file: "",
    fileName:"",
    fileType:"",
    foodName: "",
    grams: "",
  });
  const [resultFromAi, setResultFromAi] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    foodName: "",
    grams: 0,
    foodScore: 0,
    foodSafetyLevel: "",
    aiReview: "",
  });
  const router = useRouter();


  async function handleOnSubmit(){
    // using FormData for uploading file to the backend
    const formData = new FormData();

    formData.append("file", {
    uri: analyzedFoodPicture.file,
    name: analyzedFoodPicture.fileName,
    type: analyzedFoodPicture.fileType,
    });
    formData.append("foodName", analyzedFoodPicture.foodName);
    formData.append("grams", analyzedFoodPicture.grams); 

    async function aiAnlyzeRequest(validToken) {
        const response = await axios.post(`${apiBaseUrl}/api/pet/analyze-food-picture`,
            formData,
            {headers:{
                accessToken: validToken,
            }}
        );
        const responseData = await response.data;
        console.log("printing the result from analyze food: ", responseData)
        setResultFromAi({
            calories: responseData.calories,
            protein: responseData.protein,
            fat: responseData.fat,
            foodName: responseData.foodName,
            grams: responseData.grams,
            foodScore: responseData.foodScore,
            foodSafetyLevel: responseData.foodSafetyLevel,
            aiReview: responseData.aiReview,
        });
    }
    const validToken = await checkIfTheAccessTokenIsValid({ accessToken });
    if(validToken.shouldNavigateToLogin){router.push("/");}
    if(validToken.shouldSetAccessToken){setAccessToken(validToken.token);}
    try{
        await aiAnlyzeRequest(validToken.token);
    }
    catch(e){
        
        if(e.response.status !== 403){
            router.push("/login");
            return;
        }
        const newAccessToken = await refreshAccessToken();
        setAccessToken(newAccessToken);
        await aiAnlyzeRequest(newAccessToken);
    }
    
  }

  return (
    <View className="flex-1 bg-black">
    {   step === 1 && (       
        <SetUpImage
            SetPicture={setAnalyzedFoodPicture}
            picture={analyzedFoodPicture.file}
            onNext={()=> setStep(2)}
        />
    )}
    {  step === 2 &&(
        <SetUpFoodDeatils 
            setFoodDeatils={setAnalyzedFoodPicture}
            FoodDeatils={analyzedFoodPicture}
            setStep={setStep}
            submit={handleOnSubmit}
            />
    )}
    {  step ===  3 && (
        <ShowResult result={resultFromAi} imageUri={analyzedFoodPicture.file}/>
    )}
    </View>
  );
}