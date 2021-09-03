import { React, Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

/** props
 * catEgorySelected - currently selected value
 * onCatEgoryChange - callback function
 */
export default class CatEgorySelector extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      catEgories: [],
    };
  }

  handleChange(event) {
    this.props.onCatEgoryChange(event.target.value);
  }

  componentDidMount() {
    fetch('https://api.thecatapi.com/v1/categories', {
      method: 'GET',
      headers: {
        'x-api-key': process.env.REACT_APP_CAT_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ catEgories: response });
      });
  }

  render() {
    const catEgorySelected = this.props.catEgorySelected;
    return (
      <FormControl variant="outlined">
        <InputLabel id="cat-egory-select-label">Cat-egory</InputLabel>
        <Select
          id="cat-egory-select"
          value={catEgorySelected}
          onChange={this.handleChange}
          label="Cat-egory">
          <MenuItem key="0" value="0">
            <em>All Categories</em>
          </MenuItem>
          {this.state.catEgories.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}
