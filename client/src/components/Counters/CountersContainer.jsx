import React, { Component } from 'react';

import Counters from './Counters.jsx';
import CounterItem from './CounterItem.jsx';
const API = '/api/v1';

class CountersContainer extends Component {
   constructor(){
       super();
       this.state = {
            counterName: '',
            counters: [],
            itemLists: [],
            totalCount: 0,
            footer: false
        };
   }

    componentWillMount() {
        this.getCounters();
    }

    onKeyUp = (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            this.addCounter();
        }
    }

    onChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        this.setState({[fieldName]: fieldValue});
    }

    getCounters = () => {
        fetch(`${API}/counters`)
            .then(res => res.json())
            .then(body => {
                this.setState({counters: body});
                this.setItemLists();
                this.showHideFooter();
            });
    }

    setItemLists = () => {
        let itemLists = [];
        let totalCount = 0;
        for (let item of this.state.counters) {
            itemLists.push(this.getCounterItem(item.id, item.title, item.count));
            totalCount += item.count;
        }

        this.setState({
            itemLists: itemLists,
            totalCount: totalCount
        });
    }

    getCounterItem = (id, title, count) => {
        return <CounterItem
            key = { id }
            id = { id }
            title = { title }
            count = { count }
            deleteCounter = { this.deleteCounter }
            incrementCounter = { this.incrementCounter }
            decrementCounter = { this.decrementCounter }
        />
    }

    addCounter = () => {
        let body = { title: this.state.counterName };
        fetch(`${API}/counter`, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(json => {
                this.setState({counters: json, counterName: ''}, () => {
                    let newItem = this.state.counters.slice(-1)[0];
                    let itemLists = this.state.itemLists;
                    itemLists.push(this.getCounterItem(newItem.id, newItem.title, newItem.count));
                    this.setState({itemLists: itemLists});
                    this.showHideFooter();
                });
      });
    }

    deleteCounter = (e) => {
        let item = e.target;
        let body = { id: item.id };
        
        fetch(`${API}/counter`, { method: "DELETE", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(json => {
                this.setState({counters: json, counterName: ''}, () => {
                    this.setItemLists();
                    this.showHideFooter();
                });
            });
    }

    incrementCounter = (e) => {
        let item = e.target;
        this.updateCounterItemCount(item, 'inc');
    }

    decrementCounter = (e) => {
        let item = e.target;
        this.updateCounterItemCount(item, 'dec');
    }

    updateCounterItemCount = (item, action) => {
        let body = { id: item.id };
        fetch(`${API}/counter/${action}`, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(json => {
                this.setState({counters: json, counterName: ''}, () => {
                    this.setItemLists();
                    this.showHideFooter();
                });
            });
  }

    showHideFooter = () => {
        let footer = (this.state.counters.length > 0) ? true : false;
        this.setState({footer: footer});
    }

    render() {
        return (
            <Counters
                counterName = { this.state.counterName }
                itemLists = { this.state.itemLists }
                onChange = { this.onChange }
                onKeyUp = { this.onKeyUp }
                footer = { this.state.footer }
                totalCount = { this.state.totalCount }
            />
        );
    }
}

export default CountersContainer;
