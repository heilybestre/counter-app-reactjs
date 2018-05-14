import React from 'react';
import PropTypes from 'prop-types';

const CounterItem = props => 
    <div key={props.id} id={props.id} className="item">
        <button className="delete" id={props.id} onClick={props.deleteCounter}>x</button>
        <div className="title"><label>{props.title}</label></div>
        <div className="counter-buttons">
            <button className="decrement" id={props.id} onClick={props.decrementCounter}>-</button>
            <label className="count">{props.count}</label>
            <button className="increment" id={props.id} onClick={props.incrementCounter}>+</button>
        </div>
    </div>
 
CounterItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    deleteCounter: PropTypes.func.isRequired,
    decrementCounter: PropTypes.func.isRequired,
    incrementCounter: PropTypes.func.isRequired
}

CounterItem.defaultProps = {
    id: 'counteritemid',
    title: 'Name',
    count: 0,
    deleteCounter: () => {},
    decrementCounter: () => {},
    incrementCounter: () => {}
}

export default CounterItem;
