import axios from 'axios';

export async function authenticate() {
  try {
    const response = await axios.get('/api/user/authenticate/');
    return response.data.authenticated;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}