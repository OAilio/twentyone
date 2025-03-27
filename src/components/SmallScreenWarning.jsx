import "../../styles/smallScreenWarning.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

function SmallScreenWarning(){
  return (
    <div className="screen-too-short">
      <span className="bold">Oops!</span>
      <div className="icon-group">
        <FontAwesomeIcon icon={faMobileScreen} className="icon"/>
        <FontAwesomeIcon icon={faRotateLeft} className="icon small"/>
      </div>
      <span>Your screen is a bit too short for the best experience.</span>
      <span>Please rotate your device to portrait mode.</span>
    </div>
  )
}

export default SmallScreenWarning