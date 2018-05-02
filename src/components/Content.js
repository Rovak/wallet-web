import React, {Component} from 'react';
import {routes} from "../routes";
import {Link, Route, Switch} from "react-router-dom";
import {tu} from "../utils/i18n";
import {filter} from "lodash";


function Badge({value}) {
  return <span className="badge badge-pill bg-light align-text-bottom">{value}</span>;
}

export default class Content extends Component {

  render() {
    return (
      <Switch>
        {routes.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              render={props => (
              <React.Fragment>
                <div className="nav-scroller bg-white box-shadow">
                  <div className="container">
                    <nav className="nav nav-underline">
                      {
                        route.routes && filter(route.routes, r => r.showInMenu !== false).map(subRoute => {
                          return (
                            <Link
                              key={subRoute.path}
                              className="nav-link"
                              to={subRoute.path}>
                              {tu(subRoute.label)}
                              {subRoute.badge && <Badge value={subRoute.badge}/> }
                            </Link>
                          );
                        })
                      }
                      {
                        (route.search && props.location.pathname !== route.search.exclude)
                        && <Route component={() => <route.search.component placeholder={route.search.placeholder}/>}/>
                      }
                    </nav>
                  </div>
                </div>
                <Switch>
                  {
                    route.routes && route.routes.map(subRoute => (
                      <Route
                        exact={true}
                        key={subRoute.path}
                        path={subRoute.path}
                        component={subRoute.component} />
                    ))
                  }
                  <Route component={route.component}/>
                </Switch>

              </React.Fragment>
            )} />
          )
        })
        }
      </Switch>
    )
  }
}


