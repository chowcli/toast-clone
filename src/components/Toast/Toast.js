import React from "react";
import { AlertOctagon, AlertTriangle, CheckCircle, Info, X } from "react-feather";
import { ShelfContext } from "../ToastProvider/ToastProvider";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ id, variant, children }) {
  console.log("Toast re-render");

  const { removeToast } = React.useContext(ShelfContext);

  const variantStyle = `${styles.toast} ${styles[variant]}`;
  const Icon = ICONS_BY_VARIANT[variant];

  return (
    <div className={variantStyle}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>

      <p className={styles.content}>
        <VisuallyHidden>{variant} - </VisuallyHidden>

        {children}
      </p>

      <button
        className={styles.closeButton}
        onClick={() => removeToast(id)}
        aria-label="Dismiss message"
        aria-live="off">
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
