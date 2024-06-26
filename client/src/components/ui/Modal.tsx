import React, { PropsWithChildren } from "react";
import Button from "./Button";
import { CgClose } from "react-icons/cg";
import Portal from "../Portal";

export type ModalProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <Portal targetId="modals-root">
      <div className="fixed top-0 left-0 z-50 w-full min-h-screen bg-black/30 flex items-center justify-center">
        <div className="p-7 bg-white shadow-xl rounded-2xl max-h-[960px] overflow-auto">
          <div className="mb-1 flex justify-end">
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
    </Portal>
  );
};

export default Modal;
