const API_BASE = 'http://localhost:3000'; // Ajuste a URL da sua API

export async function createWorkshop(data) {
  const response = await fetch(`${API_BASE}/api/workshops`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar oficina');
  return response.json();
}

export async function getAllWorkshops() {
  const response = await fetch(`${API_BASE}/workshops`);
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
