import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function Option({ opt, selectVariant, handleSelect }) {
  const id = `variant-${opt}`;

  return (
    <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
      <label htmlFor={id}>
        <input
          id={id}
          type="radio"
          name="variant"
          value={opt}
          checked={opt === selectVariant}
          onChange={handleSelect}
        />
        {opt}
      </label>
    </div>
  );
}

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");

  const handleChangeMessage = event => setMessage(event.target.value);
  const handleSelectVariant = event => setVariant(event.target.value);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label htmlFor="message" className={styles.label} style={{ alignSelf: "baseline" }}>
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={message} onChange={handleChangeMessage} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          {VARIANT_OPTIONS.map(opt => (
            <Option key={opt} opt={opt} selectVariant={variant} handleSelect={handleSelectVariant} />
          ))}
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
