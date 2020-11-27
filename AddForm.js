import React from "react";
import {
  Paper,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Divider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      spotifyObj: {},

      searchObj: {},
      searchText: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  uploadRec = () => {
    if (
      Object.keys(this.state.searchObj).length === 0 &&
      this.state.searchObj.constructor === Object
    ) {
      alert("Search for an album first");
    } else {
      const name = this.props.username;
      const desc = this.state.description;
      const obj = this.state.searchObj;
      this.props.uploadFromForm(name, desc, obj);
      this.setState({
        description: "",
        searchObj: {},
        searchText: "",
      });
    }
  };

  doSearch = async () => {
    if (this.state.searchText.length > 2) {
      const uri =
        "https://api.spotify.com/v1/search?q=" +
        encodeURIComponent(this.state.searchText) +
        "&type=album&limit=1";
      const response = await fetch(uri, {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      });
      const data = await response.json();

      console.log("got response");
      if (data.albums.items.length > 0) {
        console.log(data.albums.items[0]);
        this.setState({ searchObj: data.albums.items[0] });
        this.setState({ searchText: "" });
      }
    } else {
    }
  };

  render() {
    var imgView;
    var restOfForm;
    if ( ! this.state.searchObj.hasOwnProperty('images')) {
      imgView = <div id="noimage"> </div>;
      restOfForm = null;
    } else {
      imgView = (
        <Card className="SearchCard" elevation="4">
          <CardActionArea>
            <CardMedia
              style={{ height: "300px", paddingTop: "0%" }}
              component="img"
              className="CardArt"
              title="Album Art"
              src={this.state.searchObj.images[0].url}
            />
            <CardContent>
              <Typography variant="h5">{this.state.searchObj.name}</Typography>
              <Typography variant="h6">
                {this.state.searchObj.artists[0].name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
      restOfForm = (
        <div>
          <div id="formspacer"></div>
          <TextField
            className="SubmitInput"
            name="description"
            type="text"
            label="Description/Your Thoughts"
            fullWidth="true"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <div id="formspacer"></div>
          <div id="formspacer"></div>
          <div id="formspacer"></div>
          <div id="formspacer"></div>
          <Button
            onClick={this.uploadRec}
            variant="contained"
            className="SubmitButton"
          >
            Reccomend!
          </Button>
        </div>
      );
    }
    return (
      <Paper className="FormPaper">
        <Typography variant="h6">Submit a recomendation</Typography>
        <Divider />
        <div id="formspacer"></div>
        <div id="formspacer"></div>
        <TextField
          className="SubmitInput"
          name="searchText"
          type="text"
          label="Search for Album"
          value={this.state.searchText}
          onChange={this.handleInputChange}
          fullWidth="true"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={this.doSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            className: "SubmitInput",
          }}
        />
        <div id="formspacer"></div>
        {imgView}
        {restOfForm}
      </Paper>
    );
  }
}

export default AddForm;
