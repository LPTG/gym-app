import React from "react";

const styles = {
  li: {
    display: "flex",
    justifyContent: "flex-start",
    background: "white",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
    color: "#707070",
    marginBottom: "1em",
    cursor: "pointer",
  },
};

class ListItem extends React.PureComponent {
  render() {
    return (
      <li style={styles.li} onClick={() => this.props.handleOnClick(this.props.id)}>
        {this.props.children}
      </li>
    );
  }
}

export default ListItem;
