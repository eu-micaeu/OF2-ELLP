const API_BASE = 'http://localhost:3000'; // Ajuste a URL da sua API

// Funções para manipulação de dados de oficinas
export async function createWorkshop(data) {
  const response = await fetch(`${API_BASE}/api/workshops`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar oficina');
  return response.json();
}

export async function getAllWorkshop() {
  const response = await fetch(`${API_BASE}/api/workshops`);
  if (!response.ok) throw new Error('Erro ao buscar oficinas');
  return response.json();
}

export async function updateWorkshop(id, data) {
  const response = await fetch(`${API_BASE}/api/workshops/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar oficina');
  return response.json();
}

export async function deleteWorkshop(id) {
  const response = await fetch(`${API_BASE}/api/workshops/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar oficina');
  return response.json();
}

// Funções para manipulação de dados de classes
export async function createClass(data) {
  const response = await fetch(`${API_BASE}/api/class`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar classe');
  return response.json();
}

export async function getAllClass() {
  const response = await fetch(`${API_BASE}/api/class`);
  if (!response.ok) throw new Error('Erro ao buscar classes');
  return response.json();
}

export async function updateClass(id, data) {
  const response = await fetch(`${API_BASE}/api/class/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar classe');
  return response.json();
}

export async function deleteClass(id) {
  const response = await fetch(`${API_BASE}/api/class/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar classe');
  return response.json();
}

// Funções para manipulação de dados de alunos
export async function createStudent(data) {
  const response = await fetch(`${API_BASE}/api/student`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar aluno');
  return response.json();
}

export async function getAllStudent() {
  const response = await fetch(`${API_BASE}/api/student`);
  if (!response.ok) throw new Error('Erro ao buscar alunos');
  return response.json();
}

export async function updateStudent(id, data) {
  const response = await fetch(`${API_BASE}/api/student/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar aluno');
  return response.json();
}

export async function deleteStudent(id) {
  const response = await fetch(`${API_BASE}/api/student/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar aluno');
  return response.json();
}

// Funções para manipulação de dados de frequencia
export async function createFrequency(data) {
  const response = await fetch(`${API_BASE}/api/presences`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar frequência');
  return response.json();
}

export async function getAllFrequency() {
  const response = await fetch(`${API_BASE}/api/presences`);
  if (!response.ok) throw new Error('Erro ao buscar frequências');
  return response.json();
}

export async function updateFrequency(id, data) {
  const response = await fetch(`${API_BASE}/api/presences/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar frequência');
  return response.json();
}

export async function deleteFrequency(id) {
  const response = await fetch(`${API_BASE}/api/presences/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar frequência');
  return response.json();
}

// Funções para manipulação de dados de tutores
export async function createTutor(data) {
  const response = await fetch(`${API_BASE}/api/tutor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar tutor');
  return response.json();
}

export async function getAllTutor() {
  const response = await fetch(`${API_BASE}/api/tutor`);
  if (!response.ok) throw new Error('Erro ao buscar tutores');
  return response.json();
}

export async function updateTutor(id, data) {
  const response = await fetch(`${API_BASE}/api/tutor/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar tutor');
  return response.json();
}

export async function deleteTutor(id) {
  const response = await fetch(`${API_BASE}/api/tutor/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar tutor');
  return response.json();
}

// Funções de autenticação
export async function login(data) {
  const response = await fetch(`${API_BASE}/api/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao fazer login');
  return response.json();
}

export async function register(data) {
  const response = await fetch(`${API_BASE}/api/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao registrar usuário');
  return response.json();
}

// Funções para manipulação de dados de presença
export async function getStudentPresence(studentId) {
  const response = await fetch(`${API_BASE}/api/presences/student/${studentId}`);
  if (!response.ok) throw new Error('Erro ao buscar frequência do aluno');
  return response.json();
}

export async function getPresenceReport(studentId) {
  const response = await fetch(`${API_BASE}/api/presences/report/${studentId}`);
  if (!response.ok) throw new Error('Erro ao gerar relatório');
  return response.json();
}