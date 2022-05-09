import React from 'react'
import { useParams } from "react-router-dom";
export default function ProductDetails() {

    let params = useParams();

  return (
    <div>{params.slug}</div>
  )
}
