import { useEffect, useState } from "react";
import { main, images } from "./date";

export default function MemoryGame() {
  const [imagesArray, setImagesArray] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [chosenIds, setChosenIds] = useState([]);
  const [points, setPoints] = useState(0);

  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);

  const hours = 0;
  const minutes = 1;
  const seconds = 0;
  const [[h, m, s], setTime] = useState([hours, minutes, seconds]);

  const [openCards, setOpenCards] = useState([]);

  const createCardBoard = () => {
    const imagesGenerated = images?.concat(...images);
    const shuffledArray = shuffleArray(imagesGenerated);
    setImagesArray(shuffledArray);
  };

  const flipImage = (image, index) => {
    if (chosenIds?.length === 1 && chosenIds[0] === index) {
      return;
    }

    if (chosen?.length < 2) {
      setChosen((chosen) => chosen?.concat(image));
      setChosenIds((chosenIds) => chosenIds?.concat(index));

      if (chosen?.length === 1) {
        if (chosen[0] === image) {
          setPoints((points) => points + 2);
          setOpenCards((openCards) => openCards?.concat([chosen[0], image]));
        }
        setTimeout(() => {
          setChosenIds([]);
          setChosen([]);
        }, 1000);
      }
    }
  };

  const isCardChosen = (image, index) => {
    return chosenIds?.includes(index) || openCards?.includes(image);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const tick = () => {
    if (paused || over) return;

    if (h === 0 && m === 0 && s === 0) {
      setOver(true);
    } else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s == 0) {
      setTime([h, m - 1, 59]);
    } else {
      setTime([h, m, s - 1]);
    }
  };

  const el = () => {
    if (over === true) {
      return "Game over!";
    }
    if (points === 20) {
      return "You win!";
    }
  };

  const startOver = () => {
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
    setPaused(false);
    setOver(false);
    setChosenIds([]);
    setChosen([]);
    setPoints(0);
    setOpenCards([]);
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  useEffect(() => {
    createCardBoard();
  }, []);

  // console.log(openCards) - победа тут

  return (
    <section className="content">
      <div className="header">
        <h1 className="content__title">Memory Game</h1>
        {/* <h3 className="content__count">Find all animals!</h3> */}
        {/* <h4 className="content__count">Points: {points}</h4>
        <div>Countdown: {counter}</div> */}
        <p>
          {(over === true || points === 20)
            ? el()
            : `${m.toString().padStart(2, "0")}:${s
                .toString()
                .padStart(2, "0")}`}
        </p>
        {/* <button onClick={() => reset()}>Restart</button> */}

        <button className="content__button" onClick={startOver}>
          Start over
        </button>
      </div>

      <div className="content__cards row no-gutters">
        {imagesArray?.map((image, index) => {
          return (
            <div
              className="col-4 col-lg-2"
              key={index}
              onClick={() =>
                m === 0 && s === 0 ? "" : flipImage(image, index)
              }
            >
              <img
                src={isCardChosen(image, index) ? image : main}
                alt=""
                className="content__cards--img"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
