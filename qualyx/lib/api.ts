const API_URL = "http://localhost:8000";

export async function getRecentResults(clienteId: number) {
  try{

    const response = await fetch(
      `${API_URL}/clientes/${clienteId}/results/recent`
    );
    console.log(response.status)
    
    if (!response.ok) {
      throw new Error("Erro ao buscar resultados");
    }
    return response.json();
  }
  catch {
    console.log("fudeu")
  }
  return;
}