function renderDashBoard(NumPlayers){
  
    for (var i =0; i< NumPlayers; i++ ){
        switch (i){
            case 0:
                const tablero1 = document.getElementById('P1_tablero');
                tablero1.style.display='flex';
                break;
            case 1:
                const tablero2 = document.getElementById('P2_tablero');
                tablero2.style.display='flex';
                break;
            case 2:
                const tablero3 = document.getElementById('P3_tablero');
                tablero3.style.display='flex';
                break;
            case 3:
                const tablero4 = document.getElementById('P4_tablero');
                tablero4.style.display='flex';
                break;
            case 4:
                const tablero5 = document.getElementById('P5_tablero');
                tablero5.style.display='flex';
                break;
            case 5:
                const tablero6 = document.getElementById('P6_tablero');
                tablero6.style.display='flex';
                break;
            case 6:
                const tablero7 = document.getElementById('P7_tablero');
                tablero7.style.display='flex';
                break;
            case 7:
                const tablero8 = document.getElementById('P8_tablero');
                tablero8.style.display='flex';
                break;
        }
    }

   tableros = document.querySelectorAll('.tablero');

   if (NumPlayers == 4 ){
        tableros.forEach(tablero => {
        tablero.style.width = '48vw';
        });
    }
    if(NumPlayers > 4 && NumPlayers <7){
        tableros.forEach(tablero => {
            tablero.style.width = '32vw';
            });
    }
    if( NumPlayers >6){
        tableros.forEach(tablero => {
            tablero.style.width = '24vw';
            });
    }
   

}

function recibirArregloDesdeJSON(jsonString) {
    try {
      const arreglo = JSON.parse(jsonString);
      return Array.isArray(arreglo) ? arreglo : [];
    } catch (error) {
      console.error('Error al analizar el JSON:', error);
      return [];
    }
  }

  function cambiarMedallas (jugadores){
    for( var player=0; player< jugadores; player++){
            for(var i=0 ; i<8 ; i++){
                const medalla = localStorage.getItem(`P${player+1}_medalla${i+1}`);
                const Badge = document.getElementById(`P${player+1}_medalla${i+1}`);
                if (medalla !== 'false') {
                    Badge.style.filter = "brightness(100%)";}
                else {Badge.style.filter = "brightness(30%)";}
            }}
  }

  function rendertiempo(jugadores){
    for( var player=0; player< jugadores; player++){
        var segundos = localStorage.getItem(`segundos${player+1}`);
        var minutos = localStorage.getItem(`minutos${player+1}`);
        var horas = localStorage.getItem(`horas${player+1}`);
        console.log(segundos);
        console.log(minutos);
        console.log(horas);

        const cronometro = document.getElementById(`cronometro${player+1}`).textContent= "Time: " +  horas + " : " +  minutos + " : " + segundos;
        }
  }

  function renderPokemons(jugadores){
    for(var player=0; player<jugadores;player++){
        var pokemonsJson = localStorage.getItem(`P${player+1}pokemons`);
        const Pokemons = recibirArregloDesdeJSON(pokemonsJson);
        for (let i = 0; i < Pokemons.length; i++) {
            if (Pokemons[i].nombre !== '-') {
              const elementName = document.getElementById(`P${player+1}_nombrePkm${i + 1}`);
              const elementLevel = document.getElementById(`P${player+1}_levelPkm${i + 1}`);
              elementName.textContent =  ` ${i+1}._  ${Pokemons[i].nombre}` ;
              if(Pokemons[i].estatus == "Muerto"){
                elementName.classList.add("name-dead");
              }
              else{
                elementName.classList.remove("name-dead");
              }
              elementLevel.textContent = ` ${Pokemons[i].base}  + ${Pokemons[i].extra}`;
            }
          }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {


    var NumPlayers = localStorage.getItem('numPlayers');
    renderDashBoard(NumPlayers);
   

    window.addEventListener("storage", ()=>{
        var P1nombre = localStorage.getItem('nombre1');
        var P2nombre = localStorage.getItem('nombre2');
        var P3nombre = localStorage.getItem('nombre3');
        var P4nombre = localStorage.getItem('nombre4');
        var P5nombre = localStorage.getItem('nombre5');
        var P6nombre = localStorage.getItem('nombre6');
        var P7nombre = localStorage.getItem('nombre7');
        var P8nombre = localStorage.getItem('nombre8');

        const Name1 = document.getElementById('P1_nombre').textContent = P1nombre;
        const Name2 = document.getElementById('P2_nombre').textContent = P2nombre;
        const Name3 = document.getElementById('P3_nombre').textContent = P3nombre;
        const Name4 = document.getElementById('P4_nombre').textContent = P4nombre;
        const Name5 = document.getElementById('P5_nombre').textContent = P5nombre;
        const Name6 = document.getElementById('P6_nombre').textContent = P6nombre;
        const Name7 = document.getElementById('P7_nombre').textContent = P7nombre;
        const Name8 = document.getElementById('P8_nombre').textContent = P8nombre;

        var P1monedas = localStorage.getItem('monedas1');
        var P2monedas = localStorage.getItem('monedas2');
        var P3monedas = localStorage.getItem('monedas3');
        var P4monedas = localStorage.getItem('monedas4');
        var P5monedas = localStorage.getItem('monedas5');
        var P6monedas = localStorage.getItem('monedas6');
        var P7monedas = localStorage.getItem('monedas7');
        var P8monedas = localStorage.getItem('monedas8');

        const Coins1 = document.getElementById('P1_monedas').textContent = P1monedas;
        const Coins2 = document.getElementById('P2_monedas').textContent = P2monedas;
        const Coins3 = document.getElementById('P3_monedas').textContent = P3monedas;
        const Coins4 = document.getElementById('P4_monedas').textContent = P4monedas;
        const Coins5 = document.getElementById('P5_monedas').textContent = P5monedas;
        const Coins6 = document.getElementById('P6_monedas').textContent = P6monedas;
        const Coins7 = document.getElementById('P7_monedas').textContent = P7monedas;
        const Coins8 = document.getElementById('P8_monedas').textContent = P8monedas;

        var P1posicion = localStorage.getItem('posicion1');
        var P2posicion = localStorage.getItem('posicion2');
        var P3posicion = localStorage.getItem('posicion3');
        var P4posicion = localStorage.getItem('posicion4');
        var P5posicion = localStorage.getItem('posicion5');
        var P6posicion = localStorage.getItem('posicion6');
        var P7posicion = localStorage.getItem('posicion7');
        var P8posicion = localStorage.getItem('posicion8');

        const Position1 = document.getElementById('P1_posicion').textContent = "# "+ P1posicion;
        const Position2 = document.getElementById('P2_posicion').textContent =  "# "+P2posicion;
        const Position3 = document.getElementById('P3_posicion').textContent =  "# "+P3posicion;
        const Position4 = document.getElementById('P4_posicion').textContent =  "# "+P4posicion;
        const Position5 = document.getElementById('P5_posicion').textContent =  "# "+P5posicion;
        const Position6 = document.getElementById('P6_posicion').textContent =  "# "+P6posicion;
        const Position7 = document.getElementById('P7_posicion').textContent =  "# "+P7posicion;
        const Position8 = document.getElementById('P8_posicion').textContent =  "# "+P8posicion;

       

            rendertiempo(NumPlayers)
            renderPokemons(NumPlayers);
            cambiarMedallas(NumPlayers);
            /* pendientes 5-8 */

          

    })



})
