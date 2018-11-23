import * as React from 'react';
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory';

export interface Props {
  prices: Array<number>;
}

export default class LineBase extends React.Component<Props, object> {
  formatPriceHistory = (data: Array<number>) =>
    data
      .map((d: any) => ({
        price: Number(d.price),
        time: new Date(d.time).toLocaleString()
      }))
      .sort((a: any, b: any) => a.time - b.time);

  render() {
    const formattedPrices = this.formatPriceHistory(this.props.prices);

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
