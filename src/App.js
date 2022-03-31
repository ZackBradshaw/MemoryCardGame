import "./App.css";
import React, { useEffect, useState } from "react";
import takoyaki from "./images/takoyaki.jpg";
import boba from "./images/boba.jpg";
import ramen from "./images/ramen.jpg";
import curry from "./images/curry.jpg";
import hotpot from "./images/hotpot.jpg";
import matcha from "./images/matcha.jpg";
import zongzi from "./images/zongzi.jpg";
import sushi from "./images/sushi.png";
import dimsum from "./images/dimsum.jpg";
import chickenRice from "./images/chicken-rice.png";
import crawfish from "./images/crawfish.png";
import steak from "./images/steak.png";
import SingleCard from "./components/SingleCard";

const cardImages = [
  {
    src: takoyaki,
    title: "Takoyaki",
    backgroundColor: "rgb(255 223 137)",
    borderStyle: "1px solid rgb(255 223 137)",
    matched: false,
  },
  {
    src: boba,
    title: "Boba",
    backgroundColor: "rgb(54 145 154)",
    borderStyle: "1px solid rgb(54 145 154)",
    matched: false,
  },
  {
    src: steak,
    title: "Steak",
    backgroundColor: "rgb(119 4 4)",
    borderStyle: "1px solid rgb(119 4 4)",
    matched: false,
  },
  {
    src: zongzi,
    title: "Zongzi",
    backgroundColor: "rgb(76 136 89)",
    borderStyle: "1px solid rgb(76 136 89)",
    matched: false,
  },
  {
    src: dimsum,
    title: "Dimsum",
    backgroundColor: "rgb(111 31 0)",
    borderStyle: "1px solid rgb(111 31 0)",
    matched: false,
  },
  {
    src: ramen,
    title: "Ramen",
    backgroundColor: "rgb(255 141 0)",
    borderStyle: "1px solid rgb(255 141 0)",
    matched: false,
  },
  {
    src: crawfish,
    title: "Crawfish",
    backgroundColor: "rgb(52 52 60)",
    borderStyle: "1px solid rgb(52 52 60)",
    matched: false,
  },
  {
    src: sushi,
    title: "Sushi",
    backgroundColor: "rgb(245 194 80)",
    borderStyle: "1px solid rgb(245 194 80)",
    matched: false,
  },
  {
    src: chickenRice,
    title: "Chicken Rice",
    backgroundColor: "rgb(136 96 6)",
    borderStyle: "1px solid rgb(136 96 6)",
    matched: false,
  },
  {
    src: matcha,
    title: "Matcha Drink",
    backgroundColor: "rgb(255 148 148)",
    borderStyle: "1px solid rgb(255 148 148)",
    matched: false,
  },
  {
    src: curry,
    title: "Curry",
    backgroundColor: "rgb(189 166 82)",
    borderStyle: "1px solid rgb(189 166 82)",
    matched: false,
  },
  {
    src: hotpot,
    title: "Hotpot",
    backgroundColor: "rgb(226 143 58)",
    borderStyle: "1px solid rgb(226 143 58)",
    matched: false,
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start new game
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Food Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
