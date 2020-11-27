import React from "react";
import RecCard from "./RecCard";
import { Paper, Typography, Button } from "@material-ui/core";
import Delay from "react-delay";

class RecList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.list.length > 1) {
      var addedList = [];
      const listToShow = this.props.list;
      listToShow.forEach((element, index, array) => {
        addedList.push(
          <RecCard username={this.props.username} key={index} obj={element} token={this.props.token} />
        );
      });
      return <div className="RecList">{addedList}</div>;
    } else {
      return (
        <Delay wait={750}>
          <Paper className="ErrorPaper">
            <Typography variant="h5">Can't fetch recommendations</Typography>
            <div id="formspacer"></div>
            <Button variant="outlined" onClick={this.props.errorupdate}>
              Refresh
            </Button>
          </Paper>
        </Delay>
      );
    }
  }
}

export default RecList;
