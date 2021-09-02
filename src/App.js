import { Component } from 'react';
import { Button } from '@material-ui/core';
import RandomCatButton from './components/RandomCatButton';
import './App.css';

import catloading from './img/catloading.gif';
import caterror from './img/caterror.gif';

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
          <div className="App-tools">
            <Button
              variant="contained"
              color="primary"
              onClick={this.getNewCatUrl}>
              New Cat Please!
            </Button>
          </div>
        </header>
      </div>
    );
  }

  getNewCatUrl = () => {
    this.setState({ currentCat: catloading });
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
        if (response.length > 0) {
          this.setState({ currentCat: response[0].url });
        } else {
          this.setState({ currentCat: caterror });
        }
      });
  };
}
