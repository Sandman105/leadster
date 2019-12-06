import  React, {createContext} from "react";
const GlobalContext = createContext(
    {
        user: {},
        isLoggedIn: false,
        setUser: () => {}
    }
);
export default GlobalContext;