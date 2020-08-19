import React from "react";
import { Card, CardContent, Typography, CardActions } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ForwardIcon from "@material-ui/icons/Forward";
import auth from "../../Auth";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#FBFEF9",
    minWidth: 250,
  },
  cardContent: {
    display: "block",
    textAlign: "initial",
    width: "100%",
    height: "100%",
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
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1" wrap="nowrap">
          {description}
        </Typography>
      </CardContent>

      {!templateCard && (
        <CardActions>
          <EditIcon cursor="pointer" fontSize="large" onClick={props.handleClick} />
        </CardActions>
      )}
      {templateCard && (
        <CardActions>
          <EditIcon cursor="pointer" fontSize="large" onClick={props.handleClick} />
          <ForwardIcon
            cursor="pointer"
            fontSize="large"
            onClick={() => props.history.push(`/${auth.getUser()}/workouts/new/${itemId}`)}
          />
        </CardActions>
      )}
    </Card>
  );
}

export default withRouter(ItemCard);
