from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sqlite3



app = FastAPI()

# Configurar orígenes permitidos (ajústalo según tus necesidades)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
    
)

DATABASE = './pokimon.sqlite'

def conectar_bd():
    conn = sqlite3.connect(DATABASE)
    return conn

class Pokemon(BaseModel):
    pokedex: str
    Name: str
    Level :int
    Type: str
    Status : str
    Atk1 : str
    Atk2 :str
    NextEvo : int
    Evo:str


class Attack(BaseModel):
    IdAtk: str
    Name: str

@app.get('/pokemons')
def obtener_pokemons():
    conn = conectar_bd()
    cursor = conn.execute('SELECT * FROM pokemons')
    pokemons = cursor.fetchall()
    conn.close()
    return pokemons

@app.get('/pokemons/{pokedex}')
def obtener_pokemon(pokedex: str):
    conn = conectar_bd()
    cursor = conn.execute('SELECT * FROM pokemons WHERE Pokedex = ?', (pokedex,))
    pokemon = cursor.fetchone()
    conn.close()
    if pokemon:
        return pokemon
    else:
        return {'error': 'No se encontró el Pokémon'}, 404
    

@app.get('/attacks')
def obtener_attacks():
    conn = conectar_bd()
    cursor = conn.execute('SELECT * FROM attacks')
    attacks = cursor.fetchall()
    conn.close()
    return attacks


@app.get('/attacks/{IdAtk}')
def obtener_attack(IdAtk: str):
    conn = conectar_bd()
    cursor = conn.execute('SELECT * FROM attacks WHERE IDATK = ?', (IdAtk,))
    attack = cursor.fetchone()
    conn.close()
    if attack:
        return attack
    else:
        return {'error': 'No se encontró el attack'}, 404
