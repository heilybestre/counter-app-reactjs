import React, { Component } from 'react';

import Counters from '../Counters/CountersContainer'
import './App.css';

class AppContainer extends Component {
    render() {
        return (
            <section className="counter-app">
                <section className="header">
                    <h1>counters</h1>
                </section>
                <Counters />
            </section>
        );
    }
}

export default AppContainer;
