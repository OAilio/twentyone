import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import useGameLogic from "./hooks/useGameLogic";
import PrimaryButton from "./PrimaryButton";
import ChipButton from "./ChipButton";
import "../styles/mainMenu.scss"

function MainMenu({ gameState, setGameState, soundState, setSoundState, pressedKeys }){
  const { startGame, openInstructions, toggleSound } = useGameLogic(setGameState, soundState, setSoundState);

  if (gameState !== "menu"){
    return null
  }

  return (
    <>
      <div className="menu-container">
        <div className="logo">
          <span><FontAwesomeIcon icon={faQuestion} className="icon"/></span>
          <h1>Logo</h1>
        </div>
        <PrimaryButton 
          action={startGame}
          pressedKeys={pressedKeys}
          buttonKey={"5"}
          content={"Play"}
        />
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
        </div>  
      </div>
    </>
  )
}

MainMenu.propTypes = {
  gameState: PropTypes.string.isRequired,
  setGameState: PropTypes.func.isRequired,
  soundState: PropTypes.bool.isRequired,
  setSoundState: PropTypes.func.isRequired,
  pressedKeys: PropTypes.array.isRequired
}

export default MainMenu