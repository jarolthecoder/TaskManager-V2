'use client'

import { useMenu } from '@/hooks/useMenu';
import { NotificationPanel } from '../NotificationPanel/NotificationPanel';
import styles from './NotificationsMenu.module.css'
import { useRef } from 'react';

export const NotificationsMenu = () => {
   const refEl = useRef();
   const { isMenuOpen, position, handleMenu } = useMenu(refEl);
  return (
    <>
      <div className={styles.notifications} ref={refEl} onClick={handleMenu}>
        <span className="material-icons">notifications</span>
      </div>
      <NotificationPanel
        open={isMenuOpen}
        position={position}
        handleMenu={handleMenu}
      />
    </>
  );
}
