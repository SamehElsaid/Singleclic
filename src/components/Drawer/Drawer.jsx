import { useEffect } from "react";

function Drawer({ open, onClose, children }) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);
  return (
    <div
      style={{ zIndex: 555555 }}
      className={`fixed inset-0  bg-drawer  flex justify-end  ${open ? "opacity-100 visible" : "opacity-0 invisible"
        } duration-200`}
    >
      <div className="fixed inset-0 " onClick={onClose}></div>
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.15) -2.4px -2.4px 3.2px"
        }}
        className={`drawer_custom   h-[100dvh] bg-white relative z-10 ${open
          ? "translate-x-0"
          : "translate-x-full"
          } duration-300`}
      >
        {children}
      </div>
    </div>
  );
}

export default Drawer;
