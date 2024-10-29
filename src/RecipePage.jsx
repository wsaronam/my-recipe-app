import React, { useRef, useState } from 'react';

export default function RecipePage(props) {
    return (
      <div>
        <h1>{props.title}</h1>
        <img src={props.image} alt="" />
        <h2>{props.summary}</h2>
      </div>
    );
  }