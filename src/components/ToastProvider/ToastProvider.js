import React from "react";

export const ShelfContext = React.createContext();

function ToastProvider({ children }) {
  const [shelf, setShelf] = React.useState([]);

  const addToast = React.useCallback((variant, message) => {
    setShelf(value => {
      const id = crypto.randomUUID().substring(7);
      const newValue = [...value, { id, variant, message }];

      return newValue;
    });
  }, []);

  const removeToast = React.useCallback(id => {
    setShelf(value => {
      const newValue = value.filter(toast => toast.id !== id);

      return newValue;
    });
  }, []);

  return <ShelfContext.Provider value={{ shelf, addToast, removeToast }}>{children}</ShelfContext.Provider>;
}

export default ToastProvider;
