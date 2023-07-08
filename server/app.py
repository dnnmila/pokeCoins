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
