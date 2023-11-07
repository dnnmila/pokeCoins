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
    constructor(pokedex,nombre, tipo , nivel,attack1,attack2,LevelToEvo,evolution){
        this.pokedex = pokedex;
        this.nombre = nombre;
        this.tipo = tipo;
        this.nivel = nivel;
        this.extra = 0;
        this.base = nivel;
        this.estatus = "Normal";
        this.attack1 =attack1;
        this.attack2 = attack2;
        this.attack3= {};
        this.attached = "";
        this.evolution = evolution;
        this.LevelToEvo = LevelToEvo;
    }

    cambioEstatus(nuevoEstatus){
        this.estatus = nuevoEstatus;
    } 

    subirNivel(){
        this.nivel += 1;
        this.extra +=1;
        if(this.extra > 6 ){
            this.extra =0;
            this.nivel = this.base;
        }
    }

    addProtein(){
        this.attached = "PROTEIN";
        this.extra += 1;
    }
    removeProtein(){
        this.attached = "";
        this.extra = 0;
    }

    

    removeTM(){
        this.attached = "";
    }
}

class Attack {
    constructor(nombre,tipo,strength,effect,activate,dice){
        this.nombre = nombre;
        this.tipo = tipo;
        this.strength = strength;
        this.effect = effect;
        this.activate = activate;
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

function crearPokemon(pokedex,nombre, tipo , nivel , estatus){
    return new Pokemon(pokedex,nombre, tipo,nivel,estatus);
}

async function buscarPokemon(numeroPokedex) {

        const url = `http://localhost:8000/pokemons/${numeroPokedex}`;

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
              throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            const pokedex = data[1];
            const tipoPokemon =data[4];
            const nombrePokemon = data[2];
            const levelPokemon =data[3];
            const nextLevel = data[8];
            const Evolution = data[9];
            
        

            const dataAtk1 = await getAttack(data[6]);
            const Attack1 = new Attack(dataAtk1[0],dataAtk1[1],dataAtk1[2],dataAtk1[3],dataAtk1[4],dataAtk1[5]);
            const dataAtk2 = await getAttack(data[7]);
            const Attack2 = new Attack(dataAtk2[0],dataAtk2[1],dataAtk2[2],dataAtk2[3],dataAtk2[4],dataAtk2[5]);

            
            //console.log(`El nombre del Pokémon con número de Pokédex ${numeroPokedex} es: ${nombrePokemon}`);
            // Devolver el nombre del Pokémon
            return [pokedex,nombrePokemon,tipoPokemon,levelPokemon,Attack1,Attack2,nextLevel,Evolution];
            
          } catch (error) {
            console.error('Error:', error);
            return undefined // Opcional: Manejar el error devolviendo un valor predeterminado
          }
      
  }

  async function getAttack(idAtk) {

    const url = `http://localhost:8000/attacks/${idAtk}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const data0 = await response.json();
        const nombre =data0[1];
        const tipo = data0[2];
        const power =data0[3];
        const effect =data0[4];
        const activate =data0[5];
        const dice =data0[6];
        //console.log(`El nombre del Pokémon con número de Pokédex ${numeroPokedex} es: ${nombrePokemon}`);
        // Devolver el nombre del Pokémon
        return [nombre,tipo,power,effect,activate,dice];
        
      } catch (error) {
        console.error('Error:', error);
        return undefined // Opcional: Manejar el error devolviendo un valor predeterminado
      }
  
}

async function evolvePokemon(Game, pokemon){
    var turnoActual = Game.turnoActual;
    try {
        var pokedex_str = Game.jugadores[turnoActual].pokemons[pokemon].evolution;
        console.log("#"+ pokedex_str);
        const resultado = await buscarPokemon(pokedex_str);
        console.log(resultado);
        if (resultado[1] === undefined){
            console.log("Pokemon WAS not Found");
        }
        else{
            const PokeNew = new Pokemon(resultado[0],resultado[1],resultado[2],resultado[3],resultado[4],resultado[5],resultado[6],resultado[7]);
            PokeNew.extra = Game.jugadores[turnoActual].pokemons[pokemon].extra - Game.jugadores[turnoActual].pokemons[pokemon].LevelToEvo; 
            PokeNew.nivel += PokeNew.extra;
            Game.jugadores[turnoActual].pokemons[pokemon] = PokeNew;
            console.log(PokeNew);
            PaginaOnePlayer(Game);
            console.log(Game.jugadores[turnoActual]);
             }
        }
        catch (error) {
            console.error('Error:', error);
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

    const buttonAdd = document.getElementById("addPokemon");
    if (Game.jugadores[turnoActual].pokemons.length == 6){
        buttonAdd.style.display="none";
    }else{
        buttonAdd.style.display="block";
    }

    for(var i =0; i < Game.jugadores[turnoActual].pokemons.length ;  i ++ ){
       
        switch (i) {
            case 0:
               
                const imagen1 = document.getElementById('imgPkm1');
                imagen1.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[turnoActual].pokemons[0].pokedex}.png")`;
                pokemon1_Name.textContent = `${Game.jugadores[turnoActual].pokemons[0].nombre}`;
                pokemon1_Type.textContent = `${Game.jugadores[turnoActual].pokemons[0].tipo}`;
                pokemon1_Level.textContent = `${Game.jugadores[turnoActual].pokemons[0].base} + ${Game.jugadores[turnoActual].pokemons[0].extra} `;
                pokemon1_Status.textContent = `${Game.jugadores[turnoActual].pokemons[0].estatus}`;
                Pokemon1.classList.remove('No-Pokemon');
                break;
            case 1:
                const imagen2 = document.getElementById('imgPkm2');
                imagen2.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[turnoActual].pokemons[1].pokedex}.png")`;
                pokemon2_Name.textContent = `${Game.jugadores[turnoActual].pokemons[1].nombre}`;
                pokemon2_Type.textContent = `${Game.jugadores[turnoActual].pokemons[1].tipo}`;
                pokemon2_Level.textContent = `${Game.jugadores[turnoActual].pokemons[1].base} +  ${Game.jugadores[turnoActual].pokemons[1].extra}`;
                pokemon2_Status.textContent = `${Game.jugadores[turnoActual].pokemons[1].estatus}`;
                Pokemon2.classList.remove('No-Pokemon');
                break;
            case 2:
                const imagen3 = document.getElementById('imgPkm3');
                imagen3.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[turnoActual].pokemons[2].pokedex}.png")`;
                pokemon3_Name.textContent = `${Game.jugadores[turnoActual].pokemons[2].nombre}`;
                pokemon3_Type.textContent = `${Game.jugadores[turnoActual].pokemons[2].tipo}`;
                pokemon3_Level.textContent = `${Game.jugadores[turnoActual].pokemons[2].base} + ${Game.jugadores[turnoActual].pokemons[2].extra} `;
                pokemon3_Status.textContent = `${Game.jugadores[turnoActual].pokemons[2].estatus}`;
                Pokemon3.classList.remove('No-Pokemon');
                break;
            case 3:
                const imagen4 = document.getElementById('imgPkm4');
                imagen4.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[turnoActual].pokemons[3].pokedex}.png")`;
                pokemon4_Name.textContent = `${Game.jugadores[turnoActual].pokemons[3].nombre}`;
                pokemon4_Type.textContent = `${Game.jugadores[turnoActual].pokemons[3].tipo}`;
                pokemon4_Level.textContent = `${Game.jugadores[turnoActual].pokemons[3].base} + ${Game.jugadores[turnoActual].pokemons[3].extra} `;
                pokemon4_Status.textContent = `${Game.jugadores[turnoActual].pokemons[3].estatus}`;
                Pokemon4.classList.remove('No-Pokemon');
                break;
            case 4:
                const imagen5 = document.getElementById('imgPkm5');
                imagen5.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[turnoActual].pokemons[4].pokedex}.png")`;
                pokemon5_Name.textContent = `${Game.jugadores[turnoActual].pokemons[4].nombre}`;
                pokemon5_Type.textContent = `${Game.jugadores[turnoActual].pokemons[4].tipo}`;
                pokemon5_Level.textContent = `${Game.jugadores[turnoActual].pokemons[4].base} + ${Game.jugadores[turnoActual].pokemons[4].extra} `;
                pokemon5_Status.textContent = `${Game.jugadores[turnoActual].pokemons[4].estatus}`;
                Pokemon5.classList.remove('No-Pokemon');
                break;

            case 5:
                const imagen6 = document.getElementById('imgPkm6');
                imagen6.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[turnoActual].pokemons[5].pokedex}.png")`;
                pokemon6_Name.textContent = `${Game.jugadores[turnoActual].pokemons[5].nombre}`;
                pokemon6_Type.textContent = `${Game.jugadores[turnoActual].pokemons[5].tipo}`;
                pokemon6_Level.textContent = `${Game.jugadores[turnoActual].pokemons[5].base} + ${Game.jugadores[turnoActual].pokemons[5].extra} `;
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

    const evolve1_icon = document.getElementById("evolution1");
    const evolve2_icon = document.getElementById("evolution2");
    const evolve3_icon = document.getElementById("evolution3");
    const evolve4_icon = document.getElementById("evolution4");
    const evolve5_icon = document.getElementById("evolution5");
    const evolve6_icon = document.getElementById("evolution6");
    

    for( var i=0 ; i< Game.jugadores[Game.turnoActual].pokemons.length;i++){
        switch (i){
            case 0:
                if(Game.jugadores[Game.turnoActual].pokemons[0].extra >= Game.jugadores[Game.turnoActual].pokemons[0].LevelToEvo){
                   
                    evolve1_icon.style.display ="flex" ;}
                    else{
                        evolve1_icon.style.display ="none";}
                break;
            case 1:
                if(Game.jugadores[Game.turnoActual].pokemons[1].extra >= Game.jugadores[Game.turnoActual].pokemons[1].LevelToEvo){
                    evolve2_icon.style.display ="flex" ;}
                    else{
                        evolve2_icon.style.display ="none";}
                break;
            case 2:
                if(Game.jugadores[Game.turnoActual].pokemons[2].extra >= Game.jugadores[Game.turnoActual].pokemons[2].LevelToEvo){
                    evolve3_icon.style.display ="flex" ;}
                    else{
                        evolve3_icon.style.display ="none";}
                break;
            case 3:
                if(Game.jugadores[Game.turnoActual].pokemons[3].extra >= Game.jugadores[Game.turnoActual].pokemons[3].LevelToEvo){
                    evolve4_icon.style.display ="flex" ;}
                    else{
                        evolve4_icon.style.display ="none";}
                        
                break;
            case 4:
                if(Game.jugadores[Game.turnoActual].pokemons[4].extra >= Game.jugadores[Game.turnoActual].pokemons[4].LevelToEvo){
                    evolve5_icon.style.display ="flex" ;}
                    else{
                        evolve5_icon.style.display ="none";}
                break;
            case 5:
                if(Game.jugadores[Game.turnoActual].pokemons[5].extra >= Game.jugadores[Game.turnoActual].pokemons[5].LevelToEvo){
                    evolve6_icon.style.display ="flex" ;}
                    else{
                        evolve6_icon.style.display ="none";}
                break;
        }

    }

    for( var i=0 ; i< Game.jugadores[Game.turnoActual].pokemons.length;i++){
        switch (i){
            case 0:
                if( Game.jugadores[Game.turnoActual].pokemons[0].LevelToEvo == 0){
                    evolve1_icon.style.display ="none" ;}
                break;
            case 1:
                if( Game.jugadores[Game.turnoActual].pokemons[1].LevelToEvo == 0){
                    evolve2_icon.style.display ="none" ;}
                break;
            case 2:
                if(Game.jugadores[Game.turnoActual].pokemons[2].LevelToEvo == 0){
                    evolve3_icon.style.display ="none" ;}
                break;
            case 3:
                if(Game.jugadores[Game.turnoActual].pokemons[3].LevelToEvo == 0){
                    evolve4_icon.style.display ="none" ;}
                break;
            case 4:
                if(Game.jugadores[Game.turnoActual].pokemons[4].LevelToEvo == 0){
                    evolve5_icon.style.display ="none" ;}
                break;
            case 5:
                if( Game.jugadores[Game.turnoActual].pokemons[5].LevelToEvo == 0){
                    evolve6_icon.style.display ="none" ;}
                break;
        }

    }
        
    let attach1 = document.getElementById("attach1");
    let attach2 = document.getElementById("attach2");
    let attach3 = document.getElementById("attach3");
    let attach4 = document.getElementById("attach4");
    let attach5 = document.getElementById("attach5");
    let attach6 = document.getElementById("attach6");

    for( var i=0 ; i< Game.jugadores[Game.turnoActual].pokemons.length;i++){
        switch (i){
            case 0:
                if( Game.jugadores[Game.turnoActual].pokemons[0].attached == "TM"){
                    attach1.style.backgroundImage= "url('./images/tm.png')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[0].attached == "PROTEIN"){
                    attach1.style.backgroundImage= "url('./images/protein.webp')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[0].attached == ""){
                    attach1.style.backgroundImage= "url('./images/cardBack.jpg')";
                }
                break;
            case 1:
                if( Game.jugadores[Game.turnoActual].pokemons[1].attached == "TM"){
                    attach2.style.backgroundImage= "url('./images/tm.png')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[1].attached == "PROTEIN"){
                    attach2.style.backgroundImage= "url('./images/protein.webp')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[1].attached == ""){
                    attach2.style.backgroundImage= "url('./images/cardBack.jpg')";
                }
                break;
            case 2:
                if( Game.jugadores[Game.turnoActual].pokemons[2].attached == "TM"){
                    attach3.style.backgroundImage= "url('./images/tm.png')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[2].attached == "PROTEIN"){
                    attach3.style.backgroundImage= "url('./images/protein.webp')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[2].attached == ""){
                    attach3.style.backgroundImage= "url('./images/cardBack.jpg')";
                }
                break;
            case 3:
                if( Game.jugadores[Game.turnoActual].pokemons[3].attached == "TM"){
                    attach4.style.backgroundImage= "url('./images/tm.png')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[3].attached == "PROTEIN"){
                    attach4.style.backgroundImage= "url('./images/protein.webp')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[3].attached == ""){
                    attach4.style.backgroundImage= "url('./images/cardBack.jpg')";
                }
                break;
            case 4:
                if( Game.jugadores[Game.turnoActual].pokemons[4].attached == "TM"){
                    attach5.style.backgroundImage= "url('./images/tm.png')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[4].attached == "PROTEIN"){
                    attach5.style.backgroundImage= "url('./images/protein.webp')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[4].attached == ""){
                    attach5.style.backgroundImage= "url('./images/cardBack.jpg')";
                }
                break;
            case 5:
                if( Game.jugadores[Game.turnoActual].pokemons[5].attached == "TM"){
                    attach6.style.backgroundImage= "url('./images/tm.png')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[5].attached == "PROTEIN"){
                    attach6.style.backgroundImage= "url('./images/protein.webp')";
                }
                else if( Game.jugadores[Game.turnoActual].pokemons[5].attached == ""){
                    attach6.style.backgroundImage= "url('./images/cardBack.jpg')";
                }
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
            console.log(resultado);
            if (resultado[1] === undefined){
               
                notFound.style.display="block";
                console.log("Pokemon WAS not Found");
                
            }
            else{
                const imagenFound = document.getElementById('pokemonfound_img');
                const nombrefound = document.getElementById("pokemonfound_name");
                const tipofound = document.getElementById("pokemonfound_type");
                const levelfound = document.getElementById("pokemonfound_level");
                pokedexWindow.style.display= "none";
                pokemonfoundWindow.style.display ="flex";
                imagenFound.style.backgroundImage = `url("./images/POKEMON/0${resultado[0]}.png")`;
                nombrefound.textContent = ` ${resultado[1]}`;
                tipofound.textContent = ` ${resultado[2]}`;
                levelfound.textContent = ` ${resultado[3]}`;

                const confirm = document.getElementById("ConfirmPokemon");
                 confirm.addEventListener('click',()=>{
                if(pokemonadded == false){
                const PokeNew = new Pokemon(resultado[0],resultado[1],resultado[2],resultado[3],resultado[4],resultado[5],resultado[6],resultado[7]);
                Game.jugadores[turnoActual].agregarPokemon(PokeNew);
                console.log(PokeNew);
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


async function LookForPokemon(Game){
    var pokemonFound = false;
    var turnoActual = Game.turnoActual;
    console.log ("Agregar Poklemon " + Game.jugadores[turnoActual].nombre);
    const menuAddPokemon = document.getElementById("trainer_battle_menu");
    const pokedexWindow = document.getElementById("pokedexMain_battle");
    const pokemonfoundWindow = document.getElementById("PokemonFound_battle");
    const search = document.getElementById("SearchPokedex_battle");
    menuAddPokemon.style.display="block";
    const grayed_GB = document.getElementById("grayed_BG");
    grayed_GB.style.display = "flex";
    pokedexWindow.style.display= "flex";
    pokemonfoundWindow.style.display ="none";
    const pokedex = document.getElementById("Pokedex_battle");
    console.log("pokedex"+ pokedex.value);
    const notFound = document.getElementById("Not_Found_battle");
    notFound.style.display="none";

    search.addEventListener('click', async()=>{
       
        try {
            var pokedex_str =  zfill(pokedex.value ,3);
            console.log("#"+ pokedex_str);
            const resultado = await buscarPokemon(pokedex_str);
            console.log(resultado);
            if (resultado[1] === undefined){
               
                notFound.style.display="block";
                console.log("Pokemon WAS not Found");
                
            }
            else{
                const imagenFound = document.getElementById('pokemonfound_img_battle');
                const nombrefound = document.getElementById("pokemonfound_name_battle");
                const tipofound = document.getElementById("pokemonfound_type_battle");
                const levelfound = document.getElementById("pokemonfound_level_battle");
                pokedexWindow.style.display= "none";
                pokemonfoundWindow.style.display ="flex";
                imagenFound.style.backgroundImage = `url("./images/POKEMON/0${resultado[0]}.png")`;
                nombrefound.textContent = ` ${resultado[1]}`;
                tipofound.textContent = ` ${resultado[2]}`;
                levelfound.textContent = ` ${resultado[3]}`;

                const confirm = document.getElementById("ConfirmPokemon_battle");
                 confirm.addEventListener('click',()=>{
                if(pokemonFound == false){
                const PokeNew = new Pokemon(resultado[0],resultado[1],resultado[2],resultado[3],resultado[4],resultado[5],resultado[6],resultado[7]);
                menuAddPokemon.style.display="none";
                grayed_GB.style.display = "none";
                pokedex.value="";
                pokemonadded = true;
                console.log("Wild to battle:" + PokeNew.nombre);
                return PokeNew;
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

  function sentPokemon(Game){
    localStorage.setItem('trainner1', Game.jugadores[0].nombre);
    localStorage.setItem('trainner2', Game.jugadores[1].nombre);
    const pokemon1Json = JSON.stringify(Game.jugadores[0].pokemons[0]);
    localStorage.setItem('pokemon1', pokemon1Json);
    const pokemon2Json = JSON.stringify(Game.jugadores[1].pokemons[0]);
    localStorage.setItem('pokemon2', pokemon2Json);


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

/* BATTLE FUCTION */
function PlayersToBattle(Trainer, Rival){
    let List_PokemonsPlayer = Trainer.pokemons; 
    let List_PokemonsRival = Rival.pokemons;
    var Battle = 0;
    function choosePokemonToBattle(Lista_Pokemons){
        let pkm1_image = document.getElementById("list_Pokemon_Pkm1");
        let pkm2_image = document.getElementById("list_Pokemon_Pkm2");
        let pkm3_image = document.getElementById("list_Pokemon_Pkm3");
        let pkm4_image = document.getElementById("list_Pokemon_Pkm4");
        let pkm5_image = document.getElementById("list_Pokemon_Pkm5");
        let pkm6_image = document.getElementById("list_Pokemon_Pkm6");
        pkm1_image.style.display="none";
        pkm2_image.style.display="none";
        pkm3_image.style.display="none";
        pkm4_image.style.display="none";
        pkm5_image.style.display="none";
        pkm6_image.style.display="none";

        for (var i=0; i < Lista_Pokemons.length; i++) {
            if ( i == 0){
                
                pkm1_image.style.backgroundImage = `url("./images/POKEMON/0${Lista_Pokemons[i].pokedex}.png")`;
                pkm1_image.style.display="flex";
            }
            else if( i == 1){
             
                pkm2_image.style.backgroundImage = `url("./images/POKEMON/0${Lista_Pokemons[i].pokedex}.png")`;
                pkm2_image.style.display="flex";
            }
            else if( i == 2){
                
                pkm3_image.style.backgroundImage = `url("./images/POKEMON/0${Lista_Pokemons[i].pokedex}.png")`;
                pkm3_image.style.display="flex";
            }
            else if( i == 3){
                pkm4_image.style.backgroundImage = `url("./images/POKEMON/0${Lista_Pokemons[i].pokedex}.png")`;
                pkm4_image.style.display="flex";
            }
            else if( i == 4){
                pkm5_image.style.backgroundImage = `url("./images/POKEMON/0${Lista_Pokemons[i].pokedex}.png")`;
                pkm5_image.style.display="flex";
            }
            else if( i == 5){
                pkm6_image.style.backgroundImage = `url("./images/POKEMON/0${Lista_Pokemons[i].pokedex}.png")`;
                pkm6_image.style.display="flex";
            }
        }

        pkm1_image.addEventListener("click", ()=>  {
            return Lista_Pokemons[0];
        });

        pkm2_image.addEventListener("click", ()=>{
            return Lista_Pokemons[1];
        });
        pkm3_image.addEventListener("click", ()=>{
            return Lista_Pokemons[2];
        });
        pkm4_image.addEventListener("click", ()=>{
            return Lista_Pokemons[3];
        });
        pkm5_image.addEventListener("click", ()=>{
            return Lista_Pokemons[4];
        });
        pkm6_image.addEventListener("click", ()=>{
            return Lista_Pokemons[5];
        });

    }

    let Pkm_Player_Selected = choosePokemonToBattle(List_PokemonsPlayer);
    let Pkm_Rival_Selected = choosePokemonToBattle(List_PokemonsRival);
    let Winner;
    Winner = battle_pokemon(Pkm_Player_Selected,Pkm_Rival_Selected);
    console.log ("Winner is " + Winner);

    if (Winner == Pkm_Player_Selected){
        List_PokemonsRival = List_PokemonsRival.filter(element => element !== Pkm_Rival_Selected);
        if (List_PokemonsRival.length > 0){
            Pkm_Rival_Selected = choosePokemonToBattle(List_PokemonsRival);
            Winner = battle_pokemon(Pkm_Player_Selected,Pkm_Rival_Selected);
            }
    else if (Winner == Pkm_Rival_Selected){
        List_PokemonsPlayer = List_PokemonsPlayer.filter(element => element !== Pkm_Player_Selected);
        Pkm_Player_Selected = choosePokemonToBattle(List_PokemonsPlayer);
        Winner = battle_pokemon(Pkm_Player_Selected,Pkm_Rival_Selected);
    }


    }


    
}

function battle_pokemon(Pokemon1,Pokemon2,round){
   var ronda = round;
   let arena_title = document.getElementById("arena_title");
   arena_title.textContent = "ROUND -> " + ronda;
    let Finish_Battle = document.getElementById('Finish_Battle');
    Finish_Battle.style.display ="none";
   
    const Battle_arena = document.getElementById("Battle_arena");
    const List_Pokemons = document.getElementById("List_Pokemons");
    const Titlte_Battle = document.getElementById("Titlte_Battle");
    let Pokemon1_suma = document.getElementById("Pokemon1_suma");
    let Pokemon2_suma = document.getElementById("Pokemon2_suma");
    Pokemon1_suma.style.display="none";
    Pokemon2_suma.style.display="none";


    List_Pokemons.style.display ="none";
    Titlte_Battle.style.display="none";
    Battle_arena.style.display="flex";
    
    var Tipo1= Pokemon1.tipo;
    var Tipo2= Pokemon2.tipo;
    var Nivel1 = Pokemon1.nivel;
    var Nivel2 = Pokemon2.nivel;
    var Estatus1 = Pokemon1.estatus;
    var Estatus2 = Pokemon2.estatus;
    var Attached1= Pokemon1.attached;
    var Attached2= Pokemon2.attached;
    var P1_Atkl = Pokemon1.attack1;
    var P1_Atk2 = Pokemon1.attack2;
    var P1_Atk3 = Pokemon1.attack3;
    var P2_Atkl = Pokemon2.attack1;
    var P2_Atk2 = Pokemon2.attack2;
    var P2_Atk3 = Pokemon2.attack3;
    var AttackSelected1 = "";
    var AttackSelected2 = "";
    var Total1=0;
    var Total2=0;
    var Dice1=0;
    var Dice2=0;
    var Bonus1=0;
    var Bonus2 =0;
    var Atk1_Power=0;
    var Atk2_Power=0;
    var Extra1=0;
    var Extra2=0
    var Bonus1_selected=0;
    var Bonus2_selected=0;




    var P1Bonus1 = checkBonusType(P1_Atkl.tipo,Tipo2);
    var P1Bonus2 = checkBonusType(P1_Atk2.tipo ,Tipo2);
    var P1Bonus3 = checkBonusType(P1_Atk3.tipo ,Tipo2);
    var P2Bonus1 = checkBonusType(P2_Atkl.tipo,Tipo1);
    var P2Bonus2 = checkBonusType(P2_Atk2 .tipo,Tipo1);
    var P2Bonus3 = checkBonusType(P2_Atk3 .tipo,Tipo1);

    var P1_atk1_bonusLabel = document.getElementById("P1_atk1_bonus");
    P1_atk1_bonusLabel.textContent="";
    P1_atk1_bonusLabel.className="bonus";
    var P1_atk2_bonusLabel = document.getElementById("P1_atk2_bonus");
    P1_atk2_bonusLabel.textContent="";
    P1_atk2_bonusLabel.className="bonus";
    var P1_atk3_bonusLabel = document.getElementById("P1_atk3_bonus");
    P1_atk3_bonusLabel.textContent="";
    P1_atk3_bonusLabel.className="bonus";
    var P2_atk1_bonusLabel = document.getElementById("P2_atk1_bonus");
    P2_atk1_bonusLabel.textContent="";
    P2_atk1_bonusLabel.className="bonus2";
    var P2_atk2_bonusLabel = document.getElementById("P2_atk2_bonus");
    P2_atk2_bonusLabel.textContent="";
    P2_atk2_bonusLabel.className="bonus2";
    var P2_atk3_bonusLabel = document.getElementById("P2_atk3_bonus");
    P2_atk3_bonusLabel.textContent="";
    P2_atk3_bonusLabel.className="bonus2";

    function showBonusType (Bonus, elemento){
        if(Bonus == 2){
            elemento.textContent = "+2";
            elemento.classList.add("bonus_plus");}
        else if(Bonus == -2){
            elemento.textContent = "-2";
            elemento.classList.add("bonus_minus");}
     }

     showBonusType(P1Bonus1,P1_atk1_bonusLabel);
     showBonusType(P1Bonus2,P1_atk2_bonusLabel);
     showBonusType(P1Bonus3,P1_atk3_bonusLabel);
     showBonusType(P2Bonus1,P2_atk1_bonusLabel);
     showBonusType(P2Bonus2,P2_atk2_bonusLabel);
     showBonusType(P2Bonus3,P2_atk3_bonusLabel);



    hideDices();
    const P1_Atk1_button = document.getElementById("P1_attack1");
    const P1_Atk2_button = document.getElementById("P1_attack2");
    const P1_Atk3_button = document.getElementById("P1_attack3");
    const P2_Atk1_button = document.getElementById("P2_attack1");
    const P2_Atk2_button = document.getElementById("P2_attack2");
    const P2_Atk3_button = document.getElementById("P2_attack3");
    actualizarClasesTipo(P1_Atk1_button,P1_Atkl.tipo);
    actualizarClasesTipo(P1_Atk2_button,P1_Atk2.tipo);
    actualizarClasesTipo(P1_Atk3_button,P1_Atk3.tipo);
    actualizarClasesTipo(P2_Atk1_button,P2_Atkl.tipo);
    actualizarClasesTipo(P2_Atk2_button,P2_Atk2.tipo);
    actualizarClasesTipo(P2_Atk3_button,P2_Atk3.tipo);
    P1_Atk1_button.style.display="flex";
    P1_Atk2_button.style.display="flex";
    P2_Atk1_button.style.display="none";
    P2_Atk2_button.style.display="none";
    if (Pokemon1.attached == "TM"){
        P1_Atk3_button.style.display="flex";
    }else{
        P1_Atk3_button.style.display="none";
    }
    
    P2_Atk3_button.style.display="none";
    
    

     function actualizarTotales (Total1, Total2){
        let arena_totales = document.getElementById("arena_totales");
        let Total1_label = document.getElementById("arena_total1");
        let Total2_label = document.getElementById("arena_total2");
        Total1_label.textContent="";
        Total2_label.textContent="";
        arena_totales.style.display="none";
        Total1_label.textContent=Total1;
        Total2_label.textContent=Total2;
        arena_totales.style.display="flex";
        
     }
     function actualizarClasesTipo(elemento, tipo){
        elemento.className = `Attack ${tipo}` ;
     }

     

     Total1= Nivel1; 
     Total2= Nivel2;

    actualizarTotales(Total1,Total2);
    const Image1 = document.getElementById("arena_pokemon1");
    const Image2 = document.getElementById("arena_pokemon2");
    Image1.style.backgroundImage = `url("./images/POKEMON/0${Pokemon1.pokedex}.png")`;
    Image2.style.backgroundImage = `url("./images/POKEMON/0${Pokemon2.pokedex}.png")`;

    const P1_atk1_name = document.getElementById("P1_attack1_name").textContent = Pokemon1.attack1.nombre;
    const P1_atk1_strength = document.getElementById("P1_attack1_power").textContent = Pokemon1.attack1.strength;
    const P1_atk2_name = document.getElementById("P1_attack2_name").textContent = Pokemon1.attack2.nombre;
    const P1_atk2_strength = document.getElementById("P1_attack2_power").textContent = Pokemon1.attack2.strength;

    const P2_atk1_name = document.getElementById("P2_attack1_name").textContent = Pokemon2.attack1.nombre;
    const P2_atk1_strength = document.getElementById("P2_attack1_power").textContent = Pokemon2.attack1.strength;
    const P2_atk2_name = document.getElementById("P2_attack2_name").textContent = Pokemon2.attack2.nombre;
    const P2_atk2_strength = document.getElementById("P2_attack2_power").textContent = Pokemon2.attack2.strength;
    
   


    function displayPt2(){
        P1_dices_buttons = document.getElementById("P1_dices").style.display="flex";
        P2_dices_buttons = document.getElementById("P2_dices").style.display="flex";
        P1_status_buttons = document.getElementById("P1_status").style.display="flex";
        P2_status_buttons = document.getElementById("P2_status").style.display="flex";
        Pokemon1_suma.style.display="flex";
        Pokemon2_suma.style.display="flex";


    }
    function hideDices(){
        P1_dices_buttons = document.getElementById("P1_dices").style.display="none";
        P2_dices_buttons = document.getElementById("P2_dices").style.display="none";
        P1_status_buttons = document.getElementById("P1_status").style.display="none";
        P2_status_buttons = document.getElementById("P2_status").style.display="none";
    }

    P1_Atk1_button.addEventListener('click',()=>{
        AttackSelected1 = P1_Atkl;
        Bonus1 = P1Bonus1;
        Bonus1_selected  = P1Bonus1;
        Atk1_Power= AttackSelected1 .strength;
        Total1 = Nivel1 + Atk1_Power + Bonus1;
        console.log("P1 Totla: " + Total1);
        P1_Atk1_button.style.display="none";
        P1_Atk2_button.style.display="none";
        P1_Atk3_button.style.display="none";
        P2_Atk1_button.style.display="flex";
        P2_Atk2_button.style.display="flex";
        if (Pokemon2.attached == "TM"){
            P2_Atk3_button.style.display="flex";
        }else{
            P2_Atk3_button.style.display="none";
        }
        actualizarTotales(Total1,Total2);

    })

    P1_Atk2_button.addEventListener('click',()=>{
        AttackSelected1 = P1_Atk2;
        Bonus1 = P1Bonus2;
        Bonus1_selected  = P1Bonus2;
        Atk1_Power= AttackSelected1 .strength;
        Total1 = Nivel1 + Atk1_Power + Bonus1;
        console.log("P1 Total: " + Total1);
        P1_Atk1_button.style.display="none";
        P1_Atk2_button.style.display="none";
        P1_Atk3_button.style.display="none";
        P2_Atk1_button.style.display="flex";
        P2_Atk2_button.style.display="flex";
        if (Pokemon2.attached == "TM"){
            P2_Atk3_button.style.display="flex";
        }else{
            P2_Atk3_button.style.display="none";
        }
        actualizarTotales(Total1,Total2);
   
    })

    P1_Atk3_button.addEventListener('click',()=>{
        AttackSelected1 = P1_Atk3;
        Bonus1 = P1Bonus3;
        Bonus1_selected  = P1Bonus3;
        Atk1_Power= AttackSelected1 .strength;
        Total1 = Nivel1 + Atk1_Power + Bonus1;
        console.log("P1 Total: " + Total1);
        P1_Atk1_button.style.display="none";
        P1_Atk2_button.style.display="none";
        P1_Atk3_button.style.display="none";
        P2_Atk1_button.style.display="flex";
        P2_Atk2_button.style.display="flex";
        if (Pokemon2.attached == "TM"){
            P2_Atk3_button.style.display="flex";
        }else{
            P2_Atk3_button.style.display="none";
        }
        actualizarTotales(Total1,Total2);
   
    })

    P2_Atk1_button.addEventListener('click',()=>{
        AttackSelected2 = P2_Atkl;
        Bonus2 = P2Bonus1;
        Bonus2_selected  = P2Bonus1;
        Atk2_Power= AttackSelected2 .strength;
        Total2 = Nivel2 + Atk2_Power + Bonus2;
        console.log("P2 Total: " + Total2);
        P2_Atk1_button.style.display="none";
        P2_Atk2_button.style.display="none";
        P2_Atk3_button.style.display="none";
        actualizarTotales(Total1,Total2);
        displayPt2();
        updateTotales(Total1,Total2,Pokemon1,Pokemon2,Dice1,Dice2,Bonus1,Bonus2);

    })

    P2_Atk2_button.addEventListener('click',()=>{
        AttackSelected2 = P2_Atk2;
        Bonus2 = P2Bonus2;
        Bonus2_selected  = P2Bonus2;
        Atk2_Power= AttackSelected2 .strength;
        Total2 = Nivel2 + Atk2_Power + Bonus2;
        console.log("P2 Total: " + Total2);
        P2_Atk1_button.style.display="none";
        P2_Atk2_button.style.display="none";
        P2_Atk3_button.style.display="none";
        actualizarTotales(Total1,Total2);
        displayPt2();
        updateTotales(Total1,Total2,Pokemon1,Pokemon2,Dice1,Dice2,Bonus1,Bonus2);
    })

    P2_Atk3_button.addEventListener('click',()=>{
        AttackSelected2 = P2_Atk3;
        Bonus2 = P2Bonus3;
        Bonus2_selected  = P2Bonus3;
        Atk2_Power= AttackSelected2 .strength;
        Total2 = Nivel2 + Atk2_Power + Bonus2;
        console.log("P2 Total: " + Total2);
        P2_Atk1_button.style.display="none";
        P2_Atk2_button.style.display="none";
        P2_Atk3_button.style.display="none";
        actualizarTotales(Total1,Total2);
        displayPt2();
        updateTotales(Total1,Total2,Pokemon1,Pokemon2,Dice1,Dice2,Bonus1,Bonus2);
    })




    P1_paralized = document.getElementById("P1_paralized");
    P1_sleep = document.getElementById("P1_sleep");
    P1_frozen = document.getElementById("P1_frozen");
    P1_burned = document.getElementById("P1_burned");
    P1_confused = document.getElementById("P1_confused");
    P2_paralized = document.getElementById("P2_paralized");
    P2_sleep = document.getElementById("P2_sleep");
    P2_frozen = document.getElementById("P2_frozen");
    P2_burned = document.getElementById("P2_burned");
    P2_confused = document.getElementById("P2_confused");

    function status_Off(){
        P1_paralized.style.filter = "brightness(30%)";
        P1_sleep.style.filter = "brightness(30%)";
        P1_frozen.style.filter = "brightness(30%)";
        P1_burned.style.filter = "brightness(30%)";
        P1_confused.style.filter = "brightness(30%)";
        P2_paralized.style.filter = "brightness(30%)";
        P2_sleep.style.filter = "brightness(30%)";
        P2_frozen.style.filter = "brightness(30%)";
        P2_burned.style.filter = "brightness(30%)";
        P2_confused.style.filter = "brightness(30%)";
    }

    function CalcularTotales(player){
        if (player == "P1"){
            if (Estatus1 == "Paralized" || Estatus1== "Sleep" ||  Estatus1 == "Frozen"){
                Atk1_Power= 0;
                Bonus1 = 0;
                Total1 = Nivel1 + Atk1_Power + Dice1 +Extra1;
                console.log("Paralized , total : " + Total1);
            }
            if (Estatus1== "Burned"){
                Atk1_Power= AttackSelected1 .strength;
                Bonus1 = Bonus1_selected;
                Total1 = (Nivel1 + Atk1_Power + Bonus1 + Dice1 + Extra1)-1;
                console.log("Burned Total 1: " + Total1);
            }
            if(Estatus1== "Confused"){
                if (Dice1 == 1  || Dice1 == 3   || Dice1 == 5){
                    Extra2 = Dice1;
                    Atk1_Power= AttackSelected1 .strength;
                    Bonus1 = Bonus1_selected;
                    Total1 = Nivel1 + Atk1_Power + Bonus1 + Dice1 + Extra1;
                    console.log("confused Total 1: " + Total1);
                }
                else{
                    Extra2 =0;
                    Atk1_Power= AttackSelected1 .strength;
                    Bonus1 = Bonus1_selected;
                    Total1 = Nivel1 + Atk1_Power + Bonus1 + Dice1 + Extra1;
                    console.log("confused Total 1: " + Total1);
                }
               
            }

            if (Estatus1== "Normal"){
                Atk1_Power= AttackSelected1 .strength;
                Bonus1 = Bonus1_selected;
                Total1 = Nivel1 + Atk1_Power + Bonus1 + Dice1 + Extra1;
                console.log("Burned Total 1: " + Total1);
            }}
        if (player == "P2"){
                if (Estatus2 == "Paralized" || Estatus2== "Sleep" ||  Estatus2 == "Frozen"){
                    Atk2_Power= 0;
                    Bonus2=0;
                    Total2 = Nivel2 + Atk2_Power + Dice2 + Extra2;
                    console.log("Paralized , total 2 : " + Total2);
                }
                if (Estatus2== "Burned"){  
                    Atk2_Power= AttackSelected2 .strength;
                    Bonus2 = Bonus2_selected;
                    Total2 = (Nivel2 + Atk2_Power + Bonus2 + Dice2 + Extra2)-1;
                    console.log("Burned Total 1: " + Total2);
                }
                if(Estatus2== "Confused"){
                    if (Dice2 == 1  || Dice2 == 3   || Dice2 == 5){
                        Extra1 = Dice2;
                        Atk2_Power= AttackSelected2 .strength;
                        Bonus2 = Bonus2_selected;
                        Total2 = Nivel2 + Atk2_Power + Bonus2 + Dice2 + Extra2;
                        console.log("confused Total 2: " + Total2);
                    }
                    else{
                        Extra1 = 0;
                        Atk2_Power= AttackSelected2 .strength;
                        Bonus2 = Bonus2_selected;
                        Total2 = Nivel2 + Atk2_Power + Bonus2 + Dice2 + Extra2;
                        console.log("confused Total 2: " + Total2);

                    }
                   
                }
    
                if (Estatus2== "Normal"){
                    Atk2_Power= AttackSelected2 .strength;
                    Bonus2 = Bonus2_selected;
                    Total2 = Nivel2 + Atk2_Power + Bonus2 + Dice2 + Extra2;
                    console.log("Burned Total 1: " + Total1);
                }}
       
       
    }

    function updateTotales(){
            CalcularTotales("P1");
            CalcularTotales("P2");
            actualizarTotales(Total1,Total2);

            var Nivel_suma = document.getElementById("P1Nivel_label").textContent = Nivel1;
            var Attack_suma = document.getElementById("P1Attack_suma_label").textContent = Atk1_Power;
            var Bonus_suma = document.getElementById("P1Bonus_label").textContent = Bonus1;
            var Dice_suma = document.getElementById("P1Dice_suma_label").textContent = Dice1;
            var Extra_suma = document.getElementById("P1Extra_suma_label").textContent = Extra1;

            var Nivel_suma2 = document.getElementById("P2Nivel_label").textContent = Nivel2;
            var Attack_suma2 = document.getElementById("P2Attack_suma_label").textContent = Atk2_Power;
            var Bonus_suma2 = document.getElementById("P2Bonus_label").textContent = Bonus2;
            var Dice_suma2 = document.getElementById("P2Dice_suma_label").textContent = Dice2;
            var Extra_suma2 = document.getElementById("P2Extra_suma_label").textContent = Extra2;





            console.log("Pokemon1 Status " + Estatus1 + " Nivel " + Nivel1 + " Attack " + Atk1_Power + " Bonus " + Bonus1 + " Dice " + Dice1 + " Total " + Total1);
            console.log("Pokemon2 Status " + Estatus2 + " Nivel " + Nivel2 + " Attack " + Atk2_Power + " Bonus " + Bonus2 + " Dice " + Dice2 + " Total " + Total2);
        }

    

    P1_paralized.addEventListener('click',()=>{
        if(Estatus1 != "Paralized"){
            P1_paralized.style.filter = "brightness(100%)";
            P1_sleep.style.filter = "brightness(30%)";
            P1_frozen.style.filter = "brightness(30%)";
            P1_burned.style.filter = "brightness(30%)";
            P1_confused.style.filter = "brightness(30%)";
            Estatus1 = "Paralized";
            console.log(Estatus1);
            updateTotales();
            
        }
        else{
            P1_paralized.style.filter = "brightness(30%)";
            P1_sleep.style.filter = "brightness(30%)";
            P1_frozen.style.filter = "brightness(30%)";
            P1_burned.style.filter = "brightness(30%)";
            P1_confused.style.filter = "brightness(30%)";
            Estatus1 = "Normal";
            console.log(Estatus1);
            updateTotales();
        }
    })
    P1_sleep.addEventListener('click',()=>{
        if(Estatus1 != "Sleep"){
            P1_paralized.style.filter = "brightness(30%)";
            P1_sleep.style.filter = "brightness(100%)";
            P1_frozen.style.filter = "brightness(30%)";
            P1_burned.style.filter = "brightness(30%)";
            P1_confused.style.filter = "brightness(30%)";
            Estatus1 = "Sleep";
            console.log(Estatus1);
            updateTotales();
        }
        else{
            P1_paralized.style.filter = "brightness(30%)";
            P1_sleep.style.filter = "brightness(30%)";
            P1_frozen.style.filter = "brightness(30%)";
            P1_burned.style.filter = "brightness(30%)";
            P1_confused.style.filter = "brightness(30%)";
            Estatus1 = "Normal";
            console.log(Estatus1);
            updateTotales();
        }
    })
    P1_frozen.addEventListener('click',()=>{
        if(Estatus1 != "Frozen"){
            P1_paralized.style.filter = "brightness(30%)";
            P1_sleep.style.filter = "brightness(30%)";
            P1_frozen.style.filter = "brightness(100%)";
            P1_burned.style.filter = "brightness(30%)";
            P1_confused.style.filter = "brightness(30%)";
            Estatus1 = "Frozen";
            console.log(Estatus1);
            updateTotales();
        }
        else{
            P1_paralized.style.filter = "brightness(30%)";
            P1_sleep.style.filter = "brightness(30%)";
            P1_frozen.style.filter = "brightness(30%)";
            P1_burned.style.filter = "brightness(30%)";
            P1_confused.style.filter = "brightness(30%)";
            Estatus1 = "Normal";
            console.log(Estatus1);
            updateTotales();
        }
    })
    P1_burned.addEventListener('click',()=>{
        if(Estatus1 != "Burned"){
            P1_paralized.style.filter = "brightness(30%)";
            P1_sleep.style.filter = "brightness(30%)";
            P1_frozen.style.filter = "brightness(30%)";
            P1_burned.style.filter = "brightness(100%)";
            P1_confused.style.filter = "brightness(30%)";
            Estatus1 = "Burned";
            console.log(Estatus1);
            updateTotales();
        }
        else{
            P1_paralized.style.filter = "brightness(30%)";
            P1_sleep.style.filter = "brightness(30%)";
            P1_frozen.style.filter = "brightness(30%)";
            P1_burned.style.filter = "brightness(30%)";
            P1_confused.style.filter = "brightness(30%)";
            Estatus1 = "Normal";
            console.log(Estatus1);
            updateTotales();
        }
    })
    P1_confused.addEventListener('click',()=>{
        if(Estatus1 != "Confused"){
            P1_paralized.style.filter = "brightness(30%)";
            P1_sleep.style.filter = "brightness(30%)";
            P1_frozen.style.filter = "brightness(30%)";
            P1_burned.style.filter = "brightness(30%)";
            P1_confused.style.filter = "brightness(100%)";
            Estatus1 = "Confused";
            console.log(Estatus1);
            updateTotales();
        }
        else{
            P1_paralized.style.filter = "brightness(30%)";
            P1_sleep.style.filter = "brightness(30%)";
            P1_frozen.style.filter = "brightness(30%)";
            P1_burned.style.filter = "brightness(30%)";
            P1_confused.style.filter = "brightness(30%)";
            Estatus1 = "Normal";
            console.log(Estatus1);
            updateTotales();
        }
    })

    P2_paralized.addEventListener('click',()=>{
        if(Estatus2 != "Paralized"){
            P2_paralized.style.filter = "brightness(100%)";
            P2_sleep.style.filter = "brightness(30%)";
            P2_frozen.style.filter = "brightness(30%)";
            P2_burned.style.filter = "brightness(30%)";
            P2_confused.style.filter = "brightness(30%)";
            Estatus2 = "Paralized";
            console.log(Estatus2);
            updateTotales();
        }
        else{
            P2_paralized.style.filter = "brightness(30%)";
            P2_sleep.style.filter = "brightness(30%)";
            P2_frozen.style.filter = "brightness(30%)";
            P2_burned.style.filter = "brightness(30%)";
            P2_confused.style.filter = "brightness(30%)";
            Estatus2 = "Normal";
            console.log(Estatus2);
            updateTotales();
        }
    })
    P2_sleep.addEventListener('click',()=>{
        if(Estatus2 != "Sleep"){
            P2_paralized.style.filter = "brightness(30%)";
            P2_sleep.style.filter = "brightness(100%)";
            P2_frozen.style.filter = "brightness(30%)";
            P2_burned.style.filter = "brightness(30%)";
            P2_confused.style.filter = "brightness(30%)";
            Estatus2 = "Sleep";
            console.log(Estatus2);
            updateTotales();
        }
        else{
            P2_paralized.style.filter = "brightness(30%)";
            P2_sleep.style.filter = "brightness(30%)";
            P2_frozen.style.filter = "brightness(30%)";
            P2_burned.style.filter = "brightness(30%)";
            P2_confused.style.filter = "brightness(30%)";
            Estatus2 = "Normal";
            console.log(Estatus2);
            updateTotales();
        }
    })
    P2_frozen.addEventListener('click',()=>{
        if(Estatus2 != "Frozen"){
            P2_paralized.style.filter = "brightness(30%)";
            P2_sleep.style.filter = "brightness(30%)";
            P2_frozen.style.filter = "brightness(100%)";
            P2_burned.style.filter = "brightness(30%)";
            P2_confused.style.filter = "brightness(30%)";
            Estatus2 = "Frozen";
            console.log(Estatus2);
            updateTotales();
        }
        else{
            P2_paralized.style.filter = "brightness(30%)";
            P2_sleep.style.filter = "brightness(30%)";
            P2_frozen.style.filter = "brightness(30%)";
            P2_burned.style.filter = "brightness(30%)";
            P2_confused.style.filter = "brightness(30%)";
            Estatus2 = "Normal";
            console.log(Estatus2);
            updateTotales();
        }
    })
    P2_burned.addEventListener('click',()=>{
        if(Estatus2 != "Burned"){
            P2_paralized.style.filter = "brightness(30%)";
            P2_sleep.style.filter = "brightness(30%)";
            P2_frozen.style.filter = "brightness(30%)";
            P2_burned.style.filter = "brightness(100%)";
            P2_confused.style.filter = "brightness(30%)";
            Estatus2 = "Burned";
            console.log(Estatus2);
            updateTotales();
        }
        else{
            P2_paralized.style.filter = "brightness(30%)";
            P2_sleep.style.filter = "brightness(30%)";
            P2_frozen.style.filter = "brightness(30%)";
            P2_burned.style.filter = "brightness(30%)";
            P2_confused.style.filter = "brightness(30%)";
            Estatus2 = "Normal";
            console.log(Estatus2);
            updateTotales();
        }
    })
    P2_confused.addEventListener('click',()=>{
        if(Estatus2 != "Confused"){
            P2_paralized.style.filter = "brightness(30%)";
            P2_sleep.style.filter = "brightness(30%)";
            P2_frozen.style.filter = "brightness(30%)";
            P2_burned.style.filter = "brightness(30%)";
            P2_confused.style.filter = "brightness(100%)";
            Estatus2 = "Confused";
            console.log(Estatus2);
            updateTotales();
        }
        else{
            P2_paralized.style.filter = "brightness(30%)";
            P2_sleep.style.filter = "brightness(30%)";
            P2_frozen.style.filter = "brightness(30%)";
            P2_burned.style.filter = "brightness(30%)";
            P2_confused.style.filter = "brightness(30%)";
            Estatus2 = "Normal";
            console.log(Estatus2);
            updateTotales();
        }
    })


    P1_dice1 = document.getElementById("P1_dice1");
    P1_dice2 = document.getElementById("P1_dice2");
    P1_dice3 = document.getElementById("P1_dice3");
    P1_dice4 = document.getElementById("P1_dice4");
    P1_dice5 = document.getElementById("P1_dice5");
    P1_dice6 = document.getElementById("P1_dice6");
    P1_dice1.style.filter = "brightness(30%)";
    P1_dice2.style.filter = "brightness(30%)";
    P1_dice3.style.filter = "brightness(30%)";
    P1_dice4.style.filter = "brightness(30%)";
    P1_dice5.style.filter = "brightness(30%)";
    P1_dice6.style.filter = "brightness(30%)";

    P2_dice1 = document.getElementById("P2_dice1");
    P2_dice2 = document.getElementById("P2_dice2");
    P2_dice3 = document.getElementById("P2_dice3");
    P2_dice4 = document.getElementById("P2_dice4");
    P2_dice5 = document.getElementById("P2_dice5");
    P2_dice6 = document.getElementById("P2_dice6");
    P2_dice1.style.filter = "brightness(30%)";
    P2_dice2.style.filter = "brightness(30%)";
    P2_dice3.style.filter = "brightness(30%)";
    P2_dice4.style.filter = "brightness(30%)";
    P2_dice5.style.filter = "brightness(30%)";
    P2_dice6.style.filter = "brightness(30%)";

    P1_dice1.addEventListener('click',()=>{
        Dice1 =1;
        updateTotales();
        P1_dice1.style.filter = "brightness(100%)";
        P1_dice2.style.filter = "brightness(30%)";
        P1_dice3.style.filter = "brightness(30%)";
        P1_dice4.style.filter = "brightness(30%)";
        P1_dice5.style.filter = "brightness(30%)";
        P1_dice6.style.filter = "brightness(30%)";
    })
    P1_dice2.addEventListener('click',()=>{
        Dice1 =2;
        updateTotales();
        P1_dice1.style.filter = "brightness(30%)";
        P1_dice2.style.filter = "brightness(100%)";
        P1_dice3.style.filter = "brightness(30%)";
        P1_dice4.style.filter = "brightness(30%)";
        P1_dice5.style.filter = "brightness(30%)";
        P1_dice6.style.filter = "brightness(30%)";
    })
    P1_dice3.addEventListener('click',()=>{
        Dice1 =3;
        updateTotales();
        P1_dice1.style.filter = "brightness(30%)";
        P1_dice2.style.filter = "brightness(30%)";
        P1_dice3.style.filter = "brightness(100%)";
        P1_dice4.style.filter = "brightness(30%)";
        P1_dice5.style.filter = "brightness(30%)";
        P1_dice6.style.filter = "brightness(30%)";
    })
    P1_dice4.addEventListener('click',()=>{
        Dice1 =4;
        updateTotales();
        P1_dice1.style.filter = "brightness(30%)";
        P1_dice2.style.filter = "brightness(30%)";
        P1_dice3.style.filter = "brightness(30%)";
        P1_dice4.style.filter = "brightness(100%)";
        P1_dice5.style.filter = "brightness(30%)";
        P1_dice6.style.filter = "brightness(30%)";
    })
    P1_dice5.addEventListener('click',()=>{
        Dice1 =5;
        updateTotales();
        P1_dice1.style.filter = "brightness(30%)";
        P1_dice2.style.filter = "brightness(30%)";
        P1_dice3.style.filter = "brightness(30%)";
        P1_dice4.style.filter = "brightness(30%)";
        P1_dice5.style.filter = "brightness(100%)";
        P1_dice6.style.filter = "brightness(30%)";
    })
    P1_dice6.addEventListener('click',()=>{
        Dice1 =6;
        updateTotales();
        P1_dice1.style.filter = "brightness(30%)";
        P1_dice2.style.filter = "brightness(30%)";
        P1_dice3.style.filter = "brightness(30%)";
        P1_dice4.style.filter = "brightness(30%)";
        P1_dice5.style.filter = "brightness(30%)";
        P1_dice6.style.filter = "brightness(100%)";
    })


    
    P2_dice1.addEventListener('click',()=>{
        Dice2 =1;
        updateTotales();
        P2_dice1.style.filter = "brightness(100%)";
        P2_dice2.style.filter = "brightness(30%)";
        P2_dice3.style.filter = "brightness(30%)";
        P2_dice4.style.filter = "brightness(30%)";
        P2_dice5.style.filter = "brightness(30%)";
        P2_dice6.style.filter = "brightness(30%)";
        Finish_Battle.style.display ="flex";
    })
    P2_dice2.addEventListener('click',()=>{
        Dice2 =2;
        updateTotales();
        P2_dice1.style.filter = "brightness(30%)";
        P2_dice2.style.filter = "brightness(100%)";
        P2_dice3.style.filter = "brightness(30%)";
        P2_dice4.style.filter = "brightness(30%)";
        P2_dice5.style.filter = "brightness(30%)";
        P2_dice6.style.filter = "brightness(30%)";
        Finish_Battle.style.display ="flex";
    })
    P2_dice3.addEventListener('click',()=>{
        Dice2 =3;
        updateTotales();
        P2_dice1.style.filter = "brightness(30%)";
        P2_dice2.style.filter = "brightness(30%)";
        P2_dice3.style.filter = "brightness(100%)";
        P2_dice4.style.filter = "brightness(30%)";
        P2_dice5.style.filter = "brightness(30%)";
        P2_dice6.style.filter = "brightness(30%)";
        Finish_Battle.style.display ="flex";
    })
    P2_dice4.addEventListener('click',()=>{
        Dice2 =4;
        updateTotales();
        P2_dice1.style.filter = "brightness(30%)";
        P2_dice2.style.filter = "brightness(30%)";
        P2_dice3.style.filter = "brightness(30%)";
        P2_dice4.style.filter = "brightness(100%)";
        P2_dice5.style.filter = "brightness(30%)";
        P2_dice6.style.filter = "brightness(30%)";
        Finish_Battle.style.display ="flex";
    })
    P2_dice5.addEventListener('click',()=>{
        Dice2 =5;
        updateTotales();
        P2_dice1.style.filter = "brightness(30%)";
        P2_dice2.style.filter = "brightness(30%)";
        P2_dice3.style.filter = "brightness(30%)";
        P2_dice4.style.filter = "brightness(30%)";
        P2_dice5.style.filter = "brightness(100%)";
        P2_dice6.style.filter = "brightness(30%)";
        Finish_Battle.style.display ="flex";
    })
    P2_dice6.addEventListener('click',()=>{
        Dice2 =6;
        updateTotales();
        P2_dice1.style.filter = "brightness(30%)";
        P2_dice2.style.filter = "brightness(30%)";
        P2_dice3.style.filter = "brightness(30%)";
        P2_dice4.style.filter = "brightness(30%)";
        P2_dice5.style.filter = "brightness(30%)";
        P2_dice6.style.filter = "brightness(100%)";
        Finish_Battle.style.display ="flex";
    })

    let Winner;


    Finish_Battle.addEventListener('click',()=>{
        let List_Trainers = document.getElementById("List_Trainers");
        let BattleMainWindow = document.getElementById("MainBattle");
        let Battle_arena = document.getElementById("Battle_arena");
     
        if(Total1 > Total2){
            Winner = Pokemon1;
            console.log("Winner: " +Winner.nombre  );  
                BattleMainWindow.style.display="none";
                Battle_arena.style.display="none";
                List_Trainers.style.display="none";
           
            return Winner;
        }
        else if (Total2 > Total1) {
            Winner = Pokemon2;
            console.log("Winner: " +Winner.nombre  );  
                BattleMainWindow.style.display="none";
                Battle_arena.style.display="none";
                List_Trainers.style.display="none";

            return Winner;
       }
       else if (Total2 == Total1){
        console.log("Battle star AGAIN")    
        Winner = battle_pokemon(Pokemon1, Pokemon2,round+1);

       }

    });

   
    console.log ("Winner:" + Winner);


}

function checkBonusType(Attack_type,PkmRival_type){
    if (Attack_type === "NORMAL" && (PkmRival_type === "STEAL" || PkmRival_type === "GHOST" || PkmRival_type === "ROCK")) 
        return -2;
    if (Attack_type === "GRASS"){
        if (PkmRival_type == "GROUND" || PkmRival_type == "WATER" || PkmRival_type == "ROCK")
            return 2;
        if(PkmRival_type == "POISON" || PkmRival_type == "BUG" || PkmRival_type == "GRASS" || PkmRival_type == "FIRE" || PkmRival_type == "DRAGON" || PkmRival_type == "FLY" || PkmRival_type == "STEAL")
            return -2;}
    if (Attack_type == "FIRE"){
        if (PkmRival_type == "ICE" || PkmRival_type == "GRASS" || PkmRival_type == "BUG" || PkmRival_type == "STEAL")
            return 2;
        if (PkmRival_type == "ROCK" || PkmRival_type == "FIRE" || PkmRival_type == "WATER" || PkmRival_type == "DRAGON")
            return -2;}
    if (Attack_type == "WATER"){
        if (PkmRival_type == "GROUND" ||  PkmRival_type == "ROCK" ||  PkmRival_type == "FIRE")
            return 2;
        if (PkmRival_type == "WATER"  || PkmRival_type == "GRASS"  || PkmRival_type == "DRAGON")
            return -2;}
    if (Attack_type == "FIGHTING"){
        if (PkmRival_type == "NORMAL"  || PkmRival_type == "ROCK"  || PkmRival_type == "ICE"  || PkmRival_type == "DARK"  || PkmRival_type == "STEAL")
            return 2;
        if (PkmRival_type == "FLYING"  || PkmRival_type == "POISON"  || PkmRival_type == "BUG"  || PkmRival_type == "PSYCHIC"  || PkmRival_type == "GHOST"  || PkmRival_type == "FAIRY")
            return -2;}
    if (Attack_type == "FLYING"){
        if (PkmRival_type == "FIGHTING" || PkmRival_type == "BUG" || PkmRival_type == "GRASS")
            return 2;
        if (PkmRival_type == "ELECTRIC" || PkmRival_type == "ROCK" || PkmRival_type == "STEAL")
            return -2;}
    if (Attack_type == "POISON"){
        if (PkmRival_type == "GRASS" || PkmRival_type == "FAIRY")
            return 2;
        if (PkmRival_type == "POISON" || PkmRival_type == "GROUND" || PkmRival_type == "ROCK" || PkmRival_type == "GHOST" || PkmRival_type == "STEAL")
            return -2;}
    if (Attack_type == "GROUND"){
        if (PkmRival_type == "POISON" || PkmRival_type == "ROCK" || PkmRival_type == "FIRE" || PkmRival_type == "ELECTRIC" || PkmRival_type == "STEAL")
            return 2;
        if (PkmRival_type == "FLYING" || PkmRival_type == "BUG" || PkmRival_type == "GRASS")
            return -2;}
    if (Attack_type == "ROCK"){
        if (PkmRival_type == "FLYING" || PkmRival_type == "BUG" || PkmRival_type == "FIRE" || PkmRival_type == "ICE")
        return 2;
        if (PkmRival_type == "FIGHTING" || PkmRival_type == "GROUND" || PkmRival_type == "STEAL")
        return -2;}

    if (Attack_type == "BUG"){
        if (PkmRival_type == "GRASS" || PkmRival_type == "PSYCHIC" || PkmRival_type == "DARK")
            return 2;
        if (PkmRival_type == "FIGHTING" || PkmRival_type == "FLYING" || PkmRival_type == "GHOST" || PkmRival_type == "STEAL" || PkmRival_type == "POISON" || PkmRival_type == "FIRE" || PkmRival_type == "FAIRY")
            return -2;}
    if (Attack_type == "GHOST"){
        if (PkmRival_type == "GHOST" || PkmRival_type == "PSYCHIC")
            return 2;
        if (PkmRival_type == "NORMAL" || PkmRival_type == "DARK")
            return -2;}

    if (Attack_type == "ELECTRIC"){
        if (PkmRival_type == "FLYING" || PkmRival_type == "WATER")
            return 2;
        if (PkmRival_type == "GROUND" || PkmRival_type == "GRASS" || PkmRival_type == "ELECTRIC" || PkmRival_type == "DRAGON")
            return -2;}

    if (Attack_type == "PSYCHIC"){
        if (PkmRival_type == "FIGHTING" || PkmRival_type == "POISON")
            return 2;
        if (PkmRival_type == "PSYCHIC" || PkmRival_type == "STEAL" || PkmRival_type == "DARK")
            return -2;}

    if (Attack_type == "ICE"){
        if (PkmRival_type == "FLYING" || PkmRival_type == "GROUND" || PkmRival_type == "GRASS" || PkmRival_type == "DRAGON")
            return 2;
        if (PkmRival_type == "FIRE" || PkmRival_type == "WATER" || PkmRival_type == "ICE" || PkmRival_type == "STEAL")
            return -2;}

    if (Attack_type == "DRAGON"){
        if (PkmRival_type == "DRAGON")
            return 2;
        if (PkmRival_type == "STEAL" || PkmRival_type == "FAIRY")
            return -2;}

    if (Attack_type == "DARK"){
        if (PkmRival_type == "GHOST" || PkmRival_type == "PSYCHIC")
            return 2;
        if (PkmRival_type == "FIGHTING" || PkmRival_type == "DARK" || PkmRival_type == "FAIRY")
            return -2;}

    if (Attack_type == "STEAL"){
        if (PkmRival_type == "ROCK" || PkmRival_type == "ICE" || PkmRival_type == "FAIRY")
            return 2;
        if (PkmRival_type == "FIRE" || PkmRival_type == "WATER" || PkmRival_type == "ELECTRIC" || PkmRival_type == "STEAL")
            return -2;}

    if (Attack_type == "FAIRY"){
        if (PkmRival_type == "FIGHTING" || PkmRival_type == "DRAGON" || PkmRival_type == "DARK")
            return 2;
        if (PkmRival_type == "FIRE" || PkmRival_type == "POSION" || PkmRival_type == "STEAL")
            return -2;}
    else{
        return 0;
    }

}

document.addEventListener("DOMContentLoaded", function(event) {
    //código a ejecutar cuando existe la certeza de que el DOM está listo para recibir acciones
        // const audio = new Audio('./music/intro.mp3');
        // const audio2 = new Audio('./music/map.mp3');
        document.addEventListener('click',()=>{
           
            
            // audio.currentTime = 1;
            // audio.play();
            buttonStartMenu.addEventListener('click',()=>{
                startMenu.style.display="none";
                
                // audio.pause();
                // audio2.play();
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
        // audio2.pause();
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
        stopTimer();
        Game.jugadores[Game.turnoActual].sumarMonedas(-1);
        Game.turnoActual-=1;
        startTimer(Game);
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
    const closeAddPoke = document.getElementById("closeAddPokemon");
    const menuAddPokemon = document.getElementById("mainAddPokemon");
    closeAddPoke.addEventListener('click', ()=>{
        menuAddPokemon.style.display="none";
        grayed_GB.style.display ="none";
    });

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


    const BattleButton = document.getElementById("PokeBattle");
    const BattleMainWindow = document.getElementById("MainBattle");
    const Battle_arena = document.getElementById("Battle_arena");
    const Menu_battle = document.getElementById("MenuBattle");
    

    BattleButton.addEventListener('click', ()=>{
        BattleMainWindow.style.display="flex";
        Menu_battle.style.display="flex";
    })
    const closeBattleButton = document.getElementById("closeBattle");

    closeBattleButton.addEventListener('click', ()=>{
        BattleMainWindow.style.display="none";
        Battle_arena.style.display="none";
        const List_Trainers = document.getElementById("List_Trainers");
        List_Trainers.style.display="none";
    })

    const evolve1 = document.getElementById("evolution1");
    evolve1.addEventListener('click',()=>{
        evolvePokemon(Game,0);
    })

    const evolve2 = document.getElementById("evolution2");
    evolve2.addEventListener('click',()=>{
        evolvePokemon(Game,1);
    })


    const evolve3 = document.getElementById("evolution3");
    evolve3.addEventListener('click',()=>{
        evolvePokemon(Game,2);
    })


    const evolve4 = document.getElementById("evolution4");
    evolve4.addEventListener('click',()=>{
        evolvePokemon(Game,3);
    })

    const evolve5 = document.getElementById("evolution5");
    evolve5.addEventListener('click',()=>{
        evolvePokemon(Game,4);
    })

    const evolve6 = document.getElementById("evolution6");
    evolve6.addEventListener('click',()=>{
        evolvePokemon(Game,5);
    })






    const battleTrainer_button = document.getElementById("Trainer_battle");
    
   
    battleTrainer_button.addEventListener('click', ()=>{
        const MenuBatle = document.getElementById("MenuBattle");
        MenuBatle.style.display="none";
        const ListTrainers = document.getElementById("List_Trainers");
        const divPlayer1 = document.getElementById("list_trainer_P1");
        const divPlayer2 = document.getElementById("list_trainer_P2");
        const divPlayer3= document.getElementById("list_trainer_P3");
        const divPlayer4= document.getElementById("list_trainer_P4");
        const divPlayer5= document.getElementById("list_trainer_P5");
        const divPlayer6= document.getElementById("list_trainer_P6");
        const divPlayer7= document.getElementById("list_trainer_P7");
        const divPlayer8= document.getElementById("list_trainer_P8");
        ListTrainers.style.display="flex";

        divPlayer1.style.display="none";
        divPlayer2.style.display="none";
        divPlayer3.style.display="none";
        divPlayer4.style.display="none";
        divPlayer5.style.display="none";
        divPlayer6.style.display="none";
        divPlayer7.style.display="none";
        divPlayer8.style.display="none";



        for(var i =0 ; i< Game.jugadores.length;i++){
            if (i != Game.turnoActual){
                if (i == 0){
                    divPlayer1.style.backgroundImage= `url("./FICHAS/${Game.jugadores[0].nombre}.png")`;
                    divPlayer1.style.display="flex";
                }
                else if (i == 1){
                 
                    divPlayer2.style.backgroundImage= `url("./FICHAS/${Game.jugadores[1].nombre}.png")`;
                    divPlayer2.style.display="flex";
                }
                else if (i == 2){
             
                    divPlayer3.style.backgroundImage= `url("./FICHAS/${Game.jugadores[2].nombre}.png")`;
                    divPlayer3.style.display="flex";
                }
                else if (i == 3){
                
                    divPlayer4.style.backgroundImage= `url("./FICHAS/${Game.jugadores[3].nombre}.png")`;
                    divPlayer4.style.display="flex";
                }
                else if (i == 4){
                  
                    divPlayer5.style.backgroundImage= `url("./FICHAS/${Game.jugadores[4].nombre}.png")`;
                    divPlayer5.style.display="flex";
                }
                else if (i == 5){
                    
                    divPlayer6.style.backgroundImage= `url("./FICHAS/${Game.jugadores[5].nombre}.png")`;
                    divPlayer6.style.display="flex";
                }
                else if (i == 6){
                    divPlayer7.style.backgroundImage= `url("./FICHAS/${Game.jugadores[6].nombre}.png")`;
                    divPlayer7.style.display="flex";
                }
                else if (i == 7){
                    divPlayer8.style.backgroundImage= `url("./FICHAS/${Game.jugadores[7].nombre}.png")`;
                    divPlayer8.style.display="flex";
                }
            }
        }

        divPlayer1.addEventListener('click', ()=>{
         console.log("player selected: " + Game.jugadores[0].nombre);
         showPokemonsV2(Game,0);
        });

        divPlayer2.addEventListener('click', ()=>{
            console.log("player selected: " + Game.jugadores[1].nombre);
            showPokemonsV2(Game,1);
           });

           divPlayer3.addEventListener('click', ()=>{
            console.log("player selected: " + Game.jugadores[2].nombre);
            showPokemonsV2(Game,2);
           });
           divPlayer4.addEventListener('click', ()=>{
            console.log("player selected: " + Game.jugadores[3].nombre);
            showPokemonsV2(Game,3);
           });
           divPlayer5.addEventListener('click', ()=>{
            console.log("player selected: " + Game.jugadores[4].nombre);
            showPokemonsV2(Game,4);
           });
           divPlayer6.addEventListener('click', ()=>{
            console.log("player selected: " + Game.jugadores[5].nombre);
            showPokemonsV2(Game,5);
           });
           divPlayer7.addEventListener('click', ()=>{
            console.log("player selected: " + Game.jugadores[6].nombre);
            showPokemonsV2(Game,6);
           });

           divPlayer8.addEventListener('click', ()=>{
            console.log("player selected: " + Game.jugadores[7].nombre);
            showPokemonsV2(Game,7);
           });
          
    });

    function showPokemonsV2(Game, Rival ){
        const ListTrainers = document.getElementById("List_Trainers");
        const divPlayer1 = document.getElementById("list_trainer_P1");
        const divPlayer2 = document.getElementById("list_trainer_P2");
        const divPlayer3= document.getElementById("list_trainer_P3");
        const divPlayer4= document.getElementById("list_trainer_P4");
        const divPlayer5= document.getElementById("list_trainer_P5");
        const divPlayer6= document.getElementById("list_trainer_P6");
        const divPlayer7= document.getElementById("list_trainer_P7");
        const divPlayer8= document.getElementById("list_trainer_P8");
        ListTrainers.style.display="none";
        divPlayer1.style.display="none";
        divPlayer2.style.display="none";
        divPlayer3.style.display="none";
        divPlayer4.style.display="none";
        divPlayer5.style.display="none";
        divPlayer6.style.display="none";
        divPlayer7.style.display="none";
        divPlayer8.style.display="none";

        const List_Pokemons = document.getElementById("List_Pokemons");
        List_Pokemons.style.display="flex";

        let pkm1_image = document.getElementById("list_Pokemon_Pkm1");
        let pkm2_image = document.getElementById("list_Pokemon_Pkm2");
        let pkm3_image = document.getElementById("list_Pokemon_Pkm3");
        let pkm4_image = document.getElementById("list_Pokemon_Pkm4");
        let pkm5_image = document.getElementById("list_Pokemon_Pkm5");
        let pkm6_image = document.getElementById("list_Pokemon_Pkm6");
        pkm1_image.style.display="none";
        pkm2_image.style.display="none";
        pkm3_image.style.display="none";
        pkm4_image.style.display="none";
        pkm5_image.style.display="none";
        pkm6_image.style.display="none";
        let pokemonPlayer;
        let PokemonRival; 

        var player = Game.turnoActual;
        for (var i=0; i < Game.jugadores[player].pokemons.length; i++) {
            if ( i == 0){
                
                pkm1_image.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[player].pokemons[i].pokedex}.png")`;
                pkm1_image.style.display="flex";
            }
            else if( i == 1){
             
                pkm2_image.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[player].pokemons[i].pokedex}.png")`;
                pkm2_image.style.display="flex";
            }
            else if( i == 2){
                
                pkm3_image.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[player].pokemons[i].pokedex}.png")`;
                pkm3_image.style.display="flex";
            }
            else if( i == 3){
                pkm4_image.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[player].pokemons[i].pokedex}.png")`;
                pkm4_image.style.display="flex";
            }
            else if( i == 4){
                pkm5_image.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[player].pokemons[i].pokedex}.png")`;
                pkm5_image.style.display="flex";
            }
            else if( i == 5){
                pkm6_image.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[player].pokemons[i].pokedex}.png")`;
                pkm6_image.style.display="flex";
            }
        }


            pkm1_image.addEventListener("click", ()=>  {
                pokemonPlayer = Game.jugadores[player].pokemons[0];
                showRivalPokemon(Rival);
            });

            pkm2_image.addEventListener("click", ()=>{
                pokemonPlayer = Game.jugadores[player].pokemons[1];
                showRivalPokemon(Rival);
            });
            pkm3_image.addEventListener("click", ()=>{
                pokemonPlayer = Game.jugadores[player].pokemons[2];
                showRivalPokemon(Rival);
            });
            pkm4_image.addEventListener("click", ()=>{
                pokemonPlayer = Game.jugadores[player].pokemons[3];
                showRivalPokemon(Rival);
            });
            pkm5_image.addEventListener("click", ()=>{
                pokemonPlayer = Game.jugadores[player].pokemons[4];
                showRivalPokemon(Rival);
            });
            pkm6_image.addEventListener("click", ()=>{
                pokemonPlayer = Game.jugadores[player].pokemons[5];
                showRivalPokemon(Rival);
            });



            function showRivalPokemon(Rival){
                pkm1_image.style.display="none";
                pkm2_image.style.display="none";
                pkm3_image.style.display="none";
                pkm4_image.style.display="none";
                pkm5_image.style.display="none";
                pkm6_image.style.display="none";
                let pkm1_image_rival = document.getElementById("list_Pokemon_Pkm1_rival");
                let pkm2_image_rival = document.getElementById("list_Pokemon_Pkm2_rival");
                let pkm3_image_rival = document.getElementById("list_Pokemon_Pkm3_rival");
                let pkm4_image_rival = document.getElementById("list_Pokemon_Pkm4_rival");
                let pkm5_image_rival = document.getElementById("list_Pokemon_Pkm5_rival");
                let pkm6_image_rival = document.getElementById("list_Pokemon_Pkm6_rival");
                pkm1_image_rival.style.display="none";
                pkm2_image_rival.style.display="none";
                pkm3_image_rival.style.display="none";
                pkm4_image_rival.style.display="none";
                pkm5_image_rival.style.display="none";
                pkm6_image_rival.style.display="none";


     

                for (var i=0; i < Game.jugadores[Rival].pokemons.length; i++) {
                    if ( i == 0){
                        
                        pkm1_image_rival.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[Rival].pokemons[i].pokedex}.png")`;
                        pkm1_image_rival.style.display="flex";
                    }
                    else if( i == 1){
                     
                        pkm2_image_rival.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[Rival].pokemons[i].pokedex}.png")`;
                        pkm2_image_rival.style.display="flex";
                    }
                    else if( i == 2){
                        
                        pkm3_image_rival.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[Rival].pokemons[i].pokedex}.png")`;
                        pkm3_image_rival.style.display="flex";
                    }
                    else if( i == 3){
                        pkm4_image_rival.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[Rival].pokemons[i].pokedex}.png")`;
                        pkm4_image_rival.style.display="flex";
                    }
                    else if( i == 4){
                        pkm5_image_rival.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[Rival].pokemons[i].pokedex}.png")`;
                        pkm5_image_rival.style.display="flex";
                    }
                    else if( i == 5){
                        pkm6_image_rival.style.backgroundImage = `url("./images/POKEMON/0${Game.jugadores[Rival].pokemons[i].pokedex}.png")`;
                        pkm6_image_rival.style.display="flex";
                    }
            }

            pkm1_image_rival.addEventListener("click", ()=>{
                PokemonRival=Game.jugadores[Rival].pokemons[0];
                pkm1_image_rival.style.display="none";
                pkm2_image_rival.style.display="none";
                pkm3_image_rival.style.display="none";
                pkm4_image_rival.style.display="none";
                pkm5_image_rival.style.display="none";
                pkm6_image_rival.style.display="none";
                battle_pokemon(pokemonPlayer,PokemonRival,1);

            });
            pkm2_image_rival.addEventListener("click", ()=>{
                PokemonRival=Game.jugadores[Rival].pokemons[1];
                pkm1_image_rival.style.display="none";
                pkm2_image_rival.style.display="none";
                pkm3_image_rival.style.display="none";
                pkm4_image_rival.style.display="none";
                pkm5_image_rival.style.display="none";
                pkm6_image_rival.style.display="none";
                battle_pokemon(pokemonPlayer,PokemonRival,1);
            });
            pkm3_image_rival.addEventListener("click", ()=>{
                PokemonRival=Game.jugadores[Rival].pokemons[2];
                pkm1_image_rival.style.display="none";
                pkm2_image_rival.style.display="none";
                pkm3_image_rival.style.display="none";
                pkm4_image_rival.style.display="none";
                pkm5_image_rival.style.display="none";
                pkm6_image_rival.style.display="none";
                battle_pokemon(pokemonPlayer,PokemonRival,1);
            });
            pkm4_image_rival.addEventListener("click", ()=>{
                PokemonRival=Game.jugadores[Rival].pokemons[3];
                pkm1_image_rival.style.display="none";
                pkm2_image_rival.style.display="none";
                pkm3_image_rival.style.display="none";
                pkm4_image_rival.style.display="none";
                pkm5_image_rival.style.display="none";
                pkm6_image_rival.style.display="none";
                battle_pokemon(pokemonPlayer,PokemonRival,1);
            });
            pkm5_image_rival.addEventListener("click", ()=>{
                PokemonRival=Game.jugadores[Rival].pokemons[4];
                pkm1_image_rival.style.display="none";
                pkm2_image_rival.style.display="none";
                pkm3_image_rival.style.display="none";
                pkm4_image_rival.style.display="none";
                pkm5_image_rival.style.display="none";
                pkm6_image_rival.style.display="none";
                battle_pokemon(pokemonPlayer,PokemonRival,1);
            });
            pkm6_image_rival.addEventListener("click", ()=>{
                PokemonRival=Game.jugadores[Rival].pokemons[5];
                pkm1_image_rival.style.display="none";
                pkm2_image_rival.style.display="none";
                pkm3_image_rival.style.display="none";
                pkm4_image_rival.style.display="none";
                pkm5_image_rival.style.display="none";
                pkm6_image_rival.style.display="none";
                battle_pokemon(pokemonPlayer,PokemonRival,1);
            });

        
        }
        

    }
   
    
    // ATTATCH ITEM 
/*
    const attach1 = document.getElementById("attach1");
    const attach2 = document.getElementById("attach2");
    const attach3 = document.getElementById("attach3");
    const attach4 = document.getElementById("attach4");
    const attach5 = document.getElementById("attach5");
    const attach6 = document.getElementById("attach6");
    let AttachMenu = document.getElementById("AttachMenu");
    let addProtein = document.getElementById("addProtein");
    let AddTM = document.getElementById("AddTM");

    attach1.addEventListener("click", () => {
        AttachMenu.style.display="flex";
        addProtein.style.display="flex";
        AddTM.style.display="flex";
        selectAttach(0);
    });
    attach2.addEventListener("click", () => {
        AttachMenu.style.display="flex";
        addProtein.style.display="flex";
        AddTM.style.display="flex";
        selectAttach(1);
    });
    attach3.addEventListener("click", () => {
        AttachMenu.style.display="flex";
        addProtein.style.display="flex";
        AddTM.style.display="flex";
        selectAttach(2);
    });
    attach4.addEventListener("click", () => {
        AttachMenu.style.display="flex";
        addProtein.style.display="flex";
        AddTM.style.display="flex";
        selectAttach(3);
    });
    attach5.addEventListener("click", () => {
        AttachMenu.style.display="flex";
        addProtein.style.display="flex";
        AddTM.style.display="flex";
        selectAttach(4);
    });
    attach6.addEventListener("click", () => {
        AttachMenu.style.display="flex";
        addProtein.style.display="flex";
        AddTM.style.display="flex";
        selectAttach(5);
    });

        function selectAttach(poke){
            var type ="";
            addProtein.addEventListener("click", () => {
            AttachMenu.style.display="none";
            Game.jugadores[Game.turnoActual].pokemons[poke].attached = "PROTEIN";
            console.log(Game.jugadores[Game.turnoActual].pokemons[poke]);
            PaginaOnePlayer(Game);
        });

        AddTM.addEventListener("click", () => {
            const AddTM_menu = document.getElementById("AddTM_menu");
            addProtein.style.display="none";
            AddTM.style.display="none";
            AddTM_menu.style.display="flex";

            const TM_NORMAL = document.getElementById("TM_NORMAL");
            const TM_FIRE = document.getElementById("TM_FIRE");
            const TM_WATER = document.getElementById("TM_WATER");
            const TM_ELECTRIC = document.getElementById("TM_ELECTRIC");
            const TM_GRASS = document.getElementById("TM_GRASS");
            const TM_ICE = document.getElementById("TM_ICE");
            const TM_FIGHTING = document.getElementById("TM_FIGHTING");
            const TM_POISON = document.getElementById("TM_POISON");
            const TM_GROUND = document.getElementById("TM_GROUND");
            const TM_FLYING = document.getElementById("TM_FLYING");
            const TM_PSYCHIC = document.getElementById("TM_PSYCHIC");
            const TM_BUG = document.getElementById("TM_BUG");
            const TM_ROCK = document.getElementById("TM_ROCK");
            const TM_GHOST = document.getElementById("TM_GHOST");
            const TM_DRAGON = document.getElementById("TM_DRAGON");
            const TM_DARK = document.getElementById("TM_DARK");
            const TM_STEEL = document.getElementById("TM_STEEL");
            const TM_FAIRY = document.getElementById("TM_FAIRY");


            TM_NORMAL.addEventListener("click", ()=>{
                type= "NORMAL";
                selectAttackTM(poke,type)
            });
            TM_FIRE.addEventListener("click", ()=>{
                type= "FIRE";
                selectAttackTM(poke,type)
            });
            TM_WATER.addEventListener("click", ()=>{
                type= "WATER";
                selectAttackTM(poke,type)
            });
            TM_ELECTRIC.addEventListener("click", ()=>{
                type= "ELECTRIC";
                selectAttackTM(poke,type)
            });
            TM_GRASS.addEventListener("click", ()=>{
                type= "GRASS";
                selectAttackTM(poke,type)
            });
            TM_ICE.addEventListener("click", ()=>{
                type= "ICE";
                selectAttackTM(poke,type)
            });
            TM_FIGHTING.addEventListener("click", ()=>{
                type= "FIGHTING";
                selectAttackTM(poke,type)
            });
            TM_POISON.addEventListener("click", ()=>{
                type= "POISON";
                selectAttackTM(poke,type)
            });
            TM_GROUND.addEventListener("click", ()=>{
                type= "GROUND";
                selectAttackTM(poke,type)
            });
            TM_FLYING.addEventListener("click", ()=>{
                type= "FLYING";
                selectAttackTM(poke,type)
            });
            TM_PSYCHIC.addEventListener("click", ()=>{
                type= "PSYCHIC";
                selectAttackTM(poke,type)
            });
            TM_BUG.addEventListener("click", ()=>{
                type= "BUG";
                selectAttackTM(poke,type)
            });
            TM_ROCK.addEventListener("click", ()=>{
                type= "ROCK";
                selectAttackTM(poke,type)
            });
            TM_GHOST.addEventListener("click", ()=>{
                type= "GHOST";
                selectAttackTM(poke,type)
            });
            TM_DRAGON.addEventListener("click", ()=>{
                type= "DRAGON";
                selectAttackTM(poke,type)
            });
            TM_DARK.addEventListener("click", ()=>{
                type= "DARK";
                selectAttackTM(poke,type)
            });
            TM_STEEL.addEventListener("click", ()=>{
                type= "STEEL";
                selectAttackTM(poke,type)
            });
            TM_FAIRY.addEventListener("click", ()=>{
                type= "FAIRY";
                selectAttackTM(poke,type)
            });

           function selectAttackTM (poke,type){
            AddTM_menu.style.display="none";
            const AddStrenghtMenu = document.getElementById("AddStrenghtMenu");
            AddStrenghtMenu.style.display="flex";
            const strenght0 = document.getElementById("strenght0");
            const strenght1 = document.getElementById("strenght1");
            const strenght2 = document.getElementById("strenght2");
            const strenght3 = document.getElementById("strenght3");
            const strenght4 = document.getElementById("strenght4");
            const strenght5 = document.getElementById("strenght5");

            strenght0.addEventListener("click", ()=>{
                AddStrenghtMenu.style.display="none";
                TM = new Attack("TM",type,0,"NONE","NONE","D6");
                console.log("Poke =>"+ poke);
                Game.jugadores[Game.turnoActual].pokemons[poke].attack3 = TM ;
                console.log(Game.jugadores[Game.turnoActual].pokemons[poke]);
                AttachMenu.style.display="none";
                Game.jugadores[Game.turnoActual].pokemons[poke].attached = "TM";
                PaginaOnePlayer(Game);
            });

            strenght1.addEventListener("click", ()=>{
                AddStrenghtMenu.style.display="none";
                TM = new Attack("TM",type,1,"NONE","NONE","D6");
                console.log("Poke =>"+ poke);
                Game.jugadores[Game.turnoActual].pokemons[poke].attack3 = TM ;
                console.log(Game.jugadores[Game.turnoActual].pokemons[poke]);
                AttachMenu.style.display="none";
                Game.jugadores[Game.turnoActual].pokemons[poke].attached = "TM";
                PaginaOnePlayer(Game);
            });
            strenght2.addEventListener("click", ()=>{
                AddStrenghtMenu.style.display="none";
                TM = new Attack("TM",type,2,"NONE","NONE","D6");
                console.log("Poke =>"+ poke);
                Game.jugadores[Game.turnoActual].pokemons[poke].attack3 = TM ;
                console.log(Game.jugadores[Game.turnoActual].pokemons[poke]);
                AttachMenu.style.display="none";
                Game.jugadores[Game.turnoActual].pokemons[poke].attached = "TM";
                PaginaOnePlayer(Game);
            });
            strenght3.addEventListener("click", ()=>{
                AddStrenghtMenu.style.display="none";
                TM = new Attack("TM",type,3,"NONE","NONE","D6");
                console.log("Poke =>"+ poke);
                Game.jugadores[Game.turnoActual].pokemons[poke].attack3 = TM ;
                console.log(Game.jugadores[Game.turnoActual].pokemons[poke]);
                AttachMenu.style.display="none";
                Game.jugadores[Game.turnoActual].pokemons[poke].attached = "TM";
                PaginaOnePlayer(Game);
            });
            strenght4.addEventListener("click", ()=>{
                AddStrenghtMenu.style.display="none";
                TM = new Attack("TM",type,4,"NONE","NONE","D6");
                Game.jugadores[Game.turnoActual].pokemons[poke].attack3 = TM ;
                console.log(Game.jugadores[Game.turnoActual].pokemons[poke]);
                AttachMenu.style.display="none";
                Game.jugadores[Game.turnoActual].pokemons[poke].attached = "TM";
                PaginaOnePlayer(Game);
            });
            strenght5.addEventListener("click", ()=>{
                AddStrenghtMenu.style.display="none";
                TM = new Attack("TM",type,5,"NONE","NONE","D6");
                console.log("Poke =>"+ poke);
                Game.jugadores[Game.turnoActual].pokemons[poke].attack3 = TM ;
                console.log(Game.jugadores[Game.turnoActual].pokemons[poke]);
                AttachMenu.style.display="none";
                Game.jugadores[Game.turnoActual].pokemons[poke].attached = "TM";
                PaginaOnePlayer(Game);
            });


           }


        });

    } 
    */

// WILD Pokemon Battle
 const WildBattle_button = document.getElementById("Pokemon_battle");
 const wildBattle_inputMenu = document.getElementById("trainer_battle_menu");
 const pokedexMain_battle = document.getElementById("pokedexMain_battle");
 const MenuBattle = document.getElementById("MenuBattle");
 let WildToBattle;
 WildBattle_button.addEventListener('click', ()=>{
    wildBattle_inputMenu.style.display="flex";
    pokedexMain_battle.style.display="flex";
    MenuBattle.style.display="none";
    WildToBattle = LookForPokemon(Game);

 });


});



