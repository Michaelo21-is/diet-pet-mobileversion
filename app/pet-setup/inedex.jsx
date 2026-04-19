import { useState } from "react";
import axios from "axios";
import { accessToken, setAccessToken } from "../../contex/AuthContext"
import { Alert } from "react-native";
const petSetupPage = () =>{
    const [formData, setFormData] = useState({
        PetType: (null),
        PetName: (""),
        petBreed: (""),
        petWeightKg:(null),
        birthDate: (null),
        neurered: (null),
        petImage:(null),
        tendToBeFat:(null),
        activityLevel:(null),
        averageWalkoutDistance:(null),
        averageWalkoutTime: (null),
        hasYard: (null)
    });
    const [suggestedPetBreed, setSuggestedPetBreed] = useState([]);
    async function handleOnSubmit(){
        try{
            const response = await axios.post(`${apiBaseUrl}/api/pet/create-new-pet`,
                formData,
                { headers:{
                    "Content-Type":"application/json",
                    accessToken:accessToken,
                }
            }
            )
            const responseData = response.data;
            // set response data then show it up
        }
        catch(e){
            console.log("failed to create new pet check the eror", e);
            Alert.alert("something went bad please try again later");
        }
    }
    async function perfomPrefixToFindPetBreed(prefix){
        try{
            const response = await axios.get(`${apiBaseUrl}/api/pet/perfom-prefix-for-breed`,
                {
                    headers: {
                        accessToken: accessToken,
                    }
                }
            );
            const responseData = response.data;
            setSuggestedPetBreed(responseData);
        }
        catch(e){
            Alert.alert("something went bad please try again later");
            console.log("something went bad check the server", e);
        }
    }
}
export default petSetupPage;