import { useState } from 'react';
import './App.css'
import { Column } from './components/generic/Column'
import { MainPage } from './components/primary-widgets/main-page/MainPage'
import { PokemonList } from './components/primary-widgets/pokemon-list/PokemonList'
import { BoxEntry, IngredientLevel, Pokemon, pokemonBox } from './assets/resources';

export type AppContext = {
  ownedPokemon: BoxEntry[],
  togglePokemon: (source: Pokemon) => void,
  selectPokemonIngredients: (source: Pokemon, lvl: IngredientLevel) => void,
}

function App() {

  const [ownedPokemon, setOwnedPokemon] = useState<BoxEntry[]>(pokemonBox);

  const togglePokemon = (source: Pokemon) => {
      const index = ownedPokemon.findIndex(oP => oP.id == source.id);
      if (index == -1) {
        throw new Error("Pokemon not found!");
      }

      // Update the stored value
      var oP = ownedPokemon;
      // Only toggle this mon being considered in calculations - the user shouldn't have to reselect everything later.
      oP[index].Perf = !oP[index].Perf;
      setOwnedPokemon([...oP]);
  }

  const selectPokemonIngredients = (source: Pokemon, lvl: IngredientLevel) => {
      const index = ownedPokemon.findIndex(oP => oP.id == source.id);
      if (index == -1) {
        throw new Error("Pokemon not found!");
      }

      // Update the stored value
      var oP = ownedPokemon;

      // Make sure this selection is now considered too - saves an extra click for the user.
      oP[index].Perf = true;
      oP[index].ingredientLevel = lvl;
      setOwnedPokemon([...oP]);
  }

  return (
    <>
      <Column>
        <MainPage context={{ownedPokemon, togglePokemon, selectPokemonIngredients}}/>
        <PokemonList context={{ownedPokemon, togglePokemon, selectPokemonIngredients}}/>
      </Column>
    </>
  )
}

export default App
