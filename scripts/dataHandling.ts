import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
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
  const newId = uuidv4();
  const userData = { user_id: newId, ...user } as UserInterface;
  try {
    const response = await fetch(`${apiUrl}/create_user`, {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    const data = await response.json();
    console.log(data)
    return userData;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

