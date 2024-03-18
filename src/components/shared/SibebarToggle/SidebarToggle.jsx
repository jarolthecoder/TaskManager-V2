import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { IconButton, MatIcon } from "@/components/ui";


export const SidebarToggle = () => {
  const { handleSidebar } = useContext(AppContext);

  return (
    <IconButton size="small" onClick={handleSidebar}>
      <MatIcon iconName="menu" />
    </IconButton>
  );
};
