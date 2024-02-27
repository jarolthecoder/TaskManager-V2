import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { IconButton, MatIcon } from "..";

export const SidebarToggle = () => {
  const { sidebarOpen, handleSidebar } = useContext(AppContext);

  return (
    <IconButton size="small" onClick={handleSidebar}>
      <MatIcon iconName="menu" />
    </IconButton>
  );
};
