
class Battle {
    constructor(PokemonAtk,PokemonDef,Trainer1,Trainer2){
        this.PokemonAtk = PokemonAtk;
        this.PokemonDef = PokemonDef;
        this.Trainer1 = Trainer1;
        this.Trainer2 = Trainer2;
        this.round =0;
        this.Total1=0;
        this.Total2=0;
        this.phase =0;
        this.item1= false;
        this.item2=false;
        this.finish =false;
    }
}

function phase0(Battle){
        
        
}

function startBattle(Battle){
    const Trainer1_name = document.getElementById("name1").textContent = Battle.Trainer1;
    const Trainer2_name = document.getElementById("name2").textContent = Battle.Trainer2;
    console.log("Pokemon ATK :")
    console.log(Battle.PokemonAtk);

    
    const Poke1_img = document.getElementById("imagen1").style.backgroundImage = `url("./images/POKEMON/0${Battle.PokemonAtk.pokedex}.png")`;
    const Poke1_name = document.getElementById("poke_name1").textContent = Battle.PokemonAtk.nombre;
    const Poke1_power = document.getElementById("strength1").textContent = "Level: " + Battle.PokemonAtk.nivel;
    const Poke1_type = document.getElementById("pkm1_type1").textContent = "Type: " + Battle.PokemonAtk.tipo;
    const Poke1_status = document.getElementById("status1").textContent =  "Status: " +  Battle.PokemonAtk.estatus;

    const Poke2_img = document.getElementById("imagen2").style.backgroundImage = `url("./images/POKEMON/0${Battle.PokemonDef.pokedex}.png")`;
    const Poke2_name = document.getElementById("poke_name2").textContent = Battle.PokemonDef.nombre;
    const Poke2_power = document.getElementById("strength2").textContent = "Level: " + Battle.PokemonDef.nivel;
    const Poke2_type = document.getElementById("pkm2_type1").textContent = "Type: " + Battle.PokemonDef.tipo;
    const Poke2_status = document.getElementById("status2").textContent =  "Status: " +  Battle.PokemonDef.estatus;

    Battle.Total1= Battle.PokemonAtk.nivel;
    Battle.Total2= Battle.PokemonDef.nivel;
    let total1 = document.getElementById("total1").textContent = Battle.Total1;
    let total2 = document.getElementById("total2").textContent = Battle.Total2;
    Battle.phase=1;

    const P1_yes_no = document.getElementById("yes-no_p1");
    const P2_yes_no = document.getElementById("yes-no_p2");
    const P1_attacks = document.getElementById("button_attacks_p1");
    const P2_attacks = document.getElementById("button_attacks_p2");
    const P1_dices = document.getElementById("button-dices_p1");
    const P2_dices = document.getElementById("button-dices_p2");

    const P1_yes = document.getElementById("button_yes_p1");
   const P1_no = document.getElementById("button_No_p1");   
   const P2_yes = document.getElementById("button_yes_p2");
   const P2_no = document.getElementById("button_No_p2"); 

    



    let title = document.getElementById("titles");
      

        

        for (var fase = 1; fase <15; fase++) {
        if (this.finish) {
                break; // Si la batalla termina en cualquier fase, salimos del ciclo
        }
        switch(fase){
        case 1:
                console.log("Phase 1");
                title.textContent =  Battle.Trainer1 + "  add Battle card? "; 
                P1_yes_no.style.display = "flex";
                P1_yes.addEventListener('click', ()=>{
                        Battle.phase =2;
                        P1_yes_no.style.display = "none";});
                P1_no.addEventListener('click', ()=>{
                        Battle.phase =2;
                        P1_yes_no.style.display = "none";});
                break;
        case 2:
                console.log("Phase 2");
                title.textContent =  Battle.Trainer2 + "  add Battle card? "; 
                P2_yes_no.style.display = "flex";
                P2_yes.addEventListener('click', ()=>{
                        Battle.phase =3;
                        P2_yes_no.style.display = "none";});
                P2_no.addEventListener('click', ()=>{
                        Battle.phase=3;
                        P2_yes_no.style.display = "none";});
                break;
        
        case 3:
                title.textContent =  Battle.Trainer1 + "  Select Attack  "; 
                break;
        case 4:
                title.textContent =  Battle.Trainer2 + "  Select Attack  "; 
                break;
        case 5:
                title.textContent =  Battle.Trainer1 + "  Effect  "; 
                break;
        case 6:
                title.textContent =  Battle.Trainer2 + "  affected?  "; 
                break;
        case 7:
                title.textContent =  Battle.Trainer2 + "  Effect  "; 
                break;
        case 8:
                title.textContent =  Battle.Trainer1 + "  affected?  "; 
                break;
        case 9:
                title.textContent =  "Total Parcial"; 
                break;
        case 10:
                title.textContent =  Battle.Trainer1 + " Throw dices"; 
                break;
        case 11:
                title.textContent =  Battle.Trainer2 + " Throw dices"; 
                break;
        case 12:
                title.textContent =  Battle.Trainer1 + " Activate card?"; 
                break;
        case 13:
                title.textContent =  Battle.Trainer2 + " Activate card?"; 
                break;
        case 14:
                title.textContent =  "Total Final "; 
                break;
                
        


    }

}
}




document.addEventListener("DOMContentLoaded", function(event) {

    window.addEventListener("storage", ()=>{
        var Trainer1 = localStorage.getItem('trainner1');
        var Trainer2 = localStorage.getItem('trainner2');
        var Ready1 = false;
        var Ready2 = false;
        let PokemonATK;
        let PokemonDEF;

        console.log(Trainer1);
        console.log(Trainer2);

        const pokemon1Json = localStorage.getItem('pokemon1');
        if (pokemon1Json) {
        PokemonATK = JSON.parse(pokemon1Json); // Convertir la cadena JSON a objeto JavaScript
        // Ahora puedes usar el objeto "pokemon" en tu código
        console.log(PokemonATK);
        Ready1=true
        }

        const pokemon2Json = localStorage.getItem('pokemon2');
        if (pokemon2Json) {
        PokemonDEF = JSON.parse(pokemon2Json); // Convertir la cadena JSON a objeto JavaScript
        // Ahora puedes usar el objeto "pokemon" en tu código
        console.log(PokemonDEF);
        Ready2=true

        }

        if(Ready1 == true && Ready2==true){
            console.log("Battle Ready");
            const battle = new Battle(PokemonATK,PokemonDEF,Trainer1,Trainer2)
            startBattle(battle);
            if 
        }
        else{
            console.log("Battle not Ready");
        }

        
       
        

   })





})


