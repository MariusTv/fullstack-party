import React from 'react';
import Div100vh from 'react-div-100vh';

const LoginPage = (props) => (
    <Div100vh className="box-layout">
        <div className="box-layout__box">
            <img src="/images/testio-logo-white.png" alt="Testio logo" />
            <a className="button" href='/auth/github'>Login With GitHub</a>
        </div>
    </Div100vh>
);

export default LoginPage;