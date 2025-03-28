import AsyncStorage from '@react-native-async-storage/async-storage';

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
