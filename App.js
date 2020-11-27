import React from "react";
import "./App.css";
import AddForm from "./AddForm";
import RecList from "./RecList";
import UserSignUp from "./UserSignUp";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recList: [{}],
      authToken: "",
      username: ""
    };
  }

  componentDidMount() {
    this.getNewList();
    this.getAuthToken();
    console.log(localStorage.getItem('name'));
  }

  setUserState = (username) => {
    this.setState({username:username});
  }

  getAuthToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      body: "grant_type=client_credentials",
      headers: {
        Authorization:
          "Basic ZmQ4ZTRmZDg3YTQ2NGVlMjhmMmU1ZmRmNTcwMDg4MGQ6ZmU0NGJiYjJmZjU5NDc3OTg0N2EwNzNlOGYzYjZiNjU",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const tokenStuff = await response.json();
    console.log(tokenStuff);
    this.setState({ authToken: tokenStuff.access_token });
  };

  getNewList = async () => {
    try {
      const newList = await fetch("https://drewh.net/api/recs");
      const data = await newList.json();
      console.log(data);
      this.setState({ recList: data });
    } catch (err) {
      this.setState({ recList: [] });
    }
  };

  uploadRec = async (namePass, descriptionPass, spotObjectPass) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const dataToSend = {
      name: namePass,
      description: descriptionPass,
      spotObj: spotObjectPass,
    };

    var raw = JSON.stringify(dataToSend);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://drewh.net/api/recs", requestOptions)
      .then((response) => response.text())
      .then(this.getNewList)
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div id="maincontainer">
        <UserSignUp sendUser={this.setUserState}/>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2">Logged in as: {this.state.username}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography variant="h6"> Future Updates: </Typography>
              <Typography> Likes </Typography>
              <Typography> Uploading songs, artists, and playlists </Typography>
              <Typography> Genre and other information </Typography>
              <Typography> Apple Music support </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
        <AddForm token={this.state.authToken} uploadFromForm={this.uploadRec} username={this.state.username}/>
        <RecList
          token={this.state.authToken}
          list={this.state.recList}
          username={this.state.username}
          errorupdate={this.getNewList}
        />
      </div>
    );
  }
}

export default App;