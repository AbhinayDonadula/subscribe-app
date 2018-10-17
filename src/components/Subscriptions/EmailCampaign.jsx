import React from 'react';

class EmailCampaign extends React.Component {
  state = {};

  render() {
    return (
      <div className="data-table data-table1">
        <ul className="list-unstyled list-inline">
          <li>
            <img
              alt=""
              src="img/add.jpg"
              className="img-responsive center-block"
            />
          </li>

          <li>
            Finally, e-mail campaigns <br /> that dont suck.
          </li>
          <li>
            <button type="button" className="btn btn_plan">
              Awesome Plans &amp; Pricing
            </button>
          </li>
          <li>
            <img alt="" src="img/final.jpg" className="img-resp final_img" />
          </li>
        </ul>
      </div>
    );
  }
}

export default EmailCampaign;
