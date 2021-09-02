import { Button } from '@material-ui/core';

const RandomCatButton = ({ setCatUrl }) => {
  return (
    <Button variant="contained" color="primary" onClick={this.getNewCatUrl}>
      New Cat Please!
    </Button>
  );

  getNewCatUrl = () => {
    setCatUrl({ currentCat: catloading });
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
          setCatUrl({ currentCat: response[0].url });
        } else {
          setCatUrl({ currentCat: caterror });
        }
      });
  };
};
