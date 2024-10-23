import React from "react";

import Button from "../Button";
import Toast from "../Toast/Toast";

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

const PureOption = React.memo(Option);

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");
  const [showToast, setShowToast] = React.useState(false);

  const handleSelectVariant = React.useCallback(event => {
    setVariant(event.target.value);
  }, []);

  const handleChangeMessage = event => setMessage(event.target.value);
  const handleShow = value => setShowToast(value);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {showToast && (
        <Toast variant={variant} handleShow={() => handleShow(false)}>
          {message}
        </Toast>
      )}

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
            <PureOption key={opt} opt={opt} selectVariant={variant} handleSelect={handleSelectVariant} />
          ))}
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={() => handleShow(true)}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
