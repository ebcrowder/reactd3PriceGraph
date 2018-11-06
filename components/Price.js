import React, { Component } from 'react';

const API_BASE = 'https://www.coinbase.com/api/v2/prices/';
const API_SPOT = 'spot';
const COIN_OPTIONS = ['BTC', 'BCH', 'ETH', 'LTC'];

class Price extends Component {
  state = {
    currentValue: '',
    currentBase: '',
    currentCurrency: ''
  };

  fetchCurrentValue = async coin => {
    try {
      const d = await fetch(`${API_BASE}${coin}-USD/${API_SPOT}`).then(r =>
        r.json()
      );

      this.setState({
        currentValue: d.data.amount,
        currentBase: d.data.base,
        currentCurrency: d.data.currency
      });
    } catch {
      throw new Error('nope');
    }
  };

  componentDidMount() {
    this.fetchCurrentValue(COIN_OPTIONS[0]);
  }

  render() {
    return (
      <div>
        <p>{this.state.currentValue}</p>
        <p>{this.state.currentBase}</p>
        <p>{this.state.currentCurrency}</p>
      </div>
    );
  }
}

export default Price;
