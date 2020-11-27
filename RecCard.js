import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography, Button } from "@material-ui/core";
import AddComment from "./AddComment";
class RecCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.obj.comments,
    };
  }

  uploadToServer = async (name, comment, albumName) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const dataToSend = {
      name: name,
      message: comment,
      filterId: this.props.obj._id
    };

    var raw = JSON.stringify(dataToSend);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://drewh.net/api/addcomment", requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  };

  uploadComment = (name, message) => {
    this.uploadToServer(name, message, this.props.obj.spotObj.name);
    // Upload to state
    const newComments = this.state.comments;
    newComments.push({ name: name, message: message });
    this.setState({ comments: newComments });
  };

  render() {
    const username = this.props.obj.name;
    const description = this.props.obj.description;
    const spotObj = this.props.obj.spotObj;
    const comments = this.state.comments;

    var renderList;
    if (comments.length > 0) {
      renderList = [];
      comments.forEach((element, index, array) => {
        renderList.push(
          <Typography variant="body1">
            {" "}
            {element.name}: {element.message}{" "}
          </Typography>
        );
      });
    } else {
      renderList = null;
    }

    return (
      <Card className="RecCard" elevation={4}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6"> {username} Recommends... </Typography>
          </CardContent>
          <img
            src={spotObj.images[0].url}
            alt={spotObj.name}
            className="FeedArt"
          />
          <CardContent>
            <Typography variant="h5">{spotObj.name}</Typography>
            <Typography variant="h6">{spotObj.artists[0].name}</Typography>
            {description.length > 0 ? (
              <Typography variant="body1" className="FeedDesc">
                {description}
              </Typography>
            ) : null}
            <Accordion className="CommentAccordion"
              variant="outlined"
              square
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">Comments ({this.state.comments.length})</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  {renderList}
                  <div id="formspacer"></div>
                  <AddComment uploadComment={this.uploadComment} username={this.props.username} />
                </div>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="outlined" href={spotObj.external_urls.spotify}>
            Open in spotify
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default RecCard;
