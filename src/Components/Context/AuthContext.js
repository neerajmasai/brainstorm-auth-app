import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const authenticateUser = (email, password) => {
        console.log(user, email, password);
        return user['email'] === email && user['password'] === password ? true : false
    }

    return (
            <AuthContext.Provider value={{user, setUser, authenticateUser}}>
                {
                    children
                }
            </AuthContext.Provider>
    );
}
