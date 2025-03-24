import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import useGameLogic from "../hooks/useGameLogic";
import PrimaryButton from "./PrimaryButton";
import ChipButton from "./ChipButton";
import "../../styles/mainMenu.scss"

function MainMenu({ state, dispatch }){
  const { startGame, openInstructions, toggleSound } = useGameLogic(state, dispatch);
  const { gameState, soundState, pressedKeys } = state;

  if (gameState !== "menu"){
    return null
  }

  return (
    <>
      <div className="menu-container">
        <div className="hero-content">
          <img src="../../logobig.webp" className="logo"></img>
          <h1>TWENTYONE</h1>
          <PrimaryButton 
            action={startGame}
            pressedKeys={pressedKeys}
            buttonKey={"5"}
            content={"Play"}
          />
        </div>
        <div className="menu-options">
          <ChipButton
            action={openInstructions}
            pressedKeys={pressedKeys}
            buttonKey={"7"}
            content={<FontAwesomeIcon icon={faQuestion}/>}
            color="blue"
          />
          <ChipButton
            action={toggleSound}
            pressedKeys={pressedKeys}
            buttonKey={"8"}
            content={soundState ? (<FontAwesomeIcon icon={faVolumeHigh}/>) : (<FontAwesomeIcon icon={faVolumeXmark}/>)}
            color="purple"
          />
          {/* <ChipButton
            action={toggleSound}
            pressedKeys={pressedKeys}
            buttonKey={"8"}
            content={soundState ? (<FontAwesomeIcon icon={faVolumeHigh}/>) : (<FontAwesomeIcon icon={faVolumeXmark}/>)}
            color="purple"
          />
          <ChipButton
            action={toggleSound}
            pressedKeys={pressedKeys}
            buttonKey={"8"}
            content={soundState ? (<FontAwesomeIcon icon={faVolumeHigh}/>) : (<FontAwesomeIcon icon={faVolumeXmark}/>)}
            color="purple"
          /> */}
        </div>  
      </div>
    </>
  )
}

MainMenu.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default MainMenu