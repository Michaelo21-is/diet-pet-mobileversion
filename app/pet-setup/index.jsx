import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contex/AuthContext";
import { Alert, View } from "react-native";
import PetDetailsStep from "./Components/PetDetailsStep";
import PetPhysicalStep from "./Components/PetPhysicalStep";
import PetTypeStep from "./Components/PetTypeStep";
import ProgressHeader from "./Components/ProgressHeader";
import NavigationButtons from "./Components/NavigationButtons";
import { refreshAccessToken } from "../../services/refreshTokenServices";
import { checkIfTheAccessTokenIsValid } from "../../services/checkIfTheAccessTokenIsValid";
import { router } from "expo-router";
import PetAiAnalysisResult from "./Components/PetAiAnalysisResult";

const PetSetupPage = () => {
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    petType: null,
    petName: "",
    petBreed: "",
    petWeightKg: null,
    birthDate: null,
    neutered: null,
    petImage: null,
    tendToBeFat: null,
    hasYard: null,
  });

  const [step, setStep] = useState(1);
  const { accessToken, setAccessToken } = useAuth();
  const [suggestedPetBreed, setSuggestedPetBreed] = useState([]);
  const [result, setResult ] = useState([]);

  async function handleOnSubmit() {
    async function createPetRequest(token) {
      const response = axios.post(
        `${apiBaseUrl}/api/pet/create-new-pet`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            accessToken: token,
          },
        }
      );
      setResult((await response).data);
    }

  try {
    const tokenResponse = await checkIfTheAccessTokenIsValid({accessToken});
    if(tokenResponse.shouldNavigateToLogin){
      router.push("/login");
      return;
    }
    if(tokenResponse.shouldSetAccessToken){
      setAccessToken(tokenResponse.token)
    }
    await createPetRequest(tokenResponse.token);
  } catch (e) {
    if (e.response?.status !== 403) {
      router.push("/login");
      return;
    }

    try {
      const newAccessToken = await refreshAccessToken();
      setAccessToken(newAccessToken);
      const retryResponse = await createPetRequest(newAccessToken);

      console.log("pet created successfully after refresh", retryResponse.data);
      Alert.alert("pet created successfully");
      router.push("/");

    } catch (refreshError) {
      console.log("failed to refresh token or retry request:", refreshError);
      Alert.alert("please login again");
      router.push("/login");
    }
  }
}

  async function perfomPrefixToFindPetBreed(prefix) {
    function perfomPrefixRequest(token){
      return await axios.get(
        `${apiBaseUrl}/api/pet/perform-prefix-for-breed`,
        {
          params: { 
            prefix,
            petType: formData.petType,
          },
          headers: {
            accessToken: accessToken,
          },
        }
      );
    }
    try {
      const tokenResponse = await checkIfTheAccessTokenIsValid({ accessToken });
      if(tokenResponse.shouldNavigateToLogin){
        router.push("/login");
        return;
      }
      if(tokenResponse.shouldSetAccessToken){setAccessToken(tokenResponse.token);}
      const response = await perfomPrefixRequest(tokenResponse.token);
      const responseData = response.data;
      setSuggestedPetBreed(responseData);
    } catch (e) {
      if(e.response.status !== 403){
          router.push("/login");
          return;
      }
      try{
        const newAccessToken = await refreshAccessToken();
        setAccessToken(newAccessToken);
        const response = await perfomPrefixRequest(accessToken);
        const responseData = response.data;
        setSuggestedPetBreed(responseData);
      }
      catch(e){
        router.push("/login");
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      { step < 4 &&
      <ProgressHeader step={step} setStep={setStep} totalSteps={3} />
      }
      {step === 1 && (
        <PetTypeStep
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <PetDetailsStep
          formData={formData}
          setFormData={setFormData}
          suggestedPetBreed={suggestedPetBreed}
          perfomPrefixToFindPetBreed={perfomPrefixToFindPetBreed}
        />
      )}

      {step === 3 && (
        <PetPhysicalStep formData={formData} setFormData={setFormData} />
      )}
      {step < 4  &&
      <NavigationButtons
        step={step}
        setStep={setStep}
        handleOnSubmit={handleOnSubmit}
      />
      }
      {step === 4 && (
        <PetAiAnalysisResult result={result} setStep={setStep}/>
      )}
      
    </View>
  );
};

export default PetSetupPage;
