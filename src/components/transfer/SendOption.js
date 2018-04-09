import React from "react";
import { injectIntl } from "react-intl";

const SendOption = ({ name, balance, intl }) => (
  <option value={balance}>
    {name} ({balance} {intl.formatMessage({ id: "available" })})
  </option>
);

export default injectIntl(SendOption);
