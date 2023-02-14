import './App.scss';
import * as React from 'react';
import { DateTime } from "luxon";
import AppApi from '../api/AppApi';

export interface AppProps {
  value?: Array<any>
}

export interface AppState {
  value?: string,
  list: Array<any>
}
const ONE_HOUR_INTERVAL = 3600000;

export class App extends React.PureComponent<AppProps, AppState>{

  constructor(props) {
    super(props);

    this.state = {
      value: null,
      list: []
    };

  }

  async componentDidMount() {
    let currentCurrencyRate = await AppApi.getCurrency();

    // Initialize State
    this.setState({ value: currentCurrencyRate });
    this.setState(state => {

      const list = [...state.list, state.value];
      return { list, value: currentCurrencyRate };
    });
    console.log("Initial State", this.state)

    // Set GET call to run every hour
    setInterval(
      () => this.setState(state => {
        (async () => {

          currentCurrencyRate = await AppApi.getCurrency();
        })();

        const list = [...state.list, state.value];
        return { list, value: currentCurrencyRate };
      }
      ),
      ONE_HOUR_INTERVAL
    );
  }

  private createTable = () => {

    let comps = [];

    for (let i = 1; i < 25; i++) {
      let date = DateTime.now().setZone("America/New_York").minus({ hours: i }).toLocaleString(DateTime.DATETIME_MED);
      let rate = this.state.list[this.state.list?.length - i];
      if (rate == null) {
        rate = "App has not run for 24 hours yet";
      }
      if (rate !== undefined) {
        comps.push(<tr key={date}><td>{date}</td><td>{rate}</td></tr>)
      }
    }

    return comps;
  };

  render() {
    if ((this.state.value === null || this.state.value === undefined)) {
      return (
        <div>Loading...</div>
      );
    }
    return (

      <div className="App">
        <h1>Last 24 hours Currency Conversion Rate (for 1 USD to BRL)</h1>
        <table>
          <tbody>
            <tr>
              <th>Time</th>
              <th>Currency Conversion Rate</th>
            </tr>
            {this.createTable()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
