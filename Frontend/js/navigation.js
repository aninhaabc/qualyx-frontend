async function show(id) {
  try {
    const response = await fetch(`pages/${id}.html`);
    if (!response.ok) throw new Error('Página não encontrada');
    const html = await response.text();
    
    document.getElementById('app').innerHTML = html;
    window.scrollTo(0, 0);

    // Reinicializa os gráficos
    if (typeof chartsInit !== 'undefined') chartsInit = false; 
    if (typeof initCharts === 'function') initCharts();

    // Atualiza as regras caso o usuário abra o Dashboard ou as Configurações
    if ((id === 'dashboard' || id === 'configuracoes') && typeof carregarRegras === 'function') {
      carregarRegras();
    }

  } catch(error) {
    console.error("Erro no roteamento:", error);
    document.getElementById('app').innerHTML = `
      <div style="padding: 48px; text-align: center; color: #ef4444; font-weight: 500;">
        Erro ao carregar a página <b>${id}</b>. Verifique se o arquivo existe na pasta "pages/".
      </div>
    `;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  show('dashboard');
});