// /src/services/api.js
/**
 * Axios API wrapper with mock endpoints for books and skills.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

// Mocked endpoints
export const getBooks = async () => {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 200));
  return [
    { id: 1, title: 'Intro to Algorithms', price: 20 },
    { id: 2, title: 'React for Beginners', price: 15 },
  ];
};

export const getSkills = async () => {
  await new Promise((r) => setTimeout(r, 200));
  return [
    { id: 1, name: 'Guitar Lessons', price: 10 },
    { id: 2, name: 'Math Tutoring', price: 12 },
  ];
};

export default api;
