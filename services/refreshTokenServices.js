import axios from "axios";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { router } from "expo-router";
import { useAuth } from "../contex/AuthContext";
export async function refreshAccessToken(){
    const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;
    const { setAccessToken } = useAuth();
    const refreshToken = await getItemAsync("refreshToken");
    if(!refreshToken){
        router.push("login");
    }
    const response = await axios.post(
        `${apiBaseUrl}/api/auth/renew-access-token-by-refresh-token`,
        null,
        {
            headers:{
                refreshToken: refreshToken,
            },
        }
    );
    const responseData  =  {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
    };
    await setItemAsync("accessToken", responseData.accessToken);
    await setItemAsync("refreshToken", responseData.refreshToken);
    return accessToken;
}