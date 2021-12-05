import firebase from "../firebase/client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { sanityClient } from "../sanity/sanity";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [authUser, setAuthuser] = useState(null);

  useEffect(async () => {
    if (user) {
      const query = `*[_type=="person" && email=="${user.email}"][0]{
                email,
                id,
                name,
                phone,
                "imageURL":userImage
              }`;
      let res;
      try {
        res = await sanityClient.fetch(query);
      } catch (err) {
        console.error(err);
      }
      setAuthuser(res);
    } else setAuthuser(null);
  }, [user]);

  let sharedState = authUser;

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
