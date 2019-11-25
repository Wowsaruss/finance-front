import React, { Component } from 'react';
import './Filters.css';
import ask from '@wowsaruss/ask';

class Filters extends Component {
  constructor() {
    super();
    this.state = {
      type: 'Gym',
      monthly: 'false',
      spend: 'true',
      transactionList: []
    };
  }

  async componentDidMount() {
    const { type, monthly, spend } = this.state;
    try {
      const res = await ask(
        `${process.env.REACT_APP_TRANSACTIONS_API}/api/filter?type=${type}&monthly=${monthly}&spend=${spend}`
      );
      this.setState({
        transactionList: res ? res : []
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleTypeChange = async e => {
    this.setState({ type: e.target.value });
    const { monthly, spend } = this.state;
    try {
      const res = await ask(
        `${process.env.REACT_APP_TRANSACTIONS_API}/api/filter?type=${e.target.value}&monthly=${monthly}&spend=${spend}`
      );
      this.setState({
        transactionList: res ? res : []
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleMonthlyChange = async e => {
    this.setState({ monthly: e.target.value });
    const { type, spend } = this.state;
    try {
      const res = await ask(
        `${process.env.REACT_APP_TRANSACTIONS_API}/api/filter?type=${type}&monthly=${e.target.value}&spend=${spend}`
      );
      this.setState({
        transactionList: res ? res : []
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleSpendChange = async e => {
    this.setState({ spend: e.target.value });
    const { type, monthly } = this.state;
    try {
      const res = await ask(
        `${process.env.REACT_APP_TRANSACTIONS_API}/api/filter?type=${type}&monthly=${monthly}&spend=${e.target.value}`
      );
      this.setState({
        transactionList: res ? res : []
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <h2>FILTERS</h2>
        <div className="filters">
          <div className="filter">
            <h5>TYPE</h5>
            <select
              className="select-css"
              id="lang"
              value={this.state.type}
              onChange={e => {
                this.handleTypeChange(e);
              }}>
              <option value="">-</option>
              <option value="Fuel">Fuel</option>
              <option value="Food">Food</option>
              <option value="Grocery">Grocery</option>
              <option value="Gym">Gym</option>
            </select>
          </div>
          <div className="filter">
            <h5>MONTHLY</h5>
            <select
              className="select-css"
              id="lang"
              value={this.state.monthly}
              onChange={e => {
                this.handleMonthlyChange(e);
              }}>
              <option value="">-</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="filter">
            <h5>SPEND</h5>
            <select
              className="select-css"
              id="lang"
              value={this.state.spend}
              onChange={e => {
                this.handleSpendChange(e);
              }}>
              <option value="">-</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
        {this.state.transactionList.map((t, i) => {
          return (
            <div key={i} className="transaction">
              <p>Title: {t.description}</p>
              <p>Amount: {t.amount}</p>
              <p>Type: {t.type}</p>
              <p>Date: {t.date}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Filters;
