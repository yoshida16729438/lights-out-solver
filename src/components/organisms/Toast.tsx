import { FC, ReactNode, useEffect, useState } from "react";
import CloseBtn from "../atoms/button/CloseBtn";

const Toast: FC<{ children: ReactNode; forceClose: () => void }> = ({ children, forceClose }) => {
  const [timerId, setTimerId] = useState({} as NodeJS.Timeout);
  useEffect(() => {
    setTimerId(
      setTimeout(() => {
        forceClose();
      }, 5000)
    );
  }, []);

  const onClickClose = () => {
    clearTimeout(timerId);
    forceClose();
  };

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div className="toast bg-warning show" role="alert">
        <div className="toast-body container">
          <div className="row">
            <div className="col-auto flex-grow-1">{children}</div>
            <div className="col-auto">
              <CloseBtn onClick={onClickClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
