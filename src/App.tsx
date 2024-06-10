import { useState } from "react";
import "./App.css";
import Layout from "./components/templates/Layout";
import { defaultBoardProps } from "./types/BoardProperties";
import BoardSetting from "./components/organisms/BoardSetting";
import Board from "./components/organisms/board/Board";

function App() {
  const [boardProps, setBoardProps] = useState(defaultBoardProps);
  const initialArray = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
  ];
  const [array, setArray] = useState(initialArray);

  return (
    <Layout>
      <main className="container-fluid mb-3">
        <section className="row justify-content-center m-1">
          <div className="col-auto">
            <h1>設定</h1>
            <h2>盤面設定</h2>
            <BoardSetting props={boardProps} setProps={setBoardProps} />
          </div>
        </section>

        <section className="row justify-content-center">
          <section className="col-auto">
            <h1>初期状態</h1>
            <Board values={array} setValues={setArray} showValue={true} showColor={true} isPreview={false} modulo={boardProps.colors} enableClick={true} />
          </section>
        </section>
      </main>
    </Layout>
  );
}

export default App;
