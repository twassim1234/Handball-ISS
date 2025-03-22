import { createContext} from 'react';
import { useState } from 'react';

const UserContext = createContext(undefined);

export default function UserContextProvider({children}) {
    const [user, setUser] = useState();
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )

}

