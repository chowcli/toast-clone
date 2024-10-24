import React from "react";

import { ShelfContext } from "../ToastProvider/ToastProvider";

import Button from "../Button";
import ToastShelf from "../ToastShelf/ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function Option({ opt, pickedVariant, setVariant }) {
  console.log("Option re-render");

  const id = `variant-${opt}`;

  return (
    <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
      <label htmlFor={id}>
        <input
          id={id}
          type="radio"
          name="variant"
          value={opt}
          checked={opt === pickedVariant}
          onChange={event => setVariant(event.target.value)}
        />
        {opt}
      </label>
    </div>
  );
}

const PureOption = React.memo(Option);

function ToastPlayground() {
  const { addToast } = React.useContext(ShelfContext);
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");

  const handleSubmit = event => {
    event.preventDefault();

    addToast(variant, message);
    setMessage("");
    setVariant("notice");
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf></ToastShelf>

      <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="message" className={styles.label} style={{ alignSelf: "baseline" }}>
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          {VARIANT_OPTIONS.map(opt => (
            <PureOption key={opt} opt={opt} pickedVariant={variant} setVariant={setVariant} />
          ))}
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
