import React, { Component } from 'react';
import ask from '@wowsaruss/ask';

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      transactionList: {}
    };
  }

  componentDidMount() {
    ask(
      `${process.env.REACT_APP_TRANSACTIONS_API}/api/filter?type=Auto&monthly=false&spend=true`
    )
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return <div>Hello World</div>;
  }
}

export default Chart;
