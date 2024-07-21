import React from "react";
import useIsLoggedIn from "./useIsLoggedIn";
import Registration from "./Registration";
import Login from './Login';

const AccountSetup = () => {
    const isLoggedIn = useIsLoggedIn();
    return (<>{isLoggedIn ? <Login /> : <Registration />}</>)
}

export default AccountSetup;
