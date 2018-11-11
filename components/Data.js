import React, { Component } from 'react';
import Button from './Button';

const API_BASE = 'https://www.coinbase.com/api/v2/prices/';
const API_HISTORY = 'historic?period=';
const API_SPOT = 'spot';
const COIN_OPTIONS = ['BTC', 'BCH', 'ETH', 'LTC'];

class Price extends Component {
  state = {
    currentValue: '',
    currentBase: '',
    currencyIndex: 0,
    priceHistory: {},
    pricePeriod: 'week'
  };

  fetchCurrentValue = async coin => {
    try {
      const d = await fetch(`${API_BASE}${coin}-USD/${API_SPOT}`).then(r =>
        r.json()
      );

      this.setState({
        currentValue: d.data.amount,
        currentBase: d.data.base
      });
    } catch {
      throw new Error('nope');
    }
  };

  fetchValueHistory = async (coin, period) => {
    const d = await fetch(
      `${API_BASE}${coin}-USD/${API_HISTORY}${period}`
    ).then(r => r.json());
    this.setState({ priceHistory: d && d.data && d.data.prices });
  };

  changeCurrency = () => {
    this.setState(
      {
        currencyIndex: (this.state.currencyIndex + 1) % COIN_OPTIONS.length
      },
      () => {
        this.fetchCurrentValue(COIN_OPTIONS[this.state.currencyIndex]);
        this.fetchValueHistory(
          COIN_OPTIONS[this.state.currencyIndex],
          this.state.pricePeriod
        );
      }
    );
  };

  componentDidMount() {
    this.fetchCurrentValue(COIN_OPTIONS[this.state.currencyIndex]);
    this.fetchValueHistory(
      COIN_OPTIONS[this.state.currencyIndex],
      this.state.pricePeriod
    );
  }

  render() {
    return (
      <>
        <p>{this.state.currentValue}</p>
        <p>{this.state.currentBase}</p>
        <Button
          onClick={this.changeCurrency}
          currency={COIN_OPTIONS[this.state.currencyIndex]}
        />
      </>
    );
  }
}

export default Price;
