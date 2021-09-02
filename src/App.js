import { Component } from 'react';
import catloading from './img/catloading.gif';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCat: catloading,
    };
  }

  componentDidMount() {
    this.getNewCatUrl();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={this.state.currentCat}
            className="App-logo"
            alt="hopefully a cat"
          />
          <p>
            <strong>Reload Page To Get A New Cat</strong>
          </p>
        </header>
      </div>
    );
  }

  getNewCatUrl() {
    fetch('https://api.thecatapi.com/v1/images/search', {
      method: 'GET',
      headers: {
        'x-api-key': process.env.REACT_APP_CAT_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ currentCat: response[0].url });
      });
  }
}
