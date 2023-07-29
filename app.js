class Player{

    constructor(nombre, monedas,turno){
        this.nombre = nombre;
        this.monedas = monedas;
        this.pokemons = [];
        this.turno = turno;
        this.badge1 = false; 
        this.badge2 = false; 
        this.badge3 = false; 
        this.badge4 = false; 
        this.badge5 = false; 
        this.badge6 = false; 
        this.badge7 = false; 
        this.badge8 = false; 
        this.elite = false;
        this.campion = false;
        this.frontierPink = false;
        this.frontierGreen = false;
        this.frontierYellow = false;
        this.frontierBlue = false;
        this.frontierRed = false;
        this.frontierGolden = false;
        this.posicion = 0;
        this.puntos =0;
        this.segundos = 0;
        this.minutos =0;
        this.horas = 0;


        
    }

    sumarMonedas(cantidad){
        this.monedas += cantidad;
     
    }

    sumarPuntos(cantidad){
        this.puntos += cantidad;
        
    }
    
    restarMonedas(cantidad){
        this.monedas -= cantidad;
        if (this.monedas < 0 ){
            this.monedas= 0;
        }
       

    }

    restarPuntos(cantidad){
        this.puntos -= cantidad;
        if (this.puntos < 0 ){
            this.puntos= 0;
        }
       

    }

    agregarPokemon(Pokemon){
        if (this.pokemons.length < 6){
            this.pokemons.push(Pokemon);
            console.log(`¡${Pokemon.nombre} ha sido agregado a tu equipo de Pokémon!`)
        }
        else {
            console.log('No puedes tener más de 6 Pokémon en tu equipo.');
          }
    }

    quitarPokemon(nombre) {
        const indice = this.pokemones.findIndex((pokemon) => pokemon.nombre === nombre);
        if (indice !== -1) {
          const pokemonEliminado = this.pokemones.splice(indice, 1)[0];
          console.log(`¡${pokemonEliminado.nombre} ha sido eliminado de tu equipo de Pokémon!`);
        } else {
          console.log(`No tienes ningún Pokémon llamado ${nombre} en tu equipo.`);
        }
      }

    calcularPuntos(){
        this.puntos =0;
        if( this.badge1 == true){
            this.puntos += 10;}
        if( this.badge2 == true){
            this.puntos += 20;}
        if( this.badge3 == true){
            this.puntos += 30;}
        if( this.badge4 == true){
            this.puntos += 40;}
        if( this.badge5 == true){
            this.puntos += 50;}
        if( this.badge6 == true){
            this.puntos += 60;}
        if( this.badge7 == true){
            this.puntos += 70;}
        if( this.badge8 == true){
            this.puntos += 80;}
        if( this.elite == true){
            this.puntos += 50;}
        if( this.campion == true){
            this.puntos += 200;}
        if( this.frontierPink == true){
            this.puntos += 10;}
        if( this.frontierGreen == true){
            this.puntos += 10;}
        if( this.frontierYellow == true){
            this.puntos += 10;}
        if( this.frontierBlue == true){
            this.puntos += 10;}
        if( this.frontierRed == true){
            this.puntos += 10;}
        if( this.frontierGolden == true){
            this.puntos += 10;}


        this.puntos += this.monedas;

        for(var i = 0; i< this.pokemons.length;i++){
            this.puntos += (this.pokemons[i].nivel * 2);
        }



    }
}

class Pokemon {
    constructor(nombre, tipo , nivel,estatus){
        this.nombre = nombre;
        this.tipo = tipo;
        this.nivel = nivel;
        this.extra = 0;
        this.base = nivel;
        this.estatus = estatus;
        this.attack1 ="";
        this.attack2 = "";
        this.attached = "";
        this.evolution = "";
        this.LevelToEvo = "";
        this.effecto = "";
    }

    cambioEstatus(nuevoEstatus){
        this.estatus = nuevoEstatus;
    } 

    subirNivel(){
        this.nivel += 1;
        this.extra +=1;
    }
}

class Attack {
    constructor(nombre,tipo,strength,effect,dice){
        this.nombre = nombre;
        this.tipo = tipo;
        this.strength = strength;
        this.effect = effect;
        this.dice =dice;
    }
}



class Juego{
    constructor(){
        this.jugadores = []
        this.turnoActual = 0;
        this.ronda = 1;
        this.segundos = 0;
        this.minutos = 0;
        this.horas = 0;
    }

    siguienteRonda (){
        if(turnoActual > this.jugadores.length){
            this.ronda += 1;
            this.turnoActual = 1;
            console.log(`Ronda ${this.ronda} !!!.`)
        }
    }

    siguienteTurno() {
        this.turnoActual +=1;
      
      }
}
function crearJugador(nombre, modenasInicio ,turno){
    return new Player(nombre,modenasInicio,turno);
}

function crearPokemon(nombre, tipo , nivel , estatus){
    return new Pokemon(nombre, tipo,nivel,estatus);
}

async function buscarPokemon(numeroPokedex) {

        const url = `http://localhost:8000/pokemons/${numeroPokedex}`;

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
              throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            const tipoPokemon =data[4];
            const nombrePokemon = data[2];
            const levelPokemon =data[3];
            //console.log(`El nombre del Pokémon con número de Pokédex ${numeroPokedex} es: ${nombrePokemon}`);
            // Devolver el nombre del Pokémon
            return [nombrePokemon,tipoPokemon,levelPokemon];
            
          } catch (error) {
            console.error('Error:', error);
            return undefined // Opcional: Manejar el error devolviendo un valor predeterminado
          }
      
       
      
  }

function PaginaOnePlayer( Game){
    showPlayerCard();
    var turnoActual = Game.turnoActual;
   
    const playerName = document.getElementById("playerName");
    playerName.textContent = `${Game.jugadores[turnoActual].nombre}`;

    const playerCoins = document.getElementById("playerCoins");
    playerCoins.textContent = ` ${Game.jugadores[turnoActual].monedas}`;
    const badge1 = document.getElementById("badge1");
    badge1.style.filter = "brightness(25%)";
    const badge2 = document.getElementById("badge2");
    badge2.style.filter = "brightness(25%)";
    const badge3 = document.getElementById("badge3");
    badge3.style.filter = "brightness(25%)";
    const badge4 = document.getElementById("badge4");
    badge4.style.filter = "brightness(25%)";
    const badge5 = document.getElementById("badge5");
    badge5.style.filter = "brightness(25%)";
    const badge6 = document.getElementById("badge6");
    badge6.style.filter = "brightness(25%)";
    const badge7 = document.getElementById("badge7");
    badge7.style.filter = "brightness(25%)";
    const badge8 = document.getElementById("badge8");
    badge8.style.filter = "brightness(25%)";
    const elite = document.getElementById("Elite");
    elite.style.filter = "brightness(25%)";
    const campion = document.getElementById("Campion");
    campion.style.filter = "brightness(25%)";

    const frontera_pink = document.getElementById("Pink_Frontier");
    const frontera_green = document.getElementById("Green_Frontier");
    const frontera_blue= document.getElementById("Blue_Frontier");
    const frontera_yellow = document.getElementById("Yellow_Frontier");
    const frontera_red = document.getElementById("Red_Frontier");
    const frontera_golden = document.getElementById("Golden_Frontier");
    frontera_pink.style.filter = "brightness(25%)";
    frontera_green.style.filter = "brightness(25%)";
    frontera_blue.style.filter = "brightness(25%)";
    frontera_yellow.style.filter = "brightness(25%)";
    frontera_red.style.filter = "brightness(25%)";
    frontera_golden.style.filter = "brightness(25%)";

    const Pokemon1 = document.getElementById("pokemon1");
    const pokemon1_Name = document.getElementById("pkm1Name");
    const pokemon1_Type = document.getElementById("pkm1Type");
    const pokemon1_Level = document.getElementById("pkm1Level");
    const pokemon1_Status = document.getElementById("pkm1Status");

    const Pokemon2 = document.getElementById("pokemon2");
    const pokemon2_Name = document.getElementById("pkm2Name");
    const pokemon2_Type = document.getElementById("pkm2Type");
    const pokemon2_Level = document.getElementById("pkm2Level");
    const pokemon2_Status = document.getElementById("pkm2Status");

    const Pokemon3 = document.getElementById("pokemon3");
    const pokemon3_Name = document.getElementById("pkm3Name");
    const pokemon3_Type = document.getElementById("pkm3Type");
    const pokemon3_Level = document.getElementById("pkm3Level");
    const pokemon3_Status = document.getElementById("pkm3Status");

    const Pokemon4 = document.getElementById("pokemon4");
    const pokemon4_Name = document.getElementById("pkm4Name");
    const pokemon4_Type = document.getElementById("pkm4Type");
    const pokemon4_Level = document.getElementById("pkm4Level");
    const pokemon4_Status = document.getElementById("pkm4Status");

    const Pokemon5 = document.getElementById("pokemon5");
    const pokemon5_Name = document.getElementById("pkm5Name");
    const pokemon5_Type = document.getElementById("pkm5Type");
    const pokemon5_Level = document.getElementById("pkm5Level");
    const pokemon5_Status = document.getElementById("pkm5Status");

    const Pokemon6 = document.getElementById("pokemon6");
    const pokemon6_Name = document.getElementById("pkm6Name");
    const pokemon6_Type = document.getElementById("pkm6Type");
    const pokemon6_Level = document.getElementById("pkm6Level");
    const pokemon6_Status = document.getElementById("pkm6Status");

    Pokemon1.classList.add('No-Pokemon');
    Pokemon2.classList.add('No-Pokemon');
    Pokemon3.classList.add('No-Pokemon');
    Pokemon4.classList.add('No-Pokemon');
    Pokemon5.classList.add('No-Pokemon');
    Pokemon6.classList.add('No-Pokemon');
    pokemon1_Name.classList.remove("name-dead");
    pokemon2_Name.classList.remove("name-dead");
    pokemon3_Name.classList.remove("name-dead");
    pokemon4_Name.classList.remove("name-dead");
    pokemon5_Name.classList.remove("name-dead");
    pokemon6_Name.classList.remove("name-dead");

    for(var i =0; i< Game.jugadores[turnoActual].pokemons.length ;  i ++ ){
       
        switch (i) {
            case 0:
               

                pokemon1_Name.textContent = `${Game.jugadores[turnoActual].pokemons[0].nombre}`;
                pokemon1_Type.textContent = `${Game.jugadores[turnoActual].pokemons[0].tipo}`;
                pokemon1_Level.textContent = `${Game.jugadores[turnoActual].pokemons[0].nivel}`;
                pokemon1_Status.textContent = `${Game.jugadores[turnoActual].pokemons[0].estatus}`;
                Pokemon1.classList.remove('No-Pokemon');
                break;
            case 1:
                pokemon2_Name.textContent = `${Game.jugadores[turnoActual].pokemons[1].nombre}`;
                pokemon2_Type.textContent = `${Game.jugadores[turnoActual].pokemons[1].tipo}`;
                pokemon2_Level.textContent = `${Game.jugadores[turnoActual].pokemons[1].nivel}`;
                pokemon2_Status.textContent = `${Game.jugadores[turnoActual].pokemons[1].estatus}`;
                Pokemon2.classList.remove('No-Pokemon');
                break;
            case 2:
                pokemon3_Name.textContent = `${Game.jugadores[turnoActual].pokemons[2].nombre}`;
                pokemon3_Type.textContent = `${Game.jugadores[turnoActual].pokemons[2].tipo}`;
                pokemon3_Level.textContent = `${Game.jugadores[turnoActual].pokemons[2].nivel}`;
                pokemon3_Status.textContent = `${Game.jugadores[turnoActual].pokemons[2].estatus}`;
                Pokemon3.classList.remove('No-Pokemon');
                break;
            case 3:
                pokemon4_Name.textContent = `${Game.jugadores[turnoActual].pokemons[3].nombre}`;
                pokemon4_Type.textContent = `${Game.jugadores[turnoActual].pokemons[3].tipo}`;
                pokemon4_Level.textContent = `${Game.jugadores[turnoActual].pokemons[3].nivel}`;
                pokemon4_Status.textContent = `${Game.jugadores[turnoActual].pokemons[3].estatus}`;
                Pokemon4.classList.remove('No-Pokemon');
                break;
            case 4:
                pokemon5_Name.textContent = `${Game.jugadores[turnoActual].pokemons[4].nombre}`;
                pokemon5_Type.textContent = `${Game.jugadores[turnoActual].pokemons[4].tipo}`;
                pokemon5_Level.textContent = `${Game.jugadores[turnoActual].pokemons[4].nivel}`;
                pokemon5_Status.textContent = `${Game.jugadores[turnoActual].pokemons[4].estatus}`;
                Pokemon5.classList.remove('No-Pokemon');
                break;

            case 5:
                pokemon6_Name.textContent = `${Game.jugadores[turnoActual].pokemons[5].nombre}`;
                pokemon6_Type.textContent = `${Game.jugadores[turnoActual].pokemons[5].tipo}`;
                pokemon6_Level.textContent = `${Game.jugadores[turnoActual].pokemons[5].nivel}`;
                pokemon6_Status.textContent = `${Game.jugadores[turnoActual].pokemons[5].estatus}`;
                Pokemon6.classList.remove('No-Pokemon');
                break;

            }
            
    }
 
   
    

    if (Game.jugadores[turnoActual].badge1 == true){
        badge1.style.filter = "brightness(100%)";
    }
    if (Game.jugadores[turnoActual].badge2 == true){
        badge2.style.filter = "brightness(100%)";
    }
    if (Game.jugadores[turnoActual].badge3 == true){
        badge3.style.filter = "brightness(100%)";
    }
    if (Game.jugadores[turnoActual].badge4 == true){
        badge4.style.filter = "brightness(100%)";
    }
    if (Game.jugadores[turnoActual].badge5 == true){
        badge5.style.filter = "brightness(100%)";
    }
    if (Game.jugadores[turnoActual].badge6 == true){
        badge6.style.filter = "brightness(100%)";
    }
    if (Game.jugadores[turnoActual].badge7 == true){
        badge7.style.filter = "brightness(100%)";
    }
    if (Game.jugadores[turnoActual].badge8 == true){
        badge8.style.filter = "brightness(100%)";
    }

    if (Game.jugadores[turnoActual].elite == true){
        elite.style.filter = "brightness(100%)";
    }

    if (Game.jugadores[turnoActual].campion == true){
        campion.style.filter = "brightness(100%)";
    }

    if(Game.jugadores[turnoActual].frontierPink == true){
        frontera_pink.style.filter = "brightness(100%)";
    }
    if(Game.jugadores[turnoActual].frontierGreen == true){
        frontera_green.style.filter = "brightness(100%)";
    }
    if(Game.jugadores[turnoActual].frontierBlue == true){
        frontera_blue.style.filter = "brightness(100%)";
    }
    if(Game.jugadores[turnoActual].frontierYellow == true){
        frontera_yellow.style.filter = "brightness(100%)";
    }
    if(Game.jugadores[turnoActual].frontierRed == true){
        frontera_red.style.filter = "brightness(100%)";
    }
    if(Game.jugadores[turnoActual].frontierGolden == true){
        frontera_golden.style.filter = "brightness(100%)";
    }


    for( var i=0 ; i< Game.jugadores[Game.turnoActual].pokemons.length;i++){
        switch (i){
            case 0:
                if(Game.jugadores[Game.turnoActual].pokemons[0].estatus == "Muerto"){
                    pokemon1_Name.classList.add('name-dead') ;}
                break;
            case 1:
                if(Game.jugadores[Game.turnoActual].pokemons[1].estatus == "Muerto"){
                    pokemon2_Name.classList.add('name-dead') ;}
                break;
            case 2:
                if(Game.jugadores[Game.turnoActual].pokemons[2].estatus == "Muerto"){
                    pokemon3_Name.classList.add('name-dead') ;}
                break;
            case 3:
                if(Game.jugadores[Game.turnoActual].pokemons[3].estatus == "Muerto"){
                    pokemon4_Name.classList.add('name-dead') ;}
                break;
            case 4:
                if(Game.jugadores[Game.turnoActual].pokemons[4].estatus == "Muerto"){
                    pokemon5_Name.classList.add('name-dead') ;}
                break;
            case 5:
                if(Game.jugadores[Game.turnoActual].pokemons[5].estatus == "Muerto"){
                    pokemon6_Name.classList.add('name-dead') ;}
                break;
        }

    }
        
       
    

    


   
    
}

function removePokemonTeam(Game, button){
    var turnoActual= Game.turnoActual;
    
    
    switch(button){

            case "button1":
                Game.jugadores[turnoActual].pokemons.splice(0,1);
                PaginaOnePlayer(Game);
                break ;
            case "button2":
                Game.jugadores[turnoActual].pokemons.splice(1,1);
                PaginaOnePlayer(Game);
                break ;
            case "button3":
                Game.jugadores[turnoActual].pokemons.splice(2,1);
                PaginaOnePlayer(Game);
                break ;
            case "button4":
                Game.jugadores[turnoActual].pokemons.splice(3,1);
                PaginaOnePlayer(Game);
                break ;
            case "button5":
                Game.jugadores[turnoActual].pokemons.splice(4,1);
                PaginaOnePlayer(Game);
                break; 
            case "button6":
                const nombre6 = document.getElementById("pkm6Name");
                Game.jugadores[turnoActual].pokemons.splice(5,1);
                PaginaOnePlayer(Game);
                break; 
            


    }
}
function addLevelTeam(Game, button){
    var turnoActual = Game.turnoActual;
    switch(button){
        case "button1":
            Game.jugadores[turnoActual].pokemons[0].subirNivel();
            console.log(Game.jugadores[turnoActual].pokemons[0].nombre + " Subio a nivel "+ Game.jugadores[turnoActual].pokemons[0].nivel);
            PaginaOnePlayer(Game);
            break;
        case "button2":
            Game.jugadores[turnoActual].pokemons[1].subirNivel();
            console.log(Game.jugadores[turnoActual].pokemons[1].nombre + " Subio a nivel "+ Game.jugadores[turnoActual].pokemons[1].nivel);
            PaginaOnePlayer(Game);
            break;
        case "button3":
            Game.jugadores[turnoActual].pokemons[2].subirNivel();
            console.log(Game.jugadores[turnoActual].pokemons[2].nombre + " Subio a nivel "+ Game.jugadores[turnoActual].pokemons[2].nivel);
            PaginaOnePlayer(Game);
            break;

        case "button4":
            Game.jugadores[turnoActual].pokemons[3].subirNivel();
            console.log(Game.jugadores[turnoActual].pokemons[3].nombre + " Subio a nivel "+ Game.jugadores[turnoActual].pokemons[3].nivel);
            PaginaOnePlayer(Game);
            break;

        case "button5":
            Game.jugadores[turnoActual].pokemons[4].subirNivel();
            console.log(Game.jugadores[turnoActual].pokemons[4].nombre + " Subio a nivel "+ Game.jugadores[turnoActual].pokemons[4].nivel);
            PaginaOnePlayer(Game);
            break;

        case "button6":
            Game.jugadores[turnoActual].pokemons[5].subirNivel();
            console.log(Game.jugadores[turnoActual].pokemons[5].nombre + " Subio a nivel "+ Game.jugadores[turnoActual].pokemons[5].nivel);
            PaginaOnePlayer(Game);
            break;
    }

}

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}

function comprarItem(Player, item,price){
    
    switch(item){
        case "Pokeball":
           Player.restarMonedas(price);
            break;
        case "Great Ball":
            Player.restarMonedas(price);
            console.log("Compraste Great Ball");
            break;
        case "Ultra Ball":
            Player.restarMonedas(price);
            console.log("Compraste Ultra Ball");
            break;
        case "Potion":
            Player.restarMonedas(price);
            console.log("Compraste Potion");
            break;
        case "Revive":
            Player.restarMonedas(price);
            console.log("Compraste Revive");
            break;
        case "Max Revive":
            Player.restarMonedas(price);
            console.log("Compraste Max Revive");
            break;
        case "Full Heal":
            Player.restarMonedas(price);
            console.log("Compraste Full Heal");
            break;
        case "Escape Rope":
            Player.restarMonedas(price);
            console.log("Compraste Escape Rope");
            break;
        case "Bicycle":
            Player.restarMonedas(price);
            console.log("Compraste Bicycle");
            break;
        case "Poke Doll":
            Player.restarMonedas(price);
            console.log(" Compraste Poke Doll");
            break;
        case "XAttack 1":
            Player.restarMonedas(price);
            console.log(" Compraste XAttack 1");
            break;
        case "XAttack 2":
            Player.restarMonedas(price);
            console.log(" Compraste XAttack 2");
            break;
        case "XAttack 3":
            Player.restarMonedas(price);
            console.log(" Compraste XAttack 3");
            break;
        case "XDefence":
            Player.restarMonedas(price);
            console.log(" Compraste XDefence");
            break;
        case "XAccuracy":
            Player.restarMonedas(price);
            console.log(" Compraste XAccuracy");
            break;
        case "Guard Spec":
            Player.restarMonedas(price);
            console.log(" Compraste Guard Spec");
            break;
        case "TM":
            Player.restarMonedas(price);
            console.log(" Compraste TM");
            break;
        case "Mega Bracelet":
            Player.restarMonedas(price);
            console.log(" Compraste Mega Bracelet");
            break;
        case "Mega Stone":
            Player.restarMonedas(price);
            console.log(" Compraste Mega Stone");
            break;
        case "Dynamax Band":
            Player.restarMonedas(price);
            console.log(" Compraste Dynamax Band");
            break;
    }
}


function loss1_3(Game){
    var turnoActual = Game.turnoActual;
    Game.jugadores[turnoActual].monedas = Math.floor(Game.jugadores[turnoActual].monedas - (Game.jugadores[turnoActual].monedas/3));
    console.log("Quedan en total " + Game.jugadores[turnoActual].monedas + "monedas");
    PaginaOnePlayer(Game);
}

function loss1_2(Game){
    var turnoActual = Game.turnoActual;
    Game.jugadores[turnoActual].monedas = Math.floor(Game.jugadores[turnoActual].monedas - (Game.jugadores[turnoActual].monedas/2));
   
    PaginaOnePlayer(Game);
}
function showPlayerCard() {
    const cards = document.querySelectorAll(".player-face");
   
    for (var i = 0 ; i<cards.length;i++ ){
        cards[i].addEventListener('click',()=>{
          
        });
    }
  }

async function addPokemonTeam(Game){
    var pokemonadded = false;
    var turnoActual = Game.turnoActual;
    console.log ("Agregar Poklemon " + Game.jugadores[turnoActual].nombre);
    const menuAddPokemon = document.getElementById("mainAddPokemon");
    const pokedexWindow = document.getElementById("pokedexMain");
    const pokemonfoundWindow = document.getElementById("PokemonFound");
    const search = document.getElementById("SearchPokedex");
    menuAddPokemon.style.display="block";
    const grayed_GB = document.getElementById("grayed_BG");
    grayed_GB.style.display = "flex";
    pokedexWindow.style.display= "flex";
    pokemonfoundWindow.style.display ="none";
    const pokedex = document.getElementById("Pokedex");
    console.log("pokedex"+ pokedex.value);
    const notFound = document.getElementById("Not_Found");
    notFound.style.display="none";

    search.addEventListener('click', async()=>{
       
        try {
            var pokedex_str =  zfill(pokedex.value ,3);
            console.log("#"+ pokedex_str);
            const resultado = await buscarPokemon(pokedex_str);
            if (resultado[0] === undefined){
               
                notFound.style.display="block";
                console.log("Pokemon WAS not Found");
                
            }
            else{
                const nombrefound = document.getElementById("pokemonfound_name");
                const tipofound = document.getElementById("pokemonfound_type");
                const levelfound = document.getElementById("pokemonfound_level");
                pokedexWindow.style.display= "none";
                pokemonfoundWindow.style.display ="flex";

                nombrefound.textContent = ` ${resultado[0]}`;
                tipofound.textContent = ` ${resultado[1]}`;
                levelfound.textContent = ` ${resultado[2]}`;

                const confirm = document.getElementById("ConfirmPokemon");
                 confirm.addEventListener('click',()=>{
                if(pokemonadded == false){
                const PokeNew = new Pokemon(resultado[0],resultado[1],resultado[2],"Normal");
                Game.jugadores[turnoActual].agregarPokemon(PokeNew);
                menuAddPokemon.style.display="none";
                grayed_GB.style.display = "none";
                pokedex.value="";
                PaginaOnePlayer(Game);
                pokemonadded = true;
                 }
               else{
                        console.log("Pokemon was not found");
                 }
                })
             
                
            }
            
          } catch (error) {
            console.error('Error:', error);
          }

        
     
        


    })
}

function asignarPosicion(Game) {

    for(var turno =0 ; turno < Game.jugadores.length; turno++){
        Game.jugadores[turno].calcularPuntos();
        console.log(Game.jugadores[turno].nombre);
        console.log(Game.jugadores[turno].puntos)
    }
        const copiaJugadores = [...Game.jugadores]; // Creamos una copia del arreglo original
    
    // Ordenamos la copia del arreglo en base a los puntos de forma descendente
    copiaJugadores.sort((a, b) => b.puntos - a.puntos);
  
    // Actualizamos el campo 'posicion' en el arreglo original en base al orden de la copia
    for (let i = 0; i < Game.jugadores.length; i++) {
      const indice = Game.jugadores.findIndex(jugador => jugador === copiaJugadores[i]);
      Game.jugadores[indice].posicion = i + 1;
    }
  
    return Game.jugadores;
  }



function sentData(Game) {
    var numJugadores = Game.jugadores.length;
    localStorage.setItem('numPlayers', numJugadores);
  
    for (var i = 0; i < numJugadores; i++) {
        var jugador = Game.jugadores[i];
        var jugadorIndex = i + 1;
        var nombre = jugador.nombre;
        var monedas = jugador.monedas;
        var posicion =jugador.posicion;
        var segundos = jugador.segundos;
        var minutos = jugador.minutos;
        var horas = jugador.horas;
        var elite = jugador.elite;
        var campion = jugador.campion;  
            for (var j = 0; j < 8; j++) {
                var medallaKey = `P${jugadorIndex}_medalla${j + 1}`;
                var medallaValue = jugador[`badge${j + 1}`];
                localStorage.setItem(medallaKey, medallaValue);
            }
  
      localStorage.setItem(`nombre${jugadorIndex}`, nombre);
      localStorage.setItem(`monedas${jugadorIndex}`, monedas);
      localStorage.setItem(`posicion${jugadorIndex}`, posicion);
      localStorage.setItem(`segundos${jugadorIndex}`, segundos);
      localStorage.setItem(`minutos${jugadorIndex}`, minutos);
      localStorage.setItem(`horas${jugadorIndex}`, horas);
      localStorage.setItem(`elite${jugadorIndex}`, elite);
      localStorage.setItem(`campion${jugadorIndex}`, campion);
  
      var pokemons = [...jugador.pokemons];
      if (jugador.pokemons.length < 6) {
        const cantidadFaltante = 6 - jugador.pokemons.length;
        for (var k = 0; k < cantidadFaltante; k++) {
          var poke = new Pokemon('-', '-', 0, 'normal');
          pokemons.push(poke);
        }
      }
  
      var pokemonsKey = `P${jugadorIndex}pokemons`;
      localStorage.setItem(pokemonsKey, JSON.stringify(pokemons));
    }
  }

  function startTimer(Game) {
    var tiempoInical = Date.now();
    timerInterval = setInterval(function() {
    actualizarCronometro(tiempoInical);
    var turnoActual = Game.turnoActual;
      Game.jugadores[turnoActual].segundos++;
  
      // Si han pasado 60 segundos, aumentar los minutos y resetear los segundos
      if (Game.jugadores[turnoActual].segundos === 60) {
        Game.jugadores[turnoActual].segundos = 0;
        Game.jugadores[turnoActual].minutos++;
      }
  
      // Si han pasado 60 minutos, aumentar las horas y resetear los minutos
      if (Game.jugadores[turnoActual].minutos === 60) {
        Game.jugadores[turnoActual].minutos = 0;
        Game.jugadores[turnoActual].horas++;
      }
  
      // Actualizar la interfaz con el tiempo del jugador activo
    
    }, 1000); // El timer se ejecutará cada 1000 milisegundos (1 segundo)
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
  }

  function actualizarCronometro(tiempoInicial) {
    
    var tiempoTranscurrido = Date.now() - tiempoInicial;
    var segundos = Math.floor(tiempoTranscurrido / 1000) % 60;
    var minutos = Math.floor(tiempoTranscurrido / 1000 / 60) % 60;
  
    var tiempoMostrar = `${(minutos)}:${(segundos)}`;
    document.getElementById('cronometro').textContent = tiempoMostrar;
  }

document.addEventListener("DOMContentLoaded", function(event) {
    //código a ejecutar cuando existe la certeza de que el DOM está listo para recibir acciones
        const audio = new Audio('./music/intro.mp3');
        const audio2 = new Audio('./music/map.mp3');
        document.addEventListener('click',()=>{
           
            
            audio.currentTime = 1;
            audio.play();
            buttonStartMenu.addEventListener('click',()=>{
                startMenu.style.display="none";
                
                audio.pause();
                audio2.play();
            })
        
        }, {once : true});
      

          
    const startMenu = document.getElementById("MenuStart");
    const buttonStartMenu = document.getElementById("startGame");

    const MainBOX = document.getElementById("MainBOX");

    const grayed_GB = document.getElementById("grayed_BG");
    console.log("Cargando juego");
    const Game = new Juego();

    /*demo pokemons*/
    
    
    console.log("Juego listo");
    var numberPlayer = 1;
    var Comprado = false;
    const milaButton= document.getElementById("Mila");
    const wuichoButton= document.getElementById("Ablan");
    const kennysButton= document.getElementById("Kennys");
    const docButton= document.getElementById("Doc");
    const kampisButton= document.getElementById("Kampis");
    const tachoButton= document.getElementById("Tacho");
    const manditoButton= document.getElementById("Mandito");
    const enteiButton= document.getElementById("Entei");
    const startButton= document.getElementById("start");
    const FichasMenu = document.getElementById("MainFichas");
    const MenuPlayer = document.getElementById("MenuPlayer");
    const OnePlayerMenu = document.getElementById("MainOnePlayer");

    
    milaButton.addEventListener('click',()=>{
        console.log("Hola Mila");
        const P_Mila = new Player ("Mila",3,numberPlayer);
        Game.jugadores.push(P_Mila);
        numberPlayer+=1;
        console.log(Game.jugadores);
        milaButton.style.display="none";
    })

    wuichoButton.addEventListener('click',()=>{
        console.log("Hola wuicho");
        const P_Wuicho = new Player ("Wuicho",3,numberPlayer);
        Game.jugadores.push(P_Wuicho);
        numberPlayer+=1;
        console.log(Game.jugadores);
        wuichoButton.style.display="none";
    })

    kennysButton.addEventListener('click',()=>{
        console.log("Hola Kennys");
        const P_Kennys = new Player ("Kennys",3,numberPlayer)
        Game.jugadores.push(P_Kennys);
        numberPlayer+=1;
        console.log(Game.jugadores);
        kennysButton.style.display="none";
    })

    docButton.addEventListener('click',()=>{
        console.log("Hola Doc");
        const P_Doc = new Player ("Doc",3,numberPlayer);
        Game.jugadores.push(P_Doc);
        numberPlayer+=1;
        console.log(Game.jugadores);
        docButton.style.display="none";
    })

    kampisButton.addEventListener('click',()=>{
        console.log("Hola kampis");
        const P_Kampis = new Player ("Kampis",3,numberPlayer)
        Game.jugadores.push(P_Kampis);
        numberPlayer+=1;
        console.log(Game.jugadores);
        kampisButton.style.display="none";
    })

    tachoButton.addEventListener('click',()=>{
        console.log("Hola Tacho");
        const P_Tacho = new Player ("Tacho",3,numberPlayer)
        Game.jugadores.push(P_Tacho);
        numberPlayer+=1;
        console.log(Game.jugadores);
        tachoButton.style.display="none";
    })

    manditoButton.addEventListener('click',()=>{
        console.log("Hola Mandito");
        const P_Mandito = new Player ("Mandito",3,numberPlayer)
        Game.jugadores.push(P_Mandito);
        numberPlayer+=1;
        console.log(Game.jugadores);
        manditoButton.style.display="none";
    })

    enteiButton.addEventListener('click',()=>{
        console.log("Hola entei");
        const P_Entei = new Player ("Entei",3,numberPlayer)
        Game.jugadores.push(P_Entei);
        numberPlayer+=1;
        console.log(Game.jugadores);
        enteiButton.style.display="none";
    })

    Game.turnoActual=0;

    /* Demo de pokemons*/
    

    startButton.addEventListener('click',()=>{
        if (numberPlayer >= 4){
        console.log("starting");
        FichasMenu.style.display="none";
        OnePlayerMenu.style.display="block";
        Game.jugadores[Game.turnoActual].sumarMonedas(1);
        MainBOX.style.backgroundImage="url('./images/wallpaper.jpg')";
        audio2.pause();
        PaginaOnePlayer(Game);
        startTimer(Game);
        }
        else{
            console.log("Faltan jugadores");
        }
    })

    const nextButton = document.getElementById("NextPlayer");
    nextButton.addEventListener('click', ()=>{
        stopTimer();
        console.log( Game.jugadores[Game.turnoActual].nombre);
        console.log( "Segundos: " + Game.jugadores[Game.turnoActual].segundos);
        console.log( "Minutos: " + Game.jugadores[Game.turnoActual].minutos);
        console.log( "Horas: " + Game.jugadores[Game.turnoActual].horas);

        Game.turnoActual+=1;
        Game.jugadores= asignarPosicion(Game);
        sentData(Game);
        startTimer(Game);
        if (Game.turnoActual >= Game.jugadores.length ){
            Game.turnoActual=0;
            Game.ronda+=1;
            console.log("ronda " + Game.ronda);
            Game.jugadores[Game.turnoActual].sumarMonedas(1);
            PaginaOnePlayer(Game);
        }else{
            Game.jugadores[Game.turnoActual].sumarMonedas(1);
            PaginaOnePlayer(Game);
            
        } 
    })
    const BackButton = document.getElementById("BackPlayer");
    BackButton.addEventListener('click',()=>{
        Game.jugadores[Game.turnoActual].sumarMonedas(-1);
        Game.turnoActual-=1;
        if (Game.turnoActual <0 ){
            Game.turnoActual= Game.jugadores.length -1;
            Game.ronda-=1;
            PaginaOnePlayer(Game);
        }
        else{
            PaginaOnePlayer(Game);
        }
    });
    //Remove buttons
    const ButtonX1 = document.getElementById("pk1Remove");
    const ButtonX2 = document.getElementById("pk2Remove");
    const ButtonX3 = document.getElementById("pk3Remove");
    const ButtonX4 = document.getElementById("pk4Remove");
    const ButtonX5 = document.getElementById("pk5Remove");
    const ButtonX6 = document.getElementById("pk6Remove");

    ButtonX1.addEventListener('click', ()=>{
        removePokemonTeam(Game, "button1");
    })
    ButtonX2.addEventListener('click', ()=>{
        removePokemonTeam(Game, "button2");
    })
    ButtonX3.addEventListener('click', ()=>{
        removePokemonTeam(Game, "button3");
    })
    ButtonX4.addEventListener('click', ()=>{
        removePokemonTeam(Game, "button4");
    })
    ButtonX5.addEventListener('click', ()=>{
        removePokemonTeam(Game, "button5");
    })
    ButtonX6.addEventListener('click', ()=>{
        removePokemonTeam(Game, "button6");
    })

    //ADD LEVEL

    const pkm1Level= document.getElementById("pkm1Plus");
    const pkm2Level= document.getElementById("pkm2Plus");
    const pkm3Level= document.getElementById("pkm3Plus");
    const pkm4Level= document.getElementById("pkm4Plus");
    const pkm5Level= document.getElementById("pkm5Plus");
    const pkm6Level= document.getElementById("pkm6Plus");

    pkm1Level.addEventListener('click',()=>{
        addLevelTeam(Game,"button1");
    })
    pkm2Level.addEventListener('click',()=>{
        addLevelTeam(Game,"button2");
    })
    pkm3Level.addEventListener('click',()=>{
        addLevelTeam(Game,"button3");
    })
    pkm4Level.addEventListener('click',()=>{
        addLevelTeam(Game,"button4");
    })
    pkm5Level.addEventListener('click',()=>{
        addLevelTeam(Game,"button5");
    })
    pkm6Level.addEventListener('click',()=>{
        addLevelTeam(Game,"button6");
    })

    //BADGES
    const badge1 = document.getElementById("badge1");
    const badge2 = document.getElementById("badge2");
    const badge3 = document.getElementById("badge3");
    const badge4 = document.getElementById("badge4");
    const badge5 = document.getElementById("badge5");
    const badge6 = document.getElementById("badge6");
    const badge7 = document.getElementById("badge7");
    const badge8 = document.getElementById("badge8");
    const elite = document.getElementById("Elite");
    const campion = document.getElementById("Campion");

    badge1.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].badge1 == false){
        Game.jugadores[Game.turnoActual].badge1 = true;
        Game.jugadores[Game.turnoActual].sumarMonedas(5);
        PaginaOnePlayer(Game);
        }
        else{
            Game.jugadores[Game.turnoActual].badge1 = false;
            Game.jugadores[Game.turnoActual].restarMonedas(5);

            PaginaOnePlayer(Game);
        }
    });

    badge2.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].badge2 == false){
        Game.jugadores[Game.turnoActual].badge2 = true;
        Game.jugadores[Game.turnoActual].sumarMonedas(5);
        PaginaOnePlayer(Game);
        }
        else{
            Game.jugadores[Game.turnoActual].badge2 = false;
            Game.jugadores[Game.turnoActual].restarMonedas(5);
            PaginaOnePlayer(Game);
        }
    });

    badge3.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].badge3 == false){
        Game.jugadores[Game.turnoActual].badge3 = true;
        Game.jugadores[Game.turnoActual].sumarMonedas(5);
        PaginaOnePlayer(Game);
        }
        else{
            Game.jugadores[Game.turnoActual].badge3 = false;
            Game.jugadores[Game.turnoActual].restarMonedas(5);
            PaginaOnePlayer(Game);
        }
    });

    badge4.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].badge4 == false){
        Game.jugadores[Game.turnoActual].badge4 = true;
        Game.jugadores[Game.turnoActual].sumarMonedas(5);
        PaginaOnePlayer(Game);
        }
        else{
            Game.jugadores[Game.turnoActual].badge4 = false;
            Game.jugadores[Game.turnoActual].restarMonedas(5);
            PaginaOnePlayer(Game);
        }
    });

    badge5.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].badge5 == false){
        Game.jugadores[Game.turnoActual].badge5 = true;
        Game.jugadores[Game.turnoActual].sumarMonedas(5);
        PaginaOnePlayer(Game);
        }
        else{
            Game.jugadores[Game.turnoActual].badge5 = false;
            Game.jugadores[Game.turnoActual].restarMonedas(5);
            PaginaOnePlayer(Game);
        }
    });

    badge6.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].badge6 == false){
        Game.jugadores[Game.turnoActual].badge6 = true;
        Game.jugadores[Game.turnoActual].sumarMonedas(5);
        PaginaOnePlayer(Game);
        }
        else{
            Game.jugadores[Game.turnoActual].badge6 = false;
            Game.jugadores[Game.turnoActual].restarMonedas(5);
            PaginaOnePlayer(Game);
        }
    });

    badge7.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].badge7 == false){
        Game.jugadores[Game.turnoActual].badge7 = true;
        Game.jugadores[Game.turnoActual].sumarMonedas(5);
        PaginaOnePlayer(Game);
        }
        else{
            Game.jugadores[Game.turnoActual].badge7 = false;
            Game.jugadores[Game.turnoActual].restarMonedas(5);
            PaginaOnePlayer(Game);
        }
    });

    badge8.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].badge8 == false){
        Game.jugadores[Game.turnoActual].badge8 = true;
        Game.jugadores[Game.turnoActual].sumarMonedas(5);
        PaginaOnePlayer(Game);
        }
        else{
            Game.jugadores[Game.turnoActual].badge8 = false;
            Game.jugadores[Game.turnoActual].restarMonedas(5);
            PaginaOnePlayer(Game);
        }
    });

    elite.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].elite == false){
        Game.jugadores[Game.turnoActual].elite = true;
        Game.jugadores[Game.turnoActual].sumarMonedas(5);
        PaginaOnePlayer(Game);
        }
        else{
            Game.jugadores[Game.turnoActual].elite = false;
            PaginaOnePlayer(Game);
        }
    });

    campion.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].campion == false){
        Game.jugadores[Game.turnoActual].campion = true;
        PaginaOnePlayer(Game);
        }
        else{
            Game.jugadores[Game.turnoActual].campion = false;
            PaginaOnePlayer(Game);
        }
    });

    //Frontera 

    const pinkFlag = document.getElementById("Pink_Frontier");
    const greenFlag = document.getElementById("Green_Frontier");
    const blueFlag = document.getElementById("Blue_Frontier");
    const yellowFlag = document.getElementById("Yellow_Frontier");
    const redFlag = document.getElementById("Red_Frontier");
    const goldenFlag = document.getElementById("Golden_Frontier");

    pinkFlag.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].frontierPink == false){
            Game.jugadores[Game.turnoActual].frontierPink = true;
            PaginaOnePlayer(Game);
            }else{
                Game.jugadores[Game.turnoActual].frontierPink = false;
                PaginaOnePlayer(Game);}
    });

    greenFlag.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].frontierGreen == false){
            Game.jugadores[Game.turnoActual].frontierGreen = true;
            PaginaOnePlayer(Game);
            }else{
                Game.jugadores[Game.turnoActual].frontierGreen = false;
                PaginaOnePlayer(Game);}
    });

    blueFlag.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].frontierBlue == false){
            Game.jugadores[Game.turnoActual].frontierBlue = true;
            PaginaOnePlayer(Game);
            }else{
                Game.jugadores[Game.turnoActual].frontierBlue = false;
                PaginaOnePlayer(Game);}
    });

    yellowFlag.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].frontierYellow == false){
            Game.jugadores[Game.turnoActual].frontierYellow = true;
            PaginaOnePlayer(Game);
            }else{
                Game.jugadores[Game.turnoActual].frontierYellow = false;
                PaginaOnePlayer(Game);}
    });

    redFlag.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].frontierRed == false){
            Game.jugadores[Game.turnoActual].frontierRed = true;
            PaginaOnePlayer(Game);
            }else{
                Game.jugadores[Game.turnoActual].frontierRed = false;
                PaginaOnePlayer(Game);}
    });

    goldenFlag.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].frontierGolden == false){
            Game.jugadores[Game.turnoActual].frontierGolden = true;
            PaginaOnePlayer(Game);
            }else{
                Game.jugadores[Game.turnoActual].frontierGolden = false;
                PaginaOnePlayer(Game);}
    });

    //Add Pokemon
    const addButton = document.getElementById("addPokemon");
    addButton.addEventListener('click',()=>{
        addPokemonTeam(Game);
    })

    //BUY ITEM

    const closeButton = document.getElementById("closeMarket");
    const MarketWindow = document.getElementById("mainMarket");
    const OpenMarket = document.getElementById("PokeMarket");
    closeButton.addEventListener('click', ()=>{
        MarketWindow.style.display="none";
        grayed_GB.style.display ="none";
    });

    OpenMarket.addEventListener('click',()=>{
        deselectItems(allItems);
        MarketWindow.style.display="flex";
        grayed_GB.style.display="flex";
    })
    

    const item1 = document.getElementById("item1");
    const item2 = document.getElementById("item2");
    const item3 = document.getElementById("item3");
    const item4 = document.getElementById("item4");
    const item5 = document.getElementById("item5");
    const item6 = document.getElementById("item6");
    const item7 = document.getElementById("item7");
    const item8 = document.getElementById("item8");
    const item9 = document.getElementById("item9");
    const item10 = document.getElementById("item10");
    const item11 = document.getElementById("item11");
    const item12 = document.getElementById("item12");
    const item13 = document.getElementById("item13");
    const item14 = document.getElementById("item14");
    const item15 = document.getElementById("item15");
    const item16 = document.getElementById("item16");
    const item17 = document.getElementById("item17");
    const item18 = document.getElementById("item18");
    const item19 = document.getElementById("item19");
    const item20 = document.getElementById("item20");

    const allItems = document.querySelectorAll(".items");
    

    function deselectItems(){
        const allItems = document.querySelectorAll(".items");
        for( var i =0; i< allItems.length; i++){
            allItems[i].classList.remove("itemSelected")
        }

    }

 

    var item_selected= "";
    var price_selected =0;
   
     item1.addEventListener('click',()=>{
        console.log("pokeball");
        deselectItems();
        item1.classList.add("itemSelected");
        item_selected= "Pokeball";
        price_selected = 4;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

     item2.addEventListener('click',()=>{
        console.log("Great Ball");
        deselectItems();
        item2.classList.add("itemSelected");
        item_selected= "Great Ball";
        price_selected = 8;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});
    
    item3.addEventListener('click',()=>{
        console.log("Ultra Ball");
        deselectItems();
        item3.classList.add("itemSelected");
        item_selected= "Ultra Ball";
        price_selected = 12;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item4.addEventListener('click',()=>{
        console.log("Potion");
        deselectItems();
        item4.classList.add("itemSelected");
        item_selected= "Potion";
        price_selected = 4;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item5.addEventListener('click',()=>{
        console.log("Revive");
        deselectItems();
        item5.classList.add("itemSelected");
        item_selected= "Revive";
        price_selected = 8;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item6.addEventListener('click',()=>{
        console.log("Max Revive");
        deselectItems();
        item6.classList.add("itemSelected");
        item_selected= "Max Revive";
        price_selected = 16;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item7.addEventListener('click',()=>{
        console.log("Full Heal");
        deselectItems();
        item7.classList.add("itemSelected");
        item_selected= "Full Heal";
        price_selected = 6;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item8.addEventListener('click',()=>{
        console.log("Escape Rope");
        deselectItems();
        item8.classList.add("itemSelected");
        item_selected= "Escape Rope";
        price_selected = 2;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item9.addEventListener('click',()=>{
        console.log("Bicycle");
        deselectItems();
        item9.classList.add("itemSelected");
        item_selected= "Bicycle";
        price_selected = 16;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item10.addEventListener('click',()=>{
        console.log("Poke Doll");
        deselectItems();
        item10.classList.add("itemSelected");
        item_selected= "Poke Doll";
        price_selected = 16;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});
    item11.addEventListener('click',()=>{
        console.log("XAttack 1");
        deselectItems();
        item11.classList.add("itemSelected");
        item_selected= "XAttack 1";
        price_selected = 4;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
            }});
    item12.addEventListener('click',()=>{
        console.log("XAttack 2");
        deselectItems();
        item12.classList.add("itemSelected");
        item_selected= "XAttack 2";
        price_selected = 8;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item13.addEventListener('click',()=>{
        console.log("XAttack 3");
        deselectItems();
        item13.classList.add("itemSelected");
        item_selected= "XAttack 3";
        price_selected = 16;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item14.addEventListener('click',()=>{
        console.log("XDefence");
        deselectItems();
        item14.classList.add("itemSelected");
        item_selected= "XDefence";
        price_selected = 4;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item15.addEventListener('click',()=>{
        console.log("XAccuracy");
        deselectItems();
        item15.classList.add("itemSelected");
        item_selected= "XAccuracy";
        price_selected = 4;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item16.addEventListener('click',()=>{
        console.log("Guard Spec");
        deselectItems();
        item16.classList.add("itemSelected");
        item_selected= "Guard Spec";
        price_selected = 6;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

    item17.addEventListener('click',()=>{
        console.log("TM");
        deselectItems();
        item17.classList.add("itemSelected");
        item_selected= "TM";
        price_selected = 16;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

                    
    item18.addEventListener('click',()=>{
        console.log("Mega Bracelet");
        deselectItems();
        item18.classList.add("itemSelected");
        item_selected= "Mega Bracelet";
        price_selected = 16;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

                        
    item19.addEventListener('click',()=>{
        console.log("Mega Stone");
        deselectItems();
        item19.classList.add("itemSelected");
        item_selected= "Mega Stone";
        price_selected = 8;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});

                            
    item20.addEventListener('click',()=>{
        console.log("Dynamax Band");
        deselectItems();
        item20.classList.add("itemSelected");
        item_selected= "Dynamax Band";
        price_selected = 16;
        if(Comprado == false){
            const buyButton = document.getElementById("buyButton");
            buyButton.addEventListener('click', ()=>{
                if(Game.jugadores[Game.turnoActual].monedas >= price_selected){
                    comprarItem(Game.jugadores[Game.turnoActual],item_selected,price_selected);
                    MarketWindow.style.display="none";
                    grayed_GB.style.display="none";
                    PaginaOnePlayer(Game);
                    Comprado = true;}
                else{console.log("Error not Money");
                }});
        }});
                    

    /*MONEDAS */

    const iconMonedas = document.getElementById("coin-image");
    const plus_1coins = document.getElementById("plus1");
    const less_1coins = document.getElementById("less1");
    const plus_5coins = document.getElementById("plus5");
    const less_1_2coins = document.getElementById("less1_2");
    const less_1_3coins = document.getElementById("less1_3");
    const closeCoins = document.getElementById("closeCOINS");
    const mainCoinWindos = document.getElementById("MainMenuCoins");

    closeCoins.addEventListener('click',()=>{
        mainCoinWindos.style.display= "none";
        grayed_GB.style.display = "none";
    })

    iconMonedas.addEventListener('click',()=>{
        mainCoinWindos.style.display="flex";
        grayed_GB.style.display="flex";
    })
    less_1_3coins.addEventListener('click', ()=>{
        loss1_3(Game);
    })

    plus_1coins.addEventListener('click',()=>{
        Game.jugadores[Game.turnoActual].sumarMonedas(1);
        PaginaOnePlayer(Game);
    })

    less_1coins.addEventListener('click',()=>{
        Game.jugadores[Game.turnoActual].sumarMonedas(-1);
        if(Game.jugadores[Game.turnoActual].monedas <= 0){
            Game.jugadores[Game.turnoActual].monedas=0;
        }
        PaginaOnePlayer(Game);
    })

    plus_5coins.addEventListener('click', ()=>{
        Game.jugadores[Game.turnoActual].sumarMonedas(5);
        PaginaOnePlayer(Game);
    })
    less_1_2coins.addEventListener('click',()=>{
        loss1_2(Game);
    })


    /*Pokemon muertos  */
    const pokemon1_Name = document.getElementById("pkm1Name");
    const pokemon2_Name = document.getElementById("pkm2Name");
    const pokemon3_Name = document.getElementById("pkm3Name");
    const pokemon4_Name = document.getElementById("pkm4Name");
    const pokemon5_Name = document.getElementById("pkm5Name");
    const pokemon6_Name = document.getElementById("pkm6Name");
    


    pokemon1_Name.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].pokemons[0].estatus == "Normal"){
            Game.jugadores[Game.turnoActual].pokemons[0].estatus = "Muerto";
            PaginaOnePlayer(Game);}
        else{
            Game.jugadores[Game.turnoActual].pokemons[0].estatus = "Normal";
            PaginaOnePlayer(Game);}
        
    });
    pokemon2_Name.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].pokemons[1].estatus == "Normal"){
            Game.jugadores[Game.turnoActual].pokemons[1].estatus = "Muerto";
            PaginaOnePlayer(Game);}
        else{
            Game.jugadores[Game.turnoActual].pokemons[1].estatus = "Normal";
            PaginaOnePlayer(Game);}
    });
    pokemon3_Name.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].pokemons[2].estatus == "Normal"){
            Game.jugadores[Game.turnoActual].pokemons[2].estatus = "Muerto";
            PaginaOnePlayer(Game);}
        else{
            Game.jugadores[Game.turnoActual].pokemons[2].estatus = "Normal";
            PaginaOnePlayer(Game);}
    });
    pokemon4_Name.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].pokemons[3].estatus == "Normal"){
            Game.jugadores[Game.turnoActual].pokemons[3].estatus = "Muerto";
            PaginaOnePlayer(Game);}
        else{
            Game.jugadores[Game.turnoActual].pokemons[3].estatus = "Normal";
            PaginaOnePlayer(Game);}
    });
    pokemon5_Name.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].pokemons[4].estatus == "Normal"){
            Game.jugadores[Game.turnoActual].pokemons[4].estatus = "Muerto";
            PaginaOnePlayer(Game);}
        else{
            Game.jugadores[Game.turnoActual].pokemons[4].estatus = "Normal";
            PaginaOnePlayer(Game);}
    });
    pokemon6_Name.addEventListener('click',()=>{
        if (Game.jugadores[Game.turnoActual].pokemons[5].estatus == "Normal"){
            Game.jugadores[Game.turnoActual].pokemons[5].estatus = "Muerto";
            PaginaOnePlayer(Game);}
        else{
            Game.jugadores[Game.turnoActual].pokemons[5].estatus = "Normal";
            PaginaOnePlayer(Game);}
    });

    

    
    
    

    

    

    
    
    
    
});



