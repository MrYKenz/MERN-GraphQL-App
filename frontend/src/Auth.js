import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const jwt = localStorage.getItem('token');
// decode token to get user data when result data is lost (refreshed or redirected)
const userData = jwt ? {user: jwtDecode(jwt)} : {user: null}
// console.log(userData)`

// initalise context 
const AuthContext = createContext();

// reducer to control/manage state
function AuthReducer(state, action) {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    };
}

// set context to the following based on 
function AuthProvider(props) {
    const [state, dispatch] = useReducer(AuthReducer, userData);

    const login = (data) => {
        localStorage.setItem('token', data.token);
        dispatch({
            type: 'LOGIN',
            payload: data
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value= {{ user: state.user, login, logout}}
        {...props}
        />
    );
}
export { AuthContext, AuthProvider }
