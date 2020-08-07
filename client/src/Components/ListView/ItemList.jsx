import React from "react";
import ItemCard from "./ItemCard";
import { Grid } from "@material-ui/core";

function ItemList(props) {
  return (
    <Grid container>
      {props.list.map((item) => (
        <Grid container justify="center" key={item._id}>
          <Grid item xs={12} sm={8} lg={4} zeroMinWidth>
            {!props.templateCard && (
              <ItemCard
                itemId={item._id}
                handleClick={() => props.handleClick(item._id)}
                name={item.name}
                description={item.desc}
              />
            )}

            {props.templateCard && (
              <ItemCard
                itemId={item._id}
                handleClick={() => props.handleClick(item._id)}
                name={item.name}
                description={item.desc}
                templateCard
              />
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default ItemList;
