import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf/ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function Option({ opt, selectVariant, handleSelect }) {
  // console.log("Option re-render");

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

export const ShelfContext = React.createContext();

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");
  const [shelf, setShelf] = React.useState([]);

  const handleSelectVariant = React.useCallback(event => {
    setVariant(event.target.value);
  }, []);

  const shelfContextValue = React.useMemo(() => {
    return { shelf, setShelf };
  }, [shelf]);

  const handleChangeMessage = event => setMessage(event.target.value);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ShelfContext.Provider value={shelfContextValue}>
        <ToastShelf></ToastShelf>
      </ShelfContext.Provider>

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
            <Button
              onClick={() =>
                setShelf(value => {
                  const id = crypto.randomUUID().substring(7);
                  const newValue = [...value, { id, variant, message }];

                  setShelf(newValue);
                  setMessage("");
                  setVariant("notice");
                })
              }>
              Pop Toast!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
