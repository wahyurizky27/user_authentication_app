import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  USER: "AUTH_USER",
  USERS: "AUTH_USERS",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuthData();
  }, []);

  const loadStoredAuthData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      const storedUsers = await AsyncStorage.getItem(STORAGE_KEYS.USERS);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.log("Failed to load auth data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (item) => item.email.toLowerCase() === normalizedEmail,
    );

    if (existingUser) {
      throw new Error("Email already registered.");
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    const updatedUsers = [...users, newUser];

    await AsyncStorage.setItem(
      STORAGE_KEYS.USERS,
      JSON.stringify(updatedUsers),
    );

    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    await AsyncStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(userWithoutPassword),
    );

    setUsers(updatedUsers);
    setUser(userWithoutPassword);

    return userWithoutPassword;
  };

  const login = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password,
    );

    if (!foundUser) {
      throw new Error("Incorrect email or password.");
    }

    const userWithoutPassword = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    await AsyncStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(userWithoutPassword),
    );

    setUser(userWithoutPassword);

    return userWithoutPassword;
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      users,
      isLoading,
      login,
      signup,
      logout,
    }),
    [user, users, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
