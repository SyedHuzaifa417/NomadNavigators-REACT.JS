import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, children, onClose }) => {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      className="fixed top-0 left-0 z-10 flex justify-center items-center rounded-3xl"
      ref={dialog}
      onClose={onClose}
    >
      {open ? (
        <div className="bg-slate-600 p-4 rounded-lg shadow-lg">{children}</div>
      ) : null}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
