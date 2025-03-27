import { useReducer } from "react";
import { initialState, reducer } from "./hooks/twentyoneReducer";
import useKeyHandler from "./hooks/useKeyHandler";
import useGameLogic from "./hooks/useGameLogic";
import BottomPanel from "./components/BottomPanel";
import MainMenu from "./components/MainMenu";
import Instructions from "./components/Instructions";
import Betting from "./components/Betting";
import "../styles/_shared.scss"
import CardPlay from "./components/CardPlay";
import SmallScreenWarning from "./components/SmallScreenWarning";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Key press hook (key controls)
  useKeyHandler(state, dispatch)

  // Game/app logic hook (functions)
  useGameLogic(state, dispatch)

  return (
    <>
      <SmallScreenWarning />
      <MainMenu
        state={state}
        dispatch={dispatch}
      />
      <Instructions 
        state={state}
        dispatch={dispatch}
      />
      <Betting 
        state={state}
        dispatch={dispatch}
      />
      <CardPlay
        state={state}
        dispatch={dispatch}
      />
      <BottomPanel
        state={state}
      />
    </>
  )
}

export default App;