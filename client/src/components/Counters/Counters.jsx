import React from 'react';
import PropTypes from 'prop-types';

const Counters = props => 
    <section className="main">
        <header className="header-input">
          <input id="counterName" name="counterName" type="text" placeholder="Add a counter" value={props.counterName} onChange={props.onChange} onKeyUp={props.onKeyUp} />
        </header>
        <section id="item-list" className="main">
            {props.itemLists}
        </section>
        <footer id="footer" className={`footer ${props.footer ? '' : 'hidden'}`}>
          <span className="label">TOTAL</span>
          <span id="total-count" className="count">{props.totalCount}</span>
      </footer>
    </section>
 
Counters.propTypes = {
    counterName: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
    itemLists: PropTypes.array,
    footer: PropTypes.bool.isRequired,
    totalCount: PropTypes.number.isRequired
}

export default Counters;
