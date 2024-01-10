import '../style.css';
import Swal from 'sweetalert2';

const token = import.meta.env.VITE_TOKEN;
const searchList = document.getElementById('search-list');
const coinSearch = document.getElementById('coin-list');
const list = document.getElementById('list');
const coinName = document.getElementById('head-list');

function alert(text) {
  return (Swal.fire({
    title: 'Ops ...',
    text,
    icon: 'error',
    confirmButtonText: 'ok',
  }));
}

searchList.addEventListener('click', async () => {
  list.innerHTML = '';
  if (coinSearch.value.trim().length === 0) {
    return alert('Você precisa passar uma moeda');
  }
  const API_KEY = `https://v6.exchangerate-api.com/v6/${token}/latest/${coinSearch.value}`;
  try {
    const response = await fetch(`${API_KEY}`);
    const data = await response.json();
    for (const [key, value] of Object.entries(data.conversion_rates)) {
      const liList = document.createElement('li');
      liList.innerHTML = `
    <span class="coin"> <img src="./coins-svg.svg" alt=""> ${key}</span> 
    <span class="coin-value">${value}</span>`;
      list.appendChild(liList);
    }
    coinName.innerHTML = `Valores referentes a 1 ${coinSearch.value.toUpperCase()}`;
    coinSearch.value = ' ';
  } catch (err) {
    alert('Moeda não existe!');
  }
});
