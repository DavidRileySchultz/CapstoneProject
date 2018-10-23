import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Register } from './components/_register/RegisterPage';
import { Login } from './components/_login/LoginPage';
import { UserHome } from './components/_user/UserHome';
import { Logout } from './components/_login/Logout';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { GroupContent } from './components/_traveller/GroupContent';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tryLogout: false,
            isLoggingIn: false,
            isLoggedIn: false,
            isRegistering: false
        }
        this.tryLogout = this.tryLogout.bind(this);
        this.onCancelLogout = this.onCancelLogout.bind(this);
        this.onClickingRegister = this.onClickingRegister.bind(this);
        this.onLoggingIn = this.onLoggingIn.bind(this);
        this.onClickingOtherTabs = this.onClickingOtherTabs.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('userId')) {
            this.setState({

                isLoggedIn: true,

            })
        }
        else {
            this.setState({
                isLoggedIn: false
            })
        }
    }
    tryLogout() {
        this.setState({
            tryLogout: true

        });
    }
    onCancelLogout() {
        this.setState({ tryLogout: false });
    }
    doLogout() {
        this.setState({
            tryLogout: false,
            isLoggedIn: false,
            isRegistering: false
        });
    }

    onClickingOtherTabs() {
        this.setState({
            tryLogout: false,
            isLoggingIn: false,
            isRegistering: false
        })
    }
    onClickingLogin() {
        this.setState({
            tryLogout: false,
            isLoggingIn: true,
            isRegistering: false
        });
    }
    onLoggingIn() {
        this.setState({
            isLoggedIn: true,
            isLoggingIn: false

        })
    }
    onClickingRegister() {
        this.setState({
            isRegistering: true,
            isLoggingIn: false,

        })
    }

    render() {
        const doLogout = (() => this.doLogout());
        const cancelLogout = (() => this.onCancelLogout());
        const onClickingLogout = (() => this.tryLogout());
        const doLogin = (() => this.onClickingLogin());
        const loggedIn = (() => this.onLoggingIn());
        const onClickingRegister = (() => this.onClickingRegister());
        const onClickingOtherTabs = (() => this.onClickingOtherTabs());
        var logout = null;

        if (this.state.tryLogout === true) {
            logout = <Logout cancel={cancelLogout} clickLogOut={doLogout} />
        }

        var login = null;
        if (this.state.isLoggingIn === true) {
            login = <Login loggedIn={loggedIn} />
        }
        var home = null;
        if (!this.state.isLoggedIn && !this.state.isLoggingIn && !this.state.isRegistering && !this.state.tryLogout) {
            home = <Home />
        }

        var register = null;
        if (this.state.isRegistering) {
            register = <Register loggedIn={loggedIn} loggedIn={loggedIn} />
        }
        return (
            <Layout tryLogout={onClickingLogout} isLoggedIn={this.state.isLoggedIn}
                onClickingLogin={doLogin} onClickingRegister={onClickingRegister}
                onClickingTab={onClickingOtherTabs}
            >
                {logout}
                {login}
                {home}
                {register}
                <Switch>
                    <Route exact path="/" component={Home} />                    
                    <Route exact path='/users' component={UserHome} />
                    <Route exact path='/groups' component={GroupContent} />
                </Switch>
            </Layout>

        );
    }



}