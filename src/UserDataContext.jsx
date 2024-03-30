// UserDataContext.js
import { createContext, useContext, useState } from 'react';

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [totalAmount, setAmount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const addUserData = (newData) => {
    setUserData(newData);
    setIsLoggedIn(true)
  };

  const depositAmount = (money) => {
    setAmount(money)
  }

  const withdrawAmount = (money) => {
    setAmount(money)
  }

  return (
    <UserDataContext.Provider value={{ userData, addUserData, totalAmount, depositAmount, withdrawAmount, isLoggedIn, setIsLoggedIn, setAmount }}>
      {children}
    </UserDataContext.Provider>
  );
};
