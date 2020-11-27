import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography
} from "@material-ui/core";

class UserSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",

      isOpen: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if (this.openIfNoName()) {
      console.log('mount was tru');
      this.setState({isOpen: true});
    } else {
      this.props.sendUser(localStorage.getItem('name'));
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  uploadToServer = async (username) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const dataToSend = {
      username: username,
    };

    var raw = JSON.stringify(dataToSend);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://drewh.net/api/users", requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  };

  handleClose = () => {
    if (this.state.username.length === 0) {
      alert("Please provide a name");
    } else {
      this.uploadToServer(this.state.username);
      this.setState({ isOpen: false });
      // send to app.js
      localStorage.setItem('name', this.state.username);
      this.props.sendUser(localStorage.getItem('name'));
    }
  };

  openIfNoName = () => {
    if(localStorage.getItem('name') == null) {
      console.log("i was null")
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Set Your Name</DialogTitle>
          <Typography className="SignUpWarning">You will not be able to change this again.</Typography>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              name="username"
              label="Your Name"
              fullWidth
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default UserSignUp;