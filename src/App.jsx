import { useState, useReducer } from "react";
import { initialState, reducer } from "./hooks/twentyoneReducer";
import useKeyHandler from "./hooks/useKeyHandler";
import useGameLogic from "./hooks/useGameLogic";
import BottomPanel from "./BottomPanel";
import MainMenu from "./MainMenu";
import Instructions from "./Instructions";
import Betting from "./Betting";
import "../styles/_shared.scss"
import CardPlay from "./CardPlay";

function App() {
  const [pressedKeys, setPressedKeys] = useState([])
  const [state, dispatch] = useReducer(reducer, initialState)

  // Key press hook (key controls)
  useKeyHandler(state, dispatch, pressedKeys, setPressedKeys);

  // Game/app logic hook (functions)
  useGameLogic(state, dispatch);

  return (
    <>
      <MainMenu
        state={state}
        // pressedKeys={pressedKeys}
        dispatch={dispatch}
      />
      <Instructions 
        state={state}
        // pressedKeys={pressedKeys}
        dispatch={dispatch}
      />
      <Betting 
        state={state}
        // pressedKeys={pressedKeys}
        dispatch={dispatch}
      />
      <CardPlay
        // pressedKeys={pressedKeys}
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