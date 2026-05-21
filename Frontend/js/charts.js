var chartsInit = false;
function initCharts() {
  if (chartsInit) return;
  chartsInit = true;
  setTimeout(function() {
    var gc = 'rgba(148,163,184,0.12)';
    var tc = '#94a3b8';

    if (document.getElementById('c-trend')) {
      new Chart(document.getElementById('c-trend'), {
        type: 'line',
        data: {
          labels: ['01/mar','05/mar','10/mar','15/mar','20/mar','25/mar','30/mar','04/abr','08/abr','14/abr'],
          datasets: [
            {label:'Qualidade',data:[79,78,77,76,75,74,74,73,72,72],borderColor:'#4361ee',backgroundColor:'rgba(67,97,238,0.07)',fill:true,tension:0.4,pointRadius:3,borderWidth:2},
            {label:'Clareza',data:[75,74,72,70,68,66,65,63,59,61],borderColor:'#f59e0b',fill:false,tension:0.4,pointRadius:3,borderWidth:2,borderDash:[5,3]},
            {label:'Risco',data:[10,10,11,12,12,13,13,14,15,14],borderColor:'#ef4444',fill:false,tension:0.4,pointRadius:3,borderWidth:2,borderDash:[2,3]}
          ]
        },
        options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:gc},ticks:{color:tc,font:{size:10},maxRotation:0,autoSkip:true,maxTicksLimit:6}},y:{grid:{color:gc},ticks:{color:tc,font:{size:11}},min:0,max:100}}}
      });
    }

    if (document.getElementById('c-prob')) {
      new Chart(document.getElementById('c-prob'), {
        type: 'bar',
        data: {
          labels: ['08/abr','09/abr','10/abr','11/abr','12/abr','13/abr','14/abr'],
          datasets: [{label:'Conversas afetadas (%)',data:[7,13,18,23,27,30,32],backgroundColor:'rgba(239,68,68,0.65)',borderRadius:5}]
        },
        options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:gc},ticks:{color:tc,font:{size:11}}},y:{grid:{color:gc},ticks:{color:tc,font:{size:11}},min:0,max:40}}}
      });
    }

    if (document.getElementById('c-pie')) {
      new Chart(document.getElementById('c-pie'), {
        type: 'doughnut',
        data: {labels:['Resp. indireta','Jargão técnico','Outros'],datasets:[{data:[78,14,8],backgroundColor:['#4361ee','#f59e0b','#22c55e'],borderWidth:0}]},
        options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},cutout:'60%'}
      });
    }

    if (document.getElementById('c-dist')) {
      new Chart(document.getElementById('c-dist'), {
        type: 'bar',
        data: {
          labels: ['0–20','21–40','41–60','61–80','81–100'],
          datasets: [{label:'Conversas',data:[89,145,623,2134,1841],backgroundColor:['#ef4444','#f97316','#f59e0b','#22c55e','#16a34a'],borderRadius:5}]
        },
        options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:gc},ticks:{color:tc,font:{size:11}}},y:{grid:{color:gc},ticks:{color:tc,font:{size:11}}}}}
      });
    }
  }, 100);
}