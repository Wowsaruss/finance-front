import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { VictoryBar, VictoryChart } from 'victory';

class App extends Component {
  constructor() {
    super();
    this.state = {
      transactionList: [{ type: 1, amount: 13000 }]
    };
  }
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_TRANSACTIONS_API}/transactions`)
      .then(res => {
        this.setState({
          transactionList: res.data
        });
      });
  }

  render() {
    // const transactions = this.state.transactionList.map((t, i) => {
    //   return (
    //     <div key={i}>
    //       <div>{t.type}</div>
    //     </div>
    //   );
    // });
    return (
      <div>
        <VictoryChart>
          <VictoryBar data={this.state.transactionList} x="type" y="amount" />
        </VictoryChart>
      </div>
    );
  }
}

export default App;
