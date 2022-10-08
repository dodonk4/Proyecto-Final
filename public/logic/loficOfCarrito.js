const stock = document.getElementsByClassName('derWarenberstand');
const cantidad = document.getElementsByClassName('dieQuantität');
const name = document.getElementById('derName');
for (let i = 0; i < 6; i++){
    cantidad[i].max = parseInt(stock[i].innerText);
}

console.log(stock[0].innerText);
console.log(cantidad);

