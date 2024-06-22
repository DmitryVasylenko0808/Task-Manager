import React, { PropsWithChildren } from "react";
import Button from "./Button";
import { CgClose } from "react-icons/cg";

export type ModalProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/30 flex items-center justify-center">
      <div className="p-7 bg-white shadow-xl rounded-2xl">
        <div className="flex justify-end">
          <Button
            size="default"
            className="bg-white text-tm-black-300"
            onClick={onClose}
          >
            <CgClose size={32} />
          </Button>
        </div>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
