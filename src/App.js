import { React, Component } from 'react';
import { Button } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';

import './App.css';
import CatEgorySelector from './components/CatEgorySelector';

import catloading from './img/catloading.gif';
import caterror from './img/caterror.gif';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCatUrl: catloading,
      categoryId: 0,
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
            src={this.state.currentCatUrl}
            className="App-logo"
            alt="hopefully a cat"
          />
          <div className="App-tools">
            <div className="App-spacer">
              <CatEgorySelector
                onCatEgoryChange={(value) => {
                  this.setState({ categoryId: value }, () =>
                    this.getNewCatUrl()
                  );
                }}
                catEgorySelected={this.state.categoryId}></CatEgorySelector>
            </div>
            <div className="App-spacer">
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={this.getNewCatUrl}
                startIcon={<PetsIcon />}>
                New Cat Please!
              </Button>
            </div>
          </div>
        </header>
      </div>
    );
  }

  getNewCatUrl = () => {
    this.setState({ currentCatUrl: catloading });
    var fetchUrl = 'https://api.thecatapi.com/v1/images/search';
    if (this.state.categoryId > 0)
      fetchUrl += '?category_ids=' + this.state.categoryId;
    console.log(fetchUrl);
    fetch(fetchUrl, {
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
          this.setState({ currentCatUrl: response[0].url });
        } else {
          this.setState({ currentCatUrl: caterror });
        }
      });
  };
}
