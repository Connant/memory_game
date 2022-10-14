import { useEffect, useState } from "react";
import { main, images } from "./date";

export default function MemoryGame() {
  const [imagesArray, setImagesArray] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [chosenIds, setChosenIds] = useState([]);
  const [points, setPoints] = useState(0);

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
        }, 700);
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

  const startOver = () => {
    setChosenIds([]);
    setChosen([]);
    setPoints(0);
    setOpenCards([]);
  };

  useEffect(() => {
    createCardBoard();
  }, []);

  return (
    <section className="content">
      <h1 className="content__title">Memory Game</h1>
      <h3 className="content__count">Find all animals!</h3>
      <h4 className="content__count">Points: {points}</h4>

      <button className="content__button" onClick={startOver}>
        Start over
      </button>
      <div className="content__cards row no-gutters">
        {imagesArray?.map((image, index) => {
          return (
            <div
              className="col-4 col-lg-2"
              key={index}
              onClick={() => flipImage(image, index)}
            >
              <img
                src={isCardChosen(image, index) ? image : main}
                alt=""
                className='content__cards--img'
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
