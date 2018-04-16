import React from "react";
import * as Spinners from "react-spinners";

const DEFAULT_COLOR = "#343a40";

export function BarLoader(props = {}) {
  return (
    <Spinners.BarLoader color={DEFAULT_COLOR} loading={true} height={5} width={150} {...props} />
  )
}

export function PropagateLoader(props = {}) {
  return (
    <Spinners.PropagateLoader color={DEFAULT_COLOR} size={20} {...props} />
  )
}
