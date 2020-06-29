import React, { useEffect, useState, Fragment } from "react";
import searchObject from "../../../util/searchObject";
import { motion } from "framer-motion";
import { Dimmer, Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function shouldRender(prevProps, nextProps) {
  return prevProps.symptom === nextProps.symptom;
}

/**
 * Main Component that renders each symptom on the screen with the help of framer package that gives the canvas-like ability for components to move
 * @param {Information about current symptom in question and how it should be rendered} props
 */
function SymptomAnimation(props) {
  let movementX = getRandomNumberBetween(0, props.dimensions.width - 400);
  const movementY = getRandomNumberBetween(0, 300);
  const { symptomImages } = useSelector((state) => state.game);
  const [symptomImage, setSymptomImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let symptomData = searchObject(props.symptom, symptomImages);
    if (symptomData && symptomData.hasOwnProperty("image")) {
      setSymptomImage(symptomData.image);
    }
    setLoading(false);
  }, [symptomImages, props.symptom, symptomImage]);

  return (
    <Fragment>
      {!loading ? (
        <motion.button
          onMouseEnter={(event) =>
            props.onHover(event.target.childNodes[0].textContent)
          }
          drag
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#fa4659",
            borderRadius: "50%",
            outline: "none",
            border: "1px solid #9a1f40",
          }}
          whileHover={{ scale: 1.5 }}
          animate={{
            x: [
              movementX,
              movementX + getRandomNumberBetween(0, 50),
              movementX + getRandomNumberBetween(0, 50),
              movementX + getRandomNumberBetween(0, 50),
              movementX,
            ],
            y: [
              movementY,
              movementY + getRandomNumberBetween(0, 50),
              movementY + getRandomNumberBetween(0, 50),
              movementY + getRandomNumberBetween(0, 50),
              movementY,
            ],
          }}
          transition={{
            duration: 30,
            type: "spring",
            damping: 15,
            ease: "easeInOut",
            mass: 10,
            loop: Infinity,
            repeatDelay: 0,
          }}
          dragConstraints={{
            top: 50,
            left: 0,
            right: props.dimensions.width - 400,
            bottom: 350,
          }}
        >
          <span
            style={{ position: "absolute", transform: "translate(-50%,150%)" }}
          >
            {props.symptom}
          </span>
          {symptomImage && (
            <img
              style={{
                position: "absolute",
                transform: "translate(-50%,-50%)",
                width: "50px",
                borderRadius: "50%",
                border: "1px solid #fa4659",
                pointerEvents: "none",
              }}
              src={symptomImage}
              alt={props.symptom}
            />
          )}
        </motion.button>
      ) : (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      )}
    </Fragment>
  );
}

export default React.memo(SymptomAnimation, shouldRender);
