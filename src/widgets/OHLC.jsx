import React, {useState, useEffect} from 'react';
import ReactECharts from 'echarts-for-react';



export function EChart1({data}) {

    const font_color = "#fff"
    const title="OHLC Graph"
    const height = 300
    const colorList = ['rgba(155, 89, 182,1.0)', 'rgba(52, 152, 219,1.0)', 'rgba(241, 196, 15,1.0)', 'rgba(232, 67, 147,1.0)', 'rgba(253, 203, 110,1.0)', 'rgba(0, 206, 201,1.0)', 'rgba(162, 155, 254,1.0)', 'rgba(85, 239, 196,1.0)', '#6e7074', '#546570', '#c4ccd3'];

    const dataKeys = Object.keys(data)
    if (dataKeys.map(key => data[key].length - data.t.length).reduce((a,b) => a+b,0) !== 0) {
        throw Error("ECharts Candlestick : Given data has not the same length")
    }
    const otherColumns = dataKeys.filter(x=> !["t","o","c","l","v","h"].includes(x))
    const volumnExists = dataKeys.includes("v")
    const offsetZoomBar = volumnExists?250:210
    const volumnHeight = 40
    const volumnOffset = 145

    const option = {
        animation: true,
        color: colorList,
        title: {
            left: 'center',
            text: title,
            textStyle: { fontSize: 20, color: font_color }
        },
        tooltip : {
            show : true,
            trigger: 'axis',
            backgroundColor : 'rgba(50,50,50,0.9)',
            textStyle : {
                color: font_color
            },
            position: function (pos, params, el, elRect, size) {
                const obj = {
                top: height/2
                };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            }
        },
        legend: {
            top: 30,
            data: ['OHLC', ...otherColumns],
            textStyle: { fontSize: 12, color: font_color}
        },
        xAxis: [
            {
            scale:true,
            type: 'category',
            data: data.t,
            boundaryGap: false,
            axisLine: { lineStyle: { color: font_color } },
            }, 
            ...volumnExists? [{
                type: 'category',
                gridIndex: 1,
                data: data.t,
                boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                min: 'dataMin',
                max: 'dataMax'
              }]:[]
        ],
        dataZoom: [
            { type: 'slider', show: true, xAxisIndex: [0], fillerColor: 'rgba(50,50,50,0.5)',  handleColor: 'rgba(50,50,50,1)'},
            { type: 'slider', show: true, yAxisIndex: [0], fillerColor: 'rgba(50,50,50,0.5)', handleColor: 'rgba(50,50,50,1)'},
            { type: 'inside', xAxisIndex: [0], start: 0, end: 100},
            { type: 'inside', yAxisIndex: [0], start: 0, end: 100}
        ],
        yAxis: [
            {
            scale:true,
            axisLine: { lineStyle: { color: font_color } },
            splitLine: { show: true, lineStyle: { color: "rgba(255,255,255,0.1)" } },
            axisTick: { show: false },
            axisLabel: { inside: true, formatter: '{value}\n'  }
            },
            ...volumnExists? [{
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
              }]:[]
        ],
        grid: [
            { left: 0, right: 70, top: 60, height: height+50 },
            ...volumnExists? [{
                left: 0, right: 70, top: height + volumnOffset, height: volumnHeight
              }]:[]
        ],
        series: [
            {
            name: 'OHLC',
            type: 'candlestick',
            data: data.t.map((t,i) => [data.o[i], data.c[i], data.l[i], data.h[i]]),
            itemStyle: {
                color: 'rgba(192, 57, 43, 0.5)',
                color0: 'rgba(39, 174, 96, 0.5)',
                borderColor: 'rgba(192, 57, 43, 0.5)',
                borderColor0: 'rgba(39, 174, 96, 0.5)'
            },
            },
            ...otherColumns.map(col =>  {
                return {
                    name: col,
                    type: 'line',
                    data: data[col],
                    smooth: false,
                    showSymbol: true,
                    symbol:"pin",
                    symbolSize:4,
                    lineStyle: {
                    width: 2
                    }
                }
            }),
            ...volumnExists?[{
                name: 'Volume',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.t.map((x,i)=> [i, data.v[i], data.c[i]>data.o[i] ? -1:1])
            }]: []
        ],
        ...volumnExists ? {
            visualMap: {
                show: true,
                seriesIndex: dataKeys.findIndex(x=>x=="v"),
                dimension: 2,
                pieces: [
                    { value: -1, color: "rgba(192, 57, 43, 0.5)" },
                    { value: 1, color: "rgba(39, 174, 96, 0.5)" }
                ]
            }
        }:null
    }
    

    return <ReactECharts
        option={option}
        style={{ height: height + offsetZoomBar }}
    />;
};