import { PropsWithChildren } from "react";
import { CgClose } from "react-icons/cg";
import Button from "./Button";
import Portal from "../Portal";

export type DrawerProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
};

const Drawer = ({ open, onClose, children }: DrawerProps) => {
  if (!open) return null;

  return (
    <Portal targetId="drawers-root">
      <div
        onClick={onClose}
        className="fixed top-0 left-0 z-40 w-full min-h-screen flex justify-end bg-black/30"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-drawer p-8 shadow-xl bg-white"
        >
          <div className="mb-7 flex justify-end">
            <Button
              size="default"
              className="bg-white text-tm-black-300"
              onClick={onClose}
            >
              <CgClose size={32} />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Drawer;
