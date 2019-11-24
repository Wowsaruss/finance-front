import React, { Component } from 'react';
import ask from '@wowsaruss/ask';

class Chart extends Component {
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
    console.log(this.state);
    const items = this.state.transactionList.map((t, i) => {
      return (
        <div key={i}>
          <p>{t.description}</p>
          <p>{t.amount}</p>
          <p>{t.type}</p>
          <p>{t.date}</p>
        </div>
      );
    });

    return (
      <div>
        <div>
          <h2>Filters</h2>
          <select
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
          <select
            id="lang"
            value={this.state.monthly}
            onChange={e => {
              this.handleMonthlyChange(e);
            }}>
            <option value="">-</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <select
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
        {items}
      </div>
    );
  }
}

export default Chart;
