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
  const response = await fetch(`${API_BASE}/workshops/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar oficina');
  return response.json();
}

export async function deleteWorkshop(id) {
  const response = await fetch(`${API_BASE}/workshops/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar oficina');
  return response.json();
}

// Funções para manipulação de dados de classes
export async function createClass(data) {
  const response = await fetch(`${API_BASE}/api/classes`, {
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
  const response = await fetch(`${API_BASE}/classes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar classe');
  return response.json();
}

export async function deleteClass(id) {
  const response = await fetch(`${API_BASE}/classes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar classe');
  return response.json();
}

// Funções para manipulação de dados de alunos
export async function createStudent(data) {
  const response = await fetch(`${API_BASE}/api/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar aluno');
  return response.json();
}

export async function getAllStudent() {
  const response = await fetch(`${API_BASE}/api/students`);
  if (!response.ok) throw new Error('Erro ao buscar alunos');
  return response.json();
}

export async function updateStudent(id, data) {
  const response = await fetch(`${API_BASE}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar aluno');
  return response.json();
}

export async function deleteStudent(id) {
  const response = await fetch(`${API_BASE}/students/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar aluno');
  return response.json();
}

// Funções para manipulação de dados de frequencia
export async function createFrequency(data) {
  const response = await fetch(`${API_BASE}/api/frequencies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar frequência');
  return response.json();
}

export async function getAllFrequency() {
  const response = await fetch(`${API_BASE}/frequencies`);
  if (!response.ok) throw new Error('Erro ao buscar frequências');
  return response.json();
}

export async function updateFrequency(id, data) {
  const response = await fetch(`${API_BASE}/frequencies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar frequência');
  return response.json();
}

export async function deleteFrequency(id) {
  const response = await fetch(`${API_BASE}/frequencies/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar frequência');
  return response.json();
}

// Funções para manipulação de dados de endereço
export async function createAddress(data) {
  const response = await fetch(`${API_BASE}/api/addresses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar endereço');
  return response.json();
}

export async function getAllAddress() {
  const response = await fetch(`${API_BASE}/addresses`);
  if (!response.ok) throw new Error('Erro ao buscar endereços');
  return response.json();
}

export async function updateAddress(id, data) {
  const response = await fetch(`${API_BASE}/addresses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar endereço');
  return response.json();
}

export async function deleteAddress(id) {
  const response = await fetch(`${API_BASE}/addresses/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar endereço');
  return response.json();
}

// Funções para manipulação de dados de usuários
export async function createUser(data) {
  const response = await fetch(`${API_BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar usuário');
  return response.json();
}

export async function getAllUser() {
  const response = await fetch(`${API_BASE}/users`);
  if (!response.ok) throw new Error('Erro ao buscar usuários');
  return response.json();
}

export async function updateUser(id, data) {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar usuário');
  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar usuário');
  return response.json();
}
