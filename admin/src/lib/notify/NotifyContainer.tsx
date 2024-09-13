import { FC } from "react";
import styled from "@emotion/styled";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const StyledNotifyContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    width: auto;
  }

  .Toastify__toast {
    padding: 8px;
    box-shadow: 0px 2px 30px rgba(114, 107, 93, 0.34);
    border-radius: 6px;
  }

  .Toastify__toast-body {
    padding: 8px 12px;
  }

  .Toastify__close-button > svg {
    width: 24px;
    height: 22px;
  }
`;

export const NotifyContainer: FC = () => (
  <StyledNotifyContainer
    draggable
    hideProgressBar
    autoClose={5000}
    position="bottom-right"
    theme="light"
  />
);
