import { FC, MouseEventHandler } from "react";
import ModalContainer from "../../molecules/modal/ModalContainer";
import ModalHeader from "../../molecules/modal/ModalHeader";
import ModalBody from "../../molecules/modal/ModalBody";
import ModalFooter1Btn from "../../molecules/modal/ModalFooter1Btn";

const AboutModal: FC<{ onClickClose: MouseEventHandler<HTMLButtonElement> }> = ({ onClickClose }) => {
  return (
    <ModalContainer>
      <>
        <ModalHeader>このサイトについて</ModalHeader>
        <ModalBody>
          <div className="container">
            <h1 className="fs-6 mb-3">概要</h1>
            <p>ライツアウトパズルおよび8めくりパズルのリアルタイムソルバーです。</p>
            <h1 className="fs-6 mb-3">使い方</h1>
            <ol>
              <li>盤面の高さと幅、色数を設定します</li>
              <li>解き方（ライツアウト/8めくりパズル）を選択します</li>
              <li>開始時と終了時の盤面の状態を設定します</li>
              <li>解答が表示されます（数字が表示されているマスを数字の回数だけ押下すると解けます）</li>
            </ol>
            <h1 className="fs-6 mb-3">その他細かい仕様等について</h1>
            <ul>
              <li>このサイトで「解なし」判定された場合でも、解がないことを保証するものではありません。(開発者は責任を負いかねます)</li>
              <li>同様に、このサイトで表示される解は、「これ以外の解が存在しない」ということを保証するものでもありません。</li>
              <li>解答が複数ある場合、押下回数の少ない順に番号が振られます。回数が同じ場合は特に決まっていません。</li>
              <li>フリースペースは解答の正しさを検証するなど自由に利用してください</li>
              <li>リアルタイムモードをオフにすると、「解く」ボタンを押下するまで解答探索しない軽量化した動作になります。古いスマホ等でJavaScriptの動作が遅い場合にご利用ください。</li>
              <li>
                バグ報告は
                <a href="https://github.com/yoshida16729438/lights-out-solver/issues" rel="noopener noreferrer" target="_blank">
                  こちら
                </a>
                からお願いします
              </li>
              <li>
                その他質問等は
                <a href="https://x.com/ayoan_yoshinoya" rel="noopener noreferrer" target="_blank">
                  開発者のX
                </a>
                へお願いします
              </li>
            </ul>
          </div>
        </ModalBody>
        <ModalFooter1Btn onComplete={onClickClose} completeText="閉じる" />
      </>
    </ModalContainer>
  );
};

export default AboutModal;
