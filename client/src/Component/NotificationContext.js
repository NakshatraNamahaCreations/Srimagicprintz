import React, {
    createContext,
    useContext,
    useReducer,
    useCallback,
    useEffect,
    useRef,
  } from "react";
  
  const GlobalNotificationContext = createContext();
  
  export const GlobalNotificationProvider = ({ children }) => {
    const [notifications, dispatch] = useReducer(notificationReducer, []);
    const audioRef = useRef(new Audio());
    const silentAudioRef = useRef(new Audio());
  
    silentAudioRef.current.src = "";
  
    const addNotification = useCallback((notification) => {
      dispatch({ type: "ADD_NOTIFICATION", payload: notification });
      playNotificationSound();
    }, []);
  
    const removeNotification = useCallback((notificationId) => {
      dispatch({ type: "REMOVE_NOTIFICATION", payload: notificationId });
    }, []);
  
    const playNotificationSound = () => {
      silentAudioRef.current.pause();
      audioRef.current.src = "../audio/notification-alert.wav";
      audioRef.current
        .play()
        .then(() => {
          // Sound played successfully
        })
        .catch((error) => {
          console.error("Audio play error:", error);
        });
    };
  
    return (
      <GlobalNotificationContext.Provider
        value={{ notifications, addNotification, removeNotification, dispatch, playNotificationSound }}
      >
        {children}
      </GlobalNotificationContext.Provider>
    );
  };

export const useGlobalNotification = () => {
  const context = useContext(GlobalNotificationContext);
  if (!context) {
    throw new Error(
      "useGlobalNotification must be used within a GlobalNotificationProvider"
    );
  }
  return context;
};

function notificationReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...state, action.payload];
    case "REMOVE_NOTIFICATION":
      return state.filter((notification) => notification.id !== action.payload);
    default:
      return state;
  }
}
