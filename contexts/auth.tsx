import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
}

interface Props {
  children:any;
}

export const AuthProvider = ({children}:Props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const {data} = supabase.auth.onAuthStateChange((event:any, session:any) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }}
    )}, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
