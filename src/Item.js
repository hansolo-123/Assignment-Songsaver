import React from "react";

function Item({ item, clickItem }) {
  return (
    <li
      key={item.id}
      className="list-item"
      value={item.artist}
      onClick={clickItem}
      count={item.song}
    >
      <div>
        <h3>{item.artist}</h3>
      </div>{" "}
      <div>
        <h3>{item.song}</h3>
      </div>{" "}
      <div>
        <h3>{item.genre}</h3>
      </div>{" "}
      <div>
        <h3> {item.rating}</h3>
      </div>{" "}
    </li>
  );
}

export { Item };
