import { PropsWithChildren } from "react";

export type DrawerProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
};

const Drawer = ({ open, onClose, children }: DrawerProps) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full min-h-screen flex justify-end bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-drawer p-8 shadow-xl bg-white"
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
