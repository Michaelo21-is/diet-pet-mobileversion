import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contex/AuthContext";
import { Alert, View } from "react-native";
import PetDetailsStep from "./Components/PetDetailsStep";
import PetPhysicalStep from "./Components/PetPhysicalStep";
import PetTypeStep from "./Components/PetTypeStep";
import ProgressHeader from "./Components/ProgressHeader";
import NavigationButtons from "./Components/NavigationButtons";

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
  const { accessToken } = useAuth();
  const [suggestedPetBreed, setSuggestedPetBreed] = useState([]);

  async function handleOnSubmit() {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/pet/create-new-pet`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
          },
        }
      );

      const responseData = response.data;
      console.log("pet created successfully", responseData);
      Alert.alert("pet created successfully");
    } catch (e) {
      console.log("failed to create new pet check the error", e);
      Alert.alert("something went bad please try again later");
    }
  }

  async function perfomPrefixToFindPetBreed(prefix) {
    try {
      console.log("prefix:", prefix);
      console.log("petType:", formData.petType);
      const response = await axios.get(
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
      const responseData = response.data;
      console.log(responseData); 
      setSuggestedPetBreed(responseData);
    } catch (e) {
      Alert.alert("something went bad please try again later");
      console.log("something went bad check the server", e);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ProgressHeader step={step} setStep={setStep} totalSteps={3} />

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

      <NavigationButtons
        step={step}
        setStep={setStep}
        handleOnSubmit={handleOnSubmit}
      />
      
    </View>
  );
};

export default PetSetupPage;
