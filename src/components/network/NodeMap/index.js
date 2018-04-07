import React from "react";
import {asyncComponent} from "react-async-component";
import {PropagateLoader} from "react-spinners";

export default asyncComponent({
  LoadingComponent: () => (
    <div className="col-sm-12 col-md-8 d-flex justify-content-center p-5">
      <PropagateLoader  color="#343a40" size={20} />
    </div>
  ),
  resolve: () => new Promise(resolve =>
    // Webpack's code splitting API w/naming
    require.ensure(
      [
        "script-loader!echarts/dist/echarts.js",
        "script-loader!../../../lib/world.js",
      ],
      (require) => {
        resolve(require('./NodeMap'));
      },
      'NodeMap'
    )
  )
});
