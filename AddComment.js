import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",

      isOpen: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.cancelWindow = this.cancelWindow.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    if (this.state.comment.length == 0) {
      alert("Please provide a comment");
    } else {
      this.setState({ isOpen: false });
      this.props.uploadComment(this.props.username, this.state.comment);
    }
  };

  cancelWindow = () => {
    this.setState({ isOpen: false });
  };
  render() {
    return (
      <div>
        <Button variant="outlined" onClick={this.handleClickOpen} className="OpenCommentButton">
          Add Comment
        </Button>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Leave a comment</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="comment"
              label="Comment"
              fullWidth
              value={this.state.comment}
              onChange={this.handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelWindow} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default AddComment;
