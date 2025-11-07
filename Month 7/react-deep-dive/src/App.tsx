import './App.css'
import Greeting from './components/Greeting'
import Counter from './components/Counter'

function App() {
  // console.log(App())

  return (
    <>
      <Greeting name="Sara" />
      <Counter />
      <Greeting name="Cahal" />
      <Greeting name="Edite" />
    </>
  )
}

export default App
