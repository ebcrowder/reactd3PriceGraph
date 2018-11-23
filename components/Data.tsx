import * as React from 'react';
import moment from 'moment';
import Card, { CardGrid } from './Card';
import Chart from './Chart';

const API_BASE = 'https://api.pro.coinbase.com/products/';
const COIN_OPTIONS = ['BTC', 'BCH', 'ETH', 'LTC'];

interface State {
  currentTime: string;
  currentValue: string;
  currencyIndex: number;
  priceHistory: Array<number>;
  pricePeriod: number;
}

class Price extends React.Component<object, State> {
  state = {
    currentTime: '',
    currentValue: '',
    currencyIndex: 0,
    priceHistory: [],
    pricePeriod: 86400
  };

  fetchCurrentValue = async (coin: string) => {
    try {
      await fetch(`${API_BASE}${coin}-USD/trades`)
        .then(r => r.json())
        .then(r =>
          this.setState({
            currentTime: r[0].time,
            currentValue: parseFloat(r[0].price).toFixed(2)
          })
        );
    } catch {
      throw new Error('nope');
    }
  };

  fetchValueHistory = async (coin: string, period: number) => {
    let priceArray: any = [];

    await fetch(`${API_BASE}${coin}-USD/candles?granularity=${period}`)
      .then(r => r.json())
      .then(r =>
        r.forEach((a: any) => {
          priceArray.push({
            time: moment.unix(a[0]).format('MM/DD'),
            price: a[1]
          });
        })
      );
    this.setState({ priceHistory: priceArray });
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
        <CardGrid>
          <Card
            currentValue={this.state.currentValue}
            onClick={this.changeCurrency}
            currency={COIN_OPTIONS[this.state.currencyIndex]}
          />
        </CardGrid>
        {this.state.priceHistory ? (
          <Chart prices={this.state.priceHistory} />
        ) : null}
      </>
    );
  }
}

export default Price;
