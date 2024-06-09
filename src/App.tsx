import { useState } from "react";
import "./App.css";
import Layout from "./components/templates/Layout";
import { defaultBoardProps } from "./types/BoardProperties";
import BoardSetting from "./components/organisms/BoardSetting";

function App() {
  const [boardProps, setBoardProps] = useState(defaultBoardProps);
  return (
    <Layout>
      <main className="container-fluid mb-3">
        <section className="row justify-content-center m-1">
          <div className="col-auto">
            <BoardSetting props={boardProps} setProps={setBoardProps} />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default App;
