import { useState } from 'react';
import './App.css'
import { Column } from './components/generic/Column'
import { MainPage } from './components/primary-widgets/main-page/MainPage'
import { PokemonList } from './components/primary-widgets/pokemon-list/PokemonList'
import { BoxEntry, Pokemon, pokemonBox } from './assets/resources';

export type AppContext = {
  ownedPokemon: BoxEntry[],
  togglePokemon: (source: Pokemon) => void,
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
      oP[index].Perf = !oP[index].Perf;
      setOwnedPokemon([...oP]);
  }

  return (
    <>
      <Column>
        <MainPage context={{ownedPokemon, togglePokemon}}/>
        <PokemonList context={{ownedPokemon, togglePokemon}}/>
      </Column>
    </>
  )
}

export default App
