import React from "react";
import { ShelfContext } from "../ToastProvider/ToastProvider";

import Toast from "../Toast";

import styles from "./ToastShelf.module.css";

function ToastShelf() {
  console.log("ToastShelf re-render");

  const { shelf } = React.useContext(ShelfContext);

  return (
    <ol className={styles.wrapper} role="region" aria-live="polite" aria-label="Notification">
      {shelf.map(({ id, variant, message }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast id={id} variant={variant}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default React.memo(ToastShelf);
