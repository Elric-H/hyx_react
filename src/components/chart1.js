/**
 *Created by HeYuXuan
 *on 2018/2/7
 */
import React, { Component } from 'react';
import echarts from 'echarts';
import 'echarts-gl';
import world from '../assets/world.topo.bathy.200401.jpg'
import starfield from '../assets/starfield.jpg'
import pisa from '../assets/pisa.hdr'

class Chart1 extends Component {
	componentDidMount() {
		let chart = echarts.init(document.getElementById('demo'));
		let option = {
			backgroundColor: '#000',
			globe: {
				baseTexture: world,
				heightTexture: world,
				displacementScale: 0.04,
				shading: 'realistic',
				environment: starfield,
				realisticMaterial: {
					roughness: 0.9
				},
				postEffect: {
					enable: true
				},
				light: {
					main: {
						intensity: 5,
						shadow: true
					},
					ambientCubemap: {
						texture: pisa,
						diffuseIntensity: 0.2
					}
				}
			}
		};
		chart.setOption(option);
	}
	render() {
		return <div id="demo" className="chart-div"></div>
	}
}

export default Chart1;