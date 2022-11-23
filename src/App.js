import React, { useState } from "react";

import Fruits from "./DragBox/Fruits";
import Bamboo from "./DragBox/Bamboo";
import Rabbit from "./DropBox/Rabbit";
import Doge from "./DropBox/Doge";
import Cat from "./DropBox/Cat";
import Panda from "./DropBox/Panda";

import rabbitimg from "./assets/rabbit.png";
import dogimg from "./assets/doge.png";
import catimg from "./assets/cat.png";
import pandaimg from "./assets/panda.png";

import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "./App.css";

export default function App() {
  const [fruits, setFruits] = useState([
    "🍎",
    "🍉",
    "🍊",
    "🍌",
    "🍍",
    "🥝",
    "🥑",
    "🍈",
    "🍇",
    "🍓"
  ]);
  const [bamboo, setBamboo] = useState(["🍢", "🍡", "🍭"]);
  const [doge, setDoge] = useState([]);
  const [cat, setCat] = useState([]);
  const [panda, setPanda] = useState([]);
  const [rabbit, setRabbit] = useState("");

  const onRabbitDropped = (newValue, oldValue) => {
    let newFields;
    newFields = fruits.filter(e => e !== newValue);
    if (oldValue) {
      newFields.unshift(oldValue);
    }
    setRabbit(newValue);
    setFruits(newFields);
  };

  const onDogeDropped = value => {
    const newY1 = [...doge];
    newY1.push(value);
    setDoge(newY1);
    setFruits(fruits.filter(e => e !== value));
  };

  const onCatDropped = value => {
    const newY2 = [...cat];
    newY2.push(value);
    setCat(newY2);
    setFruits(fruits.filter(e => e !== value));
  };

  const cancelField = (value, axis) => {
    const newValue = [fruits];
    newValue.unshift(value);
    setFruits(newValue);
    setDoge(doge.filter(e => e !== value));
  };

  const onPandaDropped = value => {
    const newPanda = [...panda];
    newPanda.push(value);
    setPanda(newPanda);
    setBamboo(bamboo.filter(e => e !== value));
  };

  const onPandaCancel = value => {
    const newBamboo = [...bamboo];
    newBamboo.unshift(value);
    setBamboo(newBamboo);
    setPanda(panda.filter(e => e !== value));
  };

  const onRabbitCancel = value => {
    const newFruits = [...fruits];
    newFruits.unshift(value);
    setFruits(fruits.filter(e => e !== value));
    setRabbit("");
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div id="content">
        <a href="https://github.com/kangkai124/react-dnd-demo">
          <img
            style={{ position: "absolute", top: 0, right: 0, border: 0 }}
            src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
          />
        </a>
        <div id="main">
          <div className="left">
            <div className="vertical-box">
              <div>fruits</div>
            </div>
            <div className="variables vertical-box">
              {fruits.map(ele => (
                <Fruits key={ele} name={ele} type="field" />
              ))}
            </div>
            <div className="vertical-box">
              <div>bamboo</div>
            </div>
            <div className="wind vertical-box">
              {bamboo.map(ele => (
                <Bamboo key={ele} name={ele} type="bamboo" />
              ))}
            </div>
          </div>
          <div className="right">
            <div className="x-axis">
              <img src={rabbitimg} height="20" alt="rabbit" />
              <div className="rabbit-wrap">
                <Rabbit
                  content={rabbit}
                  onDrop={onRabbitDropped}
                  onCancel={onRabbitCancel}
                />
              </div>
            </div>
            <div className="dog-logo">
              <img src={dogimg} height="20" alt="dog" />
            </div>
            <Doge
              content={doge}
              onDrop={onDogeDropped}
              onCancel={cancelField}
            />
            <div className="cat-logo">
              <img src={catimg} height="20" alt="cat" />
            </div>
            <Cat content={cat} onDrop={onCatDropped} onCancel={cancelField} />
            <div className="cat-logo">
              <img src={pandaimg} height="20" alt="panda" />
            </div>
            <Panda
              content={panda}
              onDrop={onPandaDropped}
              onCancel={onPandaCancel}
            />
          </div>
          <div className="aside">
            <div>
              rabbit eats：
              <div>{rabbit}</div>
            </div>
            <div>
              doge eats：
              {doge.map(e => (
                <div key={e}>{e}</div>
              ))}
            </div>
            <div>
              cat eats：
              {cat.map(e => (
                <div key={e}>{e}</div>
              ))}
            </div>
            <div>
              panda eats：
              {panda.map(e => (
                <div key={e}>{e}</div>
              ))}
            </div>
          </div>
        </div>
        <div id="words">
          <b>说明：</b>
          <p>
            水果中的元素只能拖到&nbsp;
            <img src={rabbitimg} width="20" alt="rabbit" />
            &nbsp;
            <img src={dogimg} width="20" alt="dog" />
            &nbsp;
            <img src={catimg} width="20" alt="cat" />
            &nbsp; 中
          </p>
          <p>
            竹子中的元素只能拖到&nbsp;
            <img src={pandaimg} width="20" alt="panda" />
            &nbsp;中
          </p>
          <p>
            <img src={rabbit} width="20" alt="rabbit" /> 只接收一种水果
          </p>
          <p>
            <img src={dogimg} width="20" alt="dog" />
            &nbsp;
            <img src={catimg} width="20" alt="cat" />
            &nbsp;
            <img src={pandaimg} width="20" alt="panda" />
            &nbsp; 接收多种水果
          </p>
        </div>
      </div>
    </DndProvider>
  );
}
