import React, { Component } from 'react';
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      transactionList: [{ type: 1, amount: 13000 }],
      categoriesArray: ['type'],
      byCategory: {},
      value: 'Income'
    };
  }
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_TRANSACTIONS_API}/transactions`)
      .then(res => {
        const groupBy = (objectArray, property) => {
          return objectArray.reduce(function(acc, obj) {
            var key = obj[property];
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          }, {});
        };

        const grouped = groupBy(res.data, 'type');
        this.setState({
          transactionList: res.data,
          categoriesArray: [...new Set(res.data.map(c => c.type))],
          byCategory: grouped
        });
      });
  }

  change = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const selectOptions = this.state.categoriesArray.map(c => {
      return (
        <option key={c} value={c}>
          {c}
        </option>
      );
    });
    // const display = value => {
    //   return this.state.byCategory[value];
    // };
    // const display = value => {
    //   const catArr = this.state.byCategory[value];
    //   return catArr.map(c => {
    //     return <div>{c.description}</div>;
    //   });
    // };
    // console.log(display(this.state.value));

    return (
      <div>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis tickFormat={this.state.categoriesArray} />
          <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
          <VictoryBar
            horizontal
            data={this.state.transactionList}
            style={{ data: { fill: '#c43a31' } }}
            alignment="start"
            x="type"
            y="amount"
          />
        </VictoryChart>
        {/* {display(this.state.value)} */}
        <select onChange={this.change} value={this.state.value}>
          {selectOptions}
        </select>
      </div>
    );
  }
}

export default Chart;
