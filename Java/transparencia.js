// ====== Menu Hamburguer ======
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// ====== Gráfico de Pizza ======
const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
const dadosPizza = [
  {nome: "Reforço Escolar", valor: 5000, cor: "#4CAF50"},
  {nome: "Recreação e Cultura", valor: 3000, cor: "#FF9800"},
  {nome: "Eventos Educativos", valor: 2000, cor: "#2196F3"},
  {nome: "Outros", valor: 1000, cor: "#9C27B0"}
];
let totalPizza = dadosPizza.reduce((a,b)=>a+b.valor,0);
let angInicial = 0;
dadosPizza.forEach(d => {
  let ang = d.valor / totalPizza * 2 * Math.PI;
  ctxPizza.beginPath();
  ctxPizza.moveTo(150,150);
  ctxPizza.arc(150,150,100,angInicial,angInicial+ang);
  ctxPizza.fillStyle = d.cor;
  ctxPizza.fill();
  angInicial += ang;
});

const legendaPizza = document.getElementById('legendaPizza');
dadosPizza.forEach(d => {
  const item = document.createElement('div');
  const cor = document.createElement('span');
  cor.style.backgroundColor = d.cor;
  item.appendChild(cor);
  item.appendChild(document.createTextNode(`${d.nome}: R$${d.valor}`));
  legendaPizza.appendChild(item);
});

// ====== Gráfico de Linha ======
const ctxLinha = document.getElementById('graficoLinha').getContext('2d');
const meses = ["Jan","Fev","Mar","Abr","Mai","Jun"];
const voluntarios = [10,20,25,35,45,60];

// Eixos
ctxLinha.beginPath();
ctxLinha.moveTo(50,250);
ctxLinha.lineTo(250,250); // eixo X
ctxLinha.moveTo(50,250);
ctxLinha.lineTo(50,50); // eixo Y
ctxLinha.strokeStyle = 'black';
ctxLinha.stroke();

// Linhas
ctxLinha.beginPath();
for(let i=0;i<voluntarios.length;i++){
  const x = 50 + i*40;
  const y = 250 - voluntarios[i]*3;
  if(i===0) ctxLinha.moveTo(x,y);
  else ctxLinha.lineTo(x,y);
}
ctxLinha.strokeStyle = "#2196F3";
ctxLinha.lineWidth = 2;
ctxLinha.stroke();

// Pontos
for(let i=0;i<voluntarios.length;i++){
  const x = 50 + i*40;
  const y = 250 - voluntarios[i]*3;
  ctxLinha.beginPath();
  ctxLinha.arc(x,y,4,0,2*Math.PI);
  ctxLinha.fillStyle = "#2196F3";
  ctxLinha.fill();
}

const legendaLinha = document.getElementById('legendaLinha');
meses.forEach((m,i)=>{
  const item = document.createElement('div');
  item.textContent = `${m}: ${voluntarios[i]} voluntários`;
  legendaLinha.appendChild(item);
});

// ====== Gráfico de Barras ======
const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
const regioes = [
  {nome:"Centro", valor:80, cor:"#4CAF50"},
  {nome:"Norte", valor:120, cor:"#FF9800"},
  {nome:"Sul", valor:60, cor:"#2196F3"},
  {nome:"Leste", valor:100, cor:"#9C27B0"},
  {nome:"Oeste", valor:90, cor:"#F44336"}
];

const larguraBarra = 30;

// Eixos
ctxBarras.beginPath();
ctxBarras.moveTo(40,250);
ctxBarras.lineTo(260,250); // eixo X
ctxBarras.moveTo(40,250);
ctxBarras.lineTo(40,50); // eixo Y
ctxBarras.stroke();

// Barras
regioes.forEach((r,i)=>{
  const x = 50 + i*40;
  const altura = r.valor*1.5;
  ctxBarras.fillStyle = r.cor;
  ctxBarras.fillRect(x,250-altura,larguraBarra,altura);
});

const legendaBarras = document.getElementById('legendaBarras');
regioes.forEach(r=>{
  const item = document.createElement('div');
  const cor = document.createElement('span');
  cor.style.backgroundColor = r.cor;
  item.appendChild(cor);
  item.appendChild(document.createTextNode(`${r.nome}: ${r.valor}`));
  legendaBarras.appendChild(item);
});
