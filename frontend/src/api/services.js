import apiClient from './client';

const authAPI = {
  register: (name, email, password) =>
    apiClient.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
};

const quizzesAPI = {
  getAll: () => apiClient.get('/quizzes'),
  getMyQuizzes: () => apiClient.get('/quizzes/my-quizzes'),
  getById: (id) => apiClient.get(`/quizzes/${id}`),
  create: (data) => apiClient.post('/quizzes', data),
  update: (id, data) => apiClient.put(`/quizzes/${id}`, data),
  delete: (id) => apiClient.delete(`/quizzes/${id}`),
  generateQuestions: (id, data) =>
    apiClient.post(`/quizzes/${id}/generate-questions`, data),
};

const questionsAPI = {
  getByQuizId: (quizId) => apiClient.get(`/questions/quiz/${quizId}`),
  submit: (data) => apiClient.post('/questions/submit', data),
  getResults: (quizId) => apiClient.get(`/questions/results/${quizId}`),
};

export { authAPI, quizzesAPI, questionsAPI };
