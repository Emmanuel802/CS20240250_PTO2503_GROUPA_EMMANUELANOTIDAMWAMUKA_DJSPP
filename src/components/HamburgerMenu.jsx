import { useState } from "react";
import styles from "./HamburgerMenu.module.css";

export default function HamburgerMenu({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.menuWrapper}>
      <button
        className={styles.hamburgerBtn}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.hamburgerIcon}>
          <span className={open ? styles.open : ""}></span>
          <span className={open ? styles.open : ""}></span>
          <span className={open ? styles.open : ""}></span>
        </span>
      </button>
      {open && <div className={styles.menuContent}>{children}</div>}
    </div>
  );
}
