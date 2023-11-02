import React, { PureComponent } from 'react';

const tableStyle = {
  textAlign: 'center',
};

class Learn2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getCanvasBar();
    this.getCanvasPie();
    this.getCanvaLineChart();
    this.getCanvasAreaChart();
  }

  getCanvasBar = () => {
    const context = this.bar.getContext('2d');
    context.fillStyle = 'red';
    context.beginPath();
    context.rect(0.5 * this.bar.width, 0.5 * this.bar.height, 100, 100);
    context.fill();
  };

  getCanvasPie = () => null;

  getCanvaLineChart = () => null;

  getCanvasAreaChart = () => null;

  render() {
    return (
      <table style={tableStyle}>
        <tr>
          <td>
            <canvas
              ref={ref => {
                this.bar = ref;
              }}
            />
          </td>
          <td>
            <canvas
              ref={ref => {
                this.pie = ref;
              }}
            />
          </td>
          <td>
            <canvas
              ref={ref => {
                this.lineChart = ref;
              }}
            />
          </td>
          <td>
            <canvas
              ref={ref => {
                this.areaChart = ref;
              }}
            />
          </td>
        </tr>
        <tr>
          <th>canvas柱状图</th>
          <th>canvas饼图</th>
          <th>canvas折线图</th>
          <th>canvas面积图</th>
        </tr>
      </table>
    );
  }
}

export default Learn2;
