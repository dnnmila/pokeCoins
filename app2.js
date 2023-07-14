document.addEventListener("DOMContentLoaded", function(event) {

   

    window.addEventListener("storage", ()=>{

        var NumPlayers = localStorage.getItem('numPlayers');
        var nombre1 = localStorage.getItem('nombre1');
        var nombre2 = localStorage.getItem('nombre2');
        var monedas1 = localStorage.getItem('monedas1');

        const numPlayer = document.getElementById('numPlayers').textContent = NumPlayers;
        // const panchis1 = document.getElementById('panchis1').textContent= nombre1;
        // const panchis2 = document.getElementById('panchis2').textContent =nombre2;
        // const monedas = document.getElementById('monedas1').textContent=monedas1;

    })



})
