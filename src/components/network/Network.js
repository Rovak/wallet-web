import React, {Component} from 'react';

export default class Network extends Component {

  render() {
    return (
      <main role="main" className="container">
        <div className="row">
          <div className="col-md">
            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-dark rounded box-shadow">
              <i class="fas fa-exchange-alt fa-3x mr-3"/>
              <div className="lh-100">
                <h6 className="mb-0 text-white lh-100">Transactions</h6>
                <small>Since 2011</small>
              </div>
            </div>

            <div className="my-3 p-3 bg-white rounded box-shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0">Recent transactions</h6>
              <div className="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" className="mr-2 rounded"/>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <strong className="d-block text-gray-dark">@username</strong>
                  Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                  condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
              </div>
              <div className="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=e83e8c&fg=e83e8c&size=1" alt="" className="mr-2 rounded"/>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <strong className="d-block text-gray-dark">@username</strong>
                  Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                  condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
              </div>
              <div className="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=6f42c1&fg=6f42c1&size=1" alt="" className="mr-2 rounded"/>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <strong className="d-block text-gray-dark">@username</strong>
                  Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                  condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
              </div>
              <small className="d-block text-right mt-3">
                <a href="#">All updates</a>
              </small>
            </div>
          </div>
          <div className="col-md">
            <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-dark rounded box-shadow">
              <i class="fas fa-cubes fa-3x mr-3"/>


              <div className="lh-100">
                <h6 className="mb-0 text-white lh-100">Blocks</h6>
                <small>Since 2011</small>
              </div>
            </div>

            <div className="my-3 p-3 bg-white rounded box-shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0">Recent blocks</h6>
              <div className="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" className="mr-2 rounded"/>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <strong className="d-block text-gray-dark">@username</strong>
                  Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                  condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
              </div>
              <div className="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=e83e8c&fg=e83e8c&size=1" alt="" className="mr-2 rounded"/>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <strong className="d-block text-gray-dark">@username</strong>
                  Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                  condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
              </div>
              <div className="media text-muted pt-3">
                <img data-src="holder.js/32x32?theme=thumb&bg=6f42c1&fg=6f42c1&size=1" alt="" className="mr-2 rounded"/>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <strong className="d-block text-gray-dark">@username</strong>
                  Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                  condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
              </div>
              <small className="d-block text-right mt-3">
                <a href="#">All updates</a>
              </small>
            </div>

          </div>
        </div>




      </main>
    )
  }
}


