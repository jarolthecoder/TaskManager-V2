"use client";
import { LanguageMenu, RenderWhen, ThemeToggle } from "@/components/shared";
import { UserMenu } from "../UserMenu/UserMenu";
import { NotificationsMenu } from "../NotificationsMenu/NotificationsMenu";
import styles from "./UserBar.module.css";
import { useWindowSize } from "@/hooks";
import { IconButton, MatIcon } from "@/components/ui";

export const UserBar = () => {
  const { winWidth } = useWindowSize();
  return (
    <div className={styles.main}>
      <RenderWhen condition={winWidth > 745}>
        <LanguageMenu />
      </RenderWhen>
      <RenderWhen condition={winWidth < 600}>
        <IconButton size="small">
          <MatIcon iconName="search" />
        </IconButton>
      </RenderWhen>
      <ThemeToggle />
      <RenderWhen condition={winWidth > 745}>
        <NotificationsMenu />
      </RenderWhen>
      <UserMenu />
    </div>
  );
};
