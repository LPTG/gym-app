import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
} from "@material-ui/core";
import auth from "../../Auth";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
    width: "100%",
    heigh: "100%",
  },
  details: {
    display: "flex",
  },
}));

function ItemCard(props) {
  const { name, description, templateCard, itemId } = props;
  const classes = useStyles();
  //const theme = useTheme();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea className={classes.cardAction} onClick={props.handleClick}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" component="p" wrap="nowrap">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {templateCard && (
        <CardActions>
          <Button
            color="secondary"
            onClick={() => props.history.push(`/${auth.getUser().username}/workouts/new/${itemId}`)}
          >
            Use Template
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default withRouter(ItemCard);
