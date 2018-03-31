/* eslint-disable no-undef */
import React, {Component} from 'react';
import $ from "jquery";

export default class NodeMap extends Component {

  updateMap = () => {
    let {nodes} = this.props;

    let sizes = [
      {
        minimumCount: 50,
        symbolSize: 23
      },
      {
        minimumCount: 10,
        symbolSize: 18
      },
      {
        minimumCount: 3,
        symbolSize: 13
      },
      {
        minimumCount: 1,
        symbolSize: 8
      },
    ];

    let i;
    let newNodes = [];

    for (let node of nodes) {
      let data = [
        node.longitude,
        node.latitude,
        node.count,
        node.city,
        node.province,
        node.country];

      for (i = 0; i < sizes.length; i++) {
        if (node.count >= sizes[i].minimumCount) {
          if (!newNodes[i]) {
            newNodes[i] = [];
          }
          newNodes[i].push(data);
          break;
        }
      }
    }

    let series = sizes.map(function(size, index) {
      return {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: newNodes[index],
        symbolSize: size.symbolSize,
        showEffectOn: 'render',
        rippleEffect: {
          scale: 3,
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#E70B18'
          }
        }
      }
    });

    this.map.setOption({
      tooltip: {
        formatter: function(param) {
          let data = param.data;
          let location = [data[3], data[5]];
          return [
            location.filter((value) => value !== '').join(', '),
            'Count: ' + data[2]
          ].join('<br>');
        }
      },
      geo: {
        map: 'world',
        left: 0,
        right: 0,
        silent: true,
        roam: true,
        itemStyle: {
          normal: {
            // borderColor: '#003',
            color: '#D0D0D0',
            borderColor:'#D0D0D0'
          }
        }
      },
      series: series
    });
  };

  componentDidMount() {
    let nodemap = $(this.$ref);
    this.map = echarts.init(nodemap[0]);
    this.updateMap();
  }

  componentDidUpdate() {
    this.updateMap();
  }

  render() {

    let {className} = this.props;

    return (
      <div className={className + " node-map"} ref={(cmp) => this.$ref = cmp}/>
    )
  }
}
