import React from "react";
import { ShelfContext } from "../ToastPlayground/ToastPlayground";

import Toast from "../Toast";

import styles from "./ToastShelf.module.css";

function ToastShelf() {
  // console.log("ToastShelf re-render");

  const { shelf } = React.useContext(ShelfContext);

  return (
    <ol className={styles.wrapper}>
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
