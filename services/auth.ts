import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const ACESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getAccessToken = async () => {
    return await AsyncStorage.getItem(ACESS_TOKEN_KEY);
};

export const getRefreshToken = async () => {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};

export const saveTokens = async (
    accessToken: string,
    refreshToken: string
) => {
    await AsyncStorage.setItem(ACESS_TOKEN_KEY, accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const logout = async () => {
    await AsyncStorage.removeItem(ACESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);

    router.push('../app/index');
};