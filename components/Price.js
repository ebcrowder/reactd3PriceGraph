import React, { Component } from 'react';
import Button from './Button';

const API_BASE = 'https://www.coinbase.com/api/v2/prices/';
const API_SPOT = 'spot';
const COIN_OPTIONS = ['BTC', 'BCH', 'ETH', 'LTC'];

class Price extends Component {
  state = {
    currentValue: '',
    currentBase: '',
    currentCurrency: '',
    currencySelection: 'BTC'
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

  changeCurrency = () => {
    index = COIN_OPTIONS.indexOf(this.state.currencySelection);
    if (index >= 0 && index < COIN_OPTIONS.length - 1)
      nextItem = COIN_OPTIONS[index + 1];

    this.setState({ currencySelection: nextItem });
  };

  componentDidMount() {
    this.fetchCurrentValue(this.state.currencySelection);
  }

  render() {
    return (
      <div>
        <p>{this.state.currentValue}</p>
        <p>{this.state.currentBase}</p>
        <p>{this.state.currentCurrency}</p>
        <Button
          className="button"
          onClick={this.changeCurrency}
          currency={this.state.currencySelection}
        />
      </div>
    );
  }
}

export default Price;
