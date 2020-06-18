import { createContext, Dispatch, SetStateAction } from 'react';

export interface Session {
    token: string
}

export interface SessionContextType {
    session: Session | null;
    setSession: Dispatch<SetStateAction<Session | null>>;
}

const SessionContext = createContext<SessionContextType | null>(null);

export default SessionContext;
