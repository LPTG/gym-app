import React from "react";
import ItemCard from "./ItemCard";
import { Box, Grid } from "@material-ui/core";

function ItemList(props) {
  return (
    <Grid container item direction="column" justify="space-between">
      {props.list.map((item) => (
        <Grid container item direction="row" key={item._id}>
          <Grid item xs />
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Box mb={1}>
              <ItemCard
                itemId={item._id}
                handleClick={() => props.handleClick(item._id)}
                name={item.name}
                description={item.desc}
                templateCard={props.templateCard}
              />
            </Box>
          </Grid>
          <Grid item xs />
        </Grid>
      ))}
    </Grid>
  );
}

export default ItemList;
