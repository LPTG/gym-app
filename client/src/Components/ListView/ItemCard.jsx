import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

class ItemCard extends React.PureComponent {
  render() {
    const { name, description } = this.props;
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default ItemCard;
