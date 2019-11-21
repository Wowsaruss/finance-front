import React, { Component } from 'react';
import ask from '@wowsaruss/ask';

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      transactionList: []
    };
  }

  async componentDidMount() {
    try {
      const res = await ask(
        `${process.env.REACT_APP_TRANSACTIONS_API}/api/filter?type=Auto&monthly=true&spend=true`
      );
      this.setState({
        transactionList: res
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log(this.state.transactionList);
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
    return <div>{items}</div>;
  }
}

export default Chart;
