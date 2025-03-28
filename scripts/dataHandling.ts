import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInterface } from './interfaces';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Save data
export const saveData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Data saved!');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Retrieve data
export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

export const createUser = async (user: any) => {
  try {
    const response = await fetch(`${apiUrl}/create_user`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    const data = await response.json();
    await saveData('user', data);
    return data;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

export const getLuckyRecipe = async (user_id: string) => {
  try {
    const response = await fetch(`${apiUrl}/get_lucky_recipe`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_id: user_id}),
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}
