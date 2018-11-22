import { Component } from 'react';
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory';

export default class LineBase extends Component {
  formatPriceHistory = data =>
    data
      .map(d => ({
        price: Number(d.price),
        time: new Date(d.time).toLocaleString()
      }))
      .sort((a, b) => a.time - b.time);

  render() {
    const formattedPrices = this.formatPriceHistory(this.props.prices);
    console.log(formattedPrices);
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
            parent: { border: '1px solid #ccc' }
          }}
          y={d => d.price}
          x={d => d.time}
          data={formattedPrices}
          animate={{ duration: 2000 }}
        />
      </VictoryChart>
    );
  }
}
