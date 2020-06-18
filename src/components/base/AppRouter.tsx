import TopBar from 'components/base/TopBar';
import TokenView from 'components/views/TokenView';
import UsersView from 'components/views/UsersView';
import SessionContext, { Session } from 'contexts/SessionContext';
import React, { FC, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from 'utils/Routes';

interface LoginProps {
    isAuthenticated: boolean;
}

const loginPath = `/${Routes.Token}`

const TokenPage = ({ isAuthenticated }: LoginProps) => (!isAuthenticated ?
    <TokenView /> :
    <Redirect to={ `/${Routes.UsersList}` } />
);

const AppRouter = () => {
    const [session, setSession] = useState<null | Session>(null)

    const autenticatedRoutes = !!session && [
        <Route
            path={ `/${Routes.UsersList}` }
            key={ `/${Routes.UsersList}` }
        >
            <UsersView />
        </Route>
    ]

    return (
        <SessionContext.Provider value={ { session, setSession } }>
            <BrowserRouter>
                <Switch>
                    <Route path={ `/${Routes.Token}` }>
                        <TokenPage isAuthenticated={ !!session } />
                    </Route>
                    <Route path="/">
                        <TopBar>
                            <Switch>
                                { autenticatedRoutes }
                                <Redirect to={ loginPath } />
                            </Switch>
                        </TopBar>
                    </Route>
                </Switch>
            </BrowserRouter>
        </SessionContext.Provider>
    );
}

export default AppRouter;
