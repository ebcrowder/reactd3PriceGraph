import React, { PureComponent, createRef } from 'react';
import styled from 'styled-components';
import { easeCubicOut, extent, line, scaleLinear, scaleTime, select } from 'd3';
import interpolatePath from 'd3-interpolate-path';

const LINE_DUMMY = Array(2)
  .fill()
  .map((a, i) => ({ price: 0, time: new Date(2010 + i) }));
const PADDING = 24;
const TRANSITION_DURATION = 500;

const safePrices = prices =>
  Array.isArray(prices) && prices.length > 1 ? prices : LINE_DUMMY;

const Svg = styled.svg`
  height: 100%;
  width: 100%;
  pointer-events: none;
  flex: 1 0 ${() => 4 * 40}rem;
`;

export default class LineBase extends PureComponent {
  pathRef = createRef();
  svgRef = createRef();

  componentDidMount() {
    if (
      this.pathRef &&
      this.pathRef.current &&
      this.svgRef &&
      this.svgRef.current
    ) {
      const { height, width } = this.svgRef.current.getBoundingClientRect();
      const { prices } = this.props;
      this.path = select(this.pathRef.current);

      this.height = height;
      this.width = width;

      const d = lineFromPrices(
        scalePrices(safePrices(prices), height, width, PADDING, PADDING)
      );
      this.path.attr('d', d);
      this.d = d;

      window.addEventListener('resize', this.handleResize);
    }
  }

  componentDidUpdate() {
    this.updatePath();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (this.svgRef && this.svgRef.current) {
      const { height, width } = this.svgRef.current.getBoundingClientRect();
      this.height = height;
      this.width = width;

      this.updatePath();
    }
  };

  updatePath = () => {
    const scalePrices = (
      data,
      height,
      width,
      paddingTop = 0,
      paddingBottom = 0,
      paddingLeft = 0,
      paddingRight = 0
    ) => {
      const priceToY = scaleLinear()
        .range([height - paddingBottom, paddingTop])
        .domain(extent(data, d => d.price));

      const timeToX = scaleTime()
        .range([paddingLeft, width - paddingRight])
        .domain(extent(data, d => d.time));

      return data.map(({ price, time }) => ({
        price: priceToY(price),
        time: timeToX(time)
      }));
    };

    const lineFromPrices = line()
      .x(d => d.time)
      .y(d => d.price);

    const { prices } = this.props;

    const d = lineFromPrices(
      scalePrices(safePrices(prices), this.height, this.width, PADDING, PADDING)
    );

    this.path
      .transition()
      .duration(TRANSITION_DURATION)
      .ease(easeCubicOut)
      .attrTween('d', interpolatePath.bind(null, this.d, d));

    this.d = d;
  };

  render() {
    return (
      <Svg innerRef={this.svgRef}>
        <path
          fill="none"
          ref={this.pathRef}
          stroke="#FF3D00"
          strokeWidth="1.5"
        />
      </Svg>
    );
  }
}
