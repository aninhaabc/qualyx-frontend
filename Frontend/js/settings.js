const API_BASE_URL = 'http://localhost:8000'; 
const CLIENTE_ID = 1; 

function switchSettings(tab) {
  ['geral','rubricas','alertas-conf','integracao','equipe'].forEach(t => {
    var nav = document.getElementById('sn-' + t);
    var content = document.getElementById('sc-' + t);
    if (nav) nav.classList.toggle('active', t === tab);
    if (content) content.style.display = t === tab ? 'block' : 'none';
  });
  
  if(tab === 'rubricas') carregarRegras();
}

let regras = [];

async function carregarRegras() {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/${CLIENTE_ID}/regras`);
    if (response.ok) {
      const data = await response.json();
      regras = data.regras || [];
    } else {
      regras = [];
    }
  } catch (error) {
    console.error("Erro de conexão com a API.", error);
    regras = []; 
  }
  renderRegras();
}

function renderRegras() {
  // 1. RENDERIZAR NA TELA DE CONFIGURAÇÕES (Editável)
  const emptyState = document.getElementById('regras-empty');
  const listState = document.getElementById('regras-list');
  const btnAdd = document.getElementById('btn-add-regra');

  if (emptyState && listState) {
    if (regras.length === 0) {
      emptyState.style.display = 'block';
      listState.style.display = 'none';
      btnAdd.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      listState.style.display = 'flex';
      btnAdd.style.display = 'inline-flex';

      listState.innerHTML = '';
      regras.forEach((regra, index) => {
        listState.innerHTML += `
          <div style="border: 1px solid var(--border); border-radius: var(--r); padding: 16px; background: var(--white); display: flex; gap: 16px; align-items: flex-end;">
            <div class="form-group" style="margin-bottom: 0; flex: 1;">
              <label class="form-label">Descrição da Regra</label>
              <input type="text" class="form-input" value="${regra.descricao}" oninput="atualizarRegra(${index}, 'descricao', this.value)" placeholder="Ex: O atendente cumpriu o script?">
            </div>
            <div class="form-group" style="margin-bottom: 0; width: 220px;">
              <label class="form-label">Modo</label>
              <select class="form-input" onchange="atualizarRegra(${index}, 'modo', this.value)">
                <option value="correspondeu" ${regra.modo === 'correspondeu' ? 'selected' : ''}>Sim/Não</option>
                <option value="nota" ${regra.modo === 'nota' ? 'selected' : ''}>Nota de Qualidade</option>
              </select>
            </div>
            <button class="btn btn-ghost btn-sm" style="color: var(--red); padding: 8px 12px; height: 37px;" onclick="removerRegra(${index})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
            </button>
          </div>
        `;
      });
    }
  }

  // 2. RENDERIZAR NO DASHBOARD (Somente Leitura + Métricas do Quadro Branco)
  const dashList = document.getElementById('dashboard-regras-list');
  if (dashList) {
    if (regras.length === 0) {
      dashList.innerHTML = '<div style="color:var(--text3); font-size:13px; text-align:center; padding: 24px; background:var(--bg); border-radius:var(--r); border: 1px dashed var(--border);">Nenhuma regra configurada no momento.</div>';
    } else {
      dashList.innerHTML = '';
      regras.forEach((regra, index) => {
        const badgeColor = regra.modo === 'nota' ? 'tag-amber' : 'tag-blue';
        const badgeText = regra.modo === 'nota' ? 'Nota' : 'Sim/Não';
        
        // MOCK DE DADOS: Simulando dados fixos baseados no index para o MVP ficar bonito
        const mockCount = 120 + (index * 34); 
        let metricHtml = '';

        if (regra.modo === 'nota') {
          const mockNota = (7.5 + (index % 5) * 0.4).toFixed(1);
          metricHtml = `
            <div style="display:flex; flex-direction:column; min-width: 120px;">
              <span style="font-size:10.5px; color:var(--text3); text-transform:uppercase; font-weight:600; letter-spacing:0.5px; margin-bottom:2px;">Média da Nota</span>
              <span style="font-size:20px; font-weight:700; color:var(--text); letter-spacing:-0.5px;">${mockNota} <span style="font-size:14px; font-weight:500; color:var(--text3)">/10</span></span>
            </div>
          `;
        } else {
          const mockSim = 65 + (index * 13 % 30);
          const mockNao = 100 - mockSim;
          metricHtml = `
            <div style="display:flex; flex-direction:column; min-width: 120px;">
              <span style="font-size:10.5px; color:var(--text3); text-transform:uppercase; font-weight:600; letter-spacing:0.5px; margin-bottom:2px;">Correspondeu</span>
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:15px; font-weight:600; color:#16a34a;">Sim: ${mockSim}%</span>
                <span style="color:var(--border);">|</span>
                <span style="font-size:15px; font-weight:600; color:var(--red);">Não: ${mockNao}%</span>
              </div>
            </div>
          `;
        }

        dashList.innerHTML += `
          <div style="border: 1px solid var(--border); border-radius: var(--r); padding: 18px 20px; background: var(--white); display: flex; flex-direction: column; gap: 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            
            <div style="display:flex; justify-content: space-between; align-items: flex-start;">
              <div style="font-size:14.5px; font-weight:600; color:var(--text);">${regra.descricao}</div>
              <span class="tag ${badgeColor}">${badgeText}</span>
            </div>

            <div style="display:flex; gap: 32px; align-items: center; border-top: 1px solid var(--border); padding-top: 14px;">
              ${metricHtml}
              
              <div style="width: 1px; height: 30px; background: var(--border);"></div>

              <div style="display:flex; flex-direction:column;">
                <span style="font-size:10.5px; color:var(--text3); text-transform:uppercase; font-weight:600; letter-spacing:0.5px; margin-bottom:2px;">Contagem</span>
                <span style="font-size:20px; font-weight:700; color:var(--text); letter-spacing:-0.5px;">${mockCount} <span style="font-size:13px; font-weight:500; color:var(--text3)">avaliações</span></span>
              </div>
            </div>

          </div>
        `;
      });
    }
  }
}

function adicionarRegra() {
  regras.push({ descricao: '', modo: 'correspondeu' });
  renderRegras();
}

function atualizarRegra(index, campo, valor) {
  regras[index][campo] = valor;
}

function removerRegra(index) {
  regras.splice(index, 1);
  renderRegras();
}

async function salvarRegras() {
  const regrasFiltradas = regras.filter(r => r.descricao.trim() !== '');
  const payload = { "cliente_id": CLIENTE_ID, "regras": regrasFiltradas };
  
  const btnSalvar = document.querySelector('#sc-rubricas .btn-success');
  const textoOriginal = btnSalvar.innerText;
  btnSalvar.innerText = "Salvando...";
  btnSalvar.disabled = true;

  try {
    const response = await fetch(`${API_BASE_URL}/rules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if(response.ok) {
      alert("Regras sincronizadas com sucesso no banco de dados!");
      await carregarRegras(); 
    } else {
      alert("Erro do Servidor ao salvar.");
    }
  } catch (error) {
    alert("Falha na comunicação com o backend.");
  } finally {
    btnSalvar.innerText = textoOriginal;
    btnSalvar.disabled = false;
  }
}