import React, { createContext } from 'react';
import { reducer } from './collection.js';
import { ADD, REMOVE } from './actions.js';

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const [state, dispatch] = reducer();
  const { pokemons } = state;

  
  const removePokmon = (pokemon) => () => dispatch({ type: REMOVE, pokemon });
  const addPokemon = (pokemon) => dispatch({ type: ADD, pokemon });

  const providerValue = {
    pokemons,
    addPokemon,
    removePokmon
  };

  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  )
};

export { PokemonContext, PokemonProvider };