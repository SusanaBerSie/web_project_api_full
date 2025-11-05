import { createContext, useState } from "react";

export const CurrentUserContext = createContext();
/* export function currentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
  });

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
} */
