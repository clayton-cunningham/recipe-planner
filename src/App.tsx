import './App.css'
import { Column } from './components/generic/Column'
import { MainPage } from './components/primary-widgets/main-page/MainPage'
import { PokemonList } from './components/primary-widgets/pokemon-list/PokemonList'

function App() {

  return (
    <>
      <Column>
        <MainPage />
        <PokemonList />
      </Column>
    </>
  )
}

export default App
