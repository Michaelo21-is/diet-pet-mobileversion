import { View } from "react-native";
import { useState } from "react";
import SetUpImage from "./Component/setUpImage";
export default function analyzePicture(){
    const [analyzedFoodPicture, setAnalyzedFoodPicture] = useState({
        file: "",
        foodName:"",
        grams: ""    
    });
    return(
    <View>
        <SetUpImage setAnalyzedFoodPicture={setAnalyzedFoodPicture} analyzedFoodPicture={analyzePicture}/>
    </View>
    )
}