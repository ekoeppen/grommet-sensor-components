import React, { Component } from 'react';
import {
  Box,
  Text,
  Meter,
} from 'grommet';
import moment from 'moment'

const formatTimestamp = timestamp => {
  const delta = Math.round((new Date() / 1000 - timestamp) / 60)
  if (delta > 60) {
    return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss")
  } else {
    return delta + (delta == 1 ? "min" : "mins")
  }
}

const Value = (props) =>
  <Text size='large'>{props.value} {props.units}</Text>

const Timestamp = (props) =>
  <Text size='small'>{formatTimestamp(props.timestamp)}</Text>

const Voltage = (props) =>
  <Text size='small'>{props.voltage}V</Text>

const TemperatureMeter = (props) =>
  <Box direction='column' margin={{top: 'small', bottom: 'small'}}>
    <Value {...props} value={props.temperature} label='' units='&deg;C' align='center'/>
    <Meter {...props} type='bar' thickness='small' values={
        [
          {
            value: (props.temperature - props.low) / (props.high - props.low) * 100,
            color: 'neutral-3'
          }
        ]
      }/>
    <Box direction='row' fill='horizontal' justify='between'
      pad={{"between": "small"}}
      responsive={false}>
      <Text size='small'>{props.low}</Text>
      <Text size='small'>{props.high}</Text>
    </Box>
  </Box>

const HumidityMeter = (props) =>
  <Box direction='column' margin={{top: 'small', bottom: 'small'}}>
    <Value {...props} value={props.humidity} label='' units='%'/>
    <Meter {...props} value={props.humidity} label=''
      type='bar' thickness='small'
      values={
        [
          {
            value: props.humidity,
            color: 'neutral-1'
          }
        ]
      }
    />
    <Box direction='row' fill='horizontal' justify='between' pad={{"between": "small"}}
      responsive={false}>
      <Text size='small'>0</Text>
      <Text size='small'>100</Text>
    </Box>
  </Box>

const TemperatureView = (props) =>
  <Box direction='column' align='start' pad='small'>
    <Text {...props}>{props.location}</Text>
    <TemperatureMeter {...props}/>
    <Box direction='row' fill='horizontal' justify='between'
      margin={{top: "small"}}
      pad={{"between": "large"}}
      responsive={false}>
      <Timestamp {...props}/> <Voltage {...props}/>
    </Box>
  </Box>

const TemperatureHumidityView = (props) =>
  <Box direction='column' align='start' pad='small'>
    <Text {...props}>{props.location}</Text>
    <TemperatureMeter {...props}/>
    <HumidityMeter {...props}/>
    <Box direction='row' fill='horizontal' justify='between'
      margin={{top: "small"}}
      pad={{"between": "large"}}
      responsive={false}>
      <Timestamp {...props}/> <Voltage {...props}/>
    </Box>
  </Box>

export {TemperatureView, TemperatureHumidityView}
