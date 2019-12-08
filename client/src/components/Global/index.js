import React, { Component } from "react";
import GlobalContext from "./context";

class Global extends Component {
    state = {
        user: {},
        isLoggedIn: false,
        isEmployer: null
    }

    setUser = obj => { this.setState({ user: obj, isLoggedIn: true}) }

    render() {
        return( 
            <GlobalContext.Provider 
            value={
                {
                user: this.state.user,
                setUser: this.setUser,
                isLoggedIn: this.state.isLoggedIn
            }
            }>
                {this.props.children}
            </GlobalContext.Provider>

        )
    }
}

export default Global;