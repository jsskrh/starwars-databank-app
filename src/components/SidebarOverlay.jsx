const style = {
  overlay: `h-full w-screen fixed top-0 bg-black opacity-0 z-30`,
  overlayVisible: `opacity-50`,
};

const SidebarOverlay = ({ showSidebar, setShowSidebar }) => {
  return (
    <div
      className={`${style.overlay} ${showSidebar && style.overlayVisible}`}
      onClick={() => setShowSidebar(false)}
    ></div>
  );
};

export default SidebarOverlay;
