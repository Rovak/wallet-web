import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { tu } from "../../utils/i18n";
import { Alert } from "reactstrap";
import { FormattedNumber, injectIntl } from "react-intl";
import Validator from "validatorjs";
import moment from "moment";

const validate = (values, props) => {
  const { intl } = props;

  Validator.register(
    "check_box_invalid",
    (value) => value === true,
    intl.formatMessage({ id: "check_box_invalid" })
  );

  Validator.register(
    "start_past_date_invalid",
    (value) => moment(value).isAfter(
        moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
    ),
    intl.formatMessage(
      { id: "start_past_date_invalid" },
      { startDate: intl.formatMessage({ id: "start_date" }) }
    )
  );

  Validator.register(
    "end_past_date_invalid",
    (value) => moment(value).isAfter(values.startTime),
    intl.formatMessage(
      { id: "end_past_date_invalid" },
      {
        startDate: intl.formatMessage({ id: "start_date" }),
        endDate: intl.formatMessage({ id: "end_date" })
      }
    )
  );

  const rules = {
    name: "required",
    totalSupply: "required|min:1",
    num: "required|min:1",
    trxNum: "required|min:1",
    startTime: "required|date|start_past_date_invalid",
    endTime: "required|date|end_past_date_invalid",
    description: "required",
    url: "required|url",
    confirmed: "check_box_invalid"
  };

  const messages = {
    required: intl.formatMessage({ id: "required_invalid" }, { title: ":attribute" }),
    min: intl.formatMessage({ id: "min_invalid" }, { title: ":attribute", min: ":min" }),
    date: intl.formatMessage({ id: "date_invalid" }, { title: ":attribute" }),
    url: intl.formatMessage({ id: "url_invalid" }, { title: ":attribute" })
  };

  const validator = new Validator(values, rules, messages);

  validator.setAttributeNames({
    name: intl.formatMessage({ id: "name_of_the_token" }),
    totalSupply: intl.formatMessage({ id: "total_supply" }),
    num: intl.formatMessage({ id: "token" }) + intl.formatMessage({ id: "amount" }),
    trxNum: "TRX" + intl.formatMessage({ id: "amount" }),
    startTime: intl.formatMessage({ id: "start_date" }),
    endTime: intl.formatMessage({ id: "end_date" }),
    description: intl.formatMessage({ id: "description" }),
    url: intl.formatMessage({ id: "url" })
  });

  validator.passes();
  return validator.errors.all();
};

const renderInputField = ({
  input,
  type,
  label,
  className = "form-control",
  meta: { touched, error, warning }
}) => (
  <Fragment>
    {type !== "checkbox" && <label>{label}</label>}
    <div>
      <input
        {...input}
        type={type}
        className={className + (touched && error ? " is-invalid" : "")}
      />
      {type === "checkbox" && (
        <label className="form-check-label" style={{ marginBottom: 0 }}>
          {label}
        </label>
      )}
      {touched && (
        (error && <span className="invalid-feedback">{error}</span>)
        || (warning && <span>{warning}</span>)
      )}
    </div>
  </Fragment>
);

class TokenForm extends Component {
  render() {
    const {
      handleSubmit,
      submitting,
      isTokenCreated,
      intl,
      values
    } = this.props;

    const {name, trxNum, num} = values;
    let exchangeRate = trxNum / num;
    let isValid = this.props.isValid(values);

    return (
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>{tu("details")}</legend>
          <div className="form-row">
            <div className="form-group col-md-6">
              <Field
                type="text"
                name="name"
                component={renderInputField}
                label={intl.formatMessage({ id: "token_name" })}
              />
            </div>
            <div className="form-group col-md-6">
              <Field
                type="number"
                name="totalSupply"
                parse={v => Number(v)}
                component={renderInputField}
                label={intl.formatMessage({ id: "total_supply" })}
              />
              <small className="form-text text-muted">
                Total amount of tokens which will be in circulation
              </small>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <Field
                type="text"
                name="description"
                component={renderInputField}
                label={intl.formatMessage({ id: "description" })}
              />
              <small className="form-text text-muted">
                A short description of the purpose of the token
              </small>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <Field
                type="text"
                name="url"
                placeholder="http://"
                component={renderInputField}
                label={intl.formatMessage({ id: "url" })}
              />
              <small className="form-text text-muted">
                A website where users can find more information about the token
              </small>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>{tu("exchange_rate")}</legend>
          <div className="form-row text-muted">
            <p className="col-md-12">
              Specify the price of a single token by defining how many tokens a
              participant will receive for every TRX they spend.
            </p>
            <p className="col-md-12">
              Participants will receive{" "}
              <b>
                {<FormattedNumber value={num} />} {name || tu("token")}
              </b>&nbsp; for every{" "}
              <b>{<FormattedNumber value={trxNum} />} TRX</b>.
            </p>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <Field
                type="number"
                name="trxNum"
                parse={v => Number(v)}
                component={renderInputField}
                label={["TRX", intl.formatMessage({ id: "amount" })]}
              />
            </div>
            <div className="form-group col-md-6">
              <Field
                type="number"
                name="num"
                parse={v => Number(v)}
                component={renderInputField}
                label={[
                  intl.formatMessage({ id: "token" }),
                  intl.formatMessage({ id: "amount" })
                ]}
              />
            </div>
          </div>
          <div className="form-row">
            <p className="col-md-12">
              <b>{tu("token_price")}</b>: 1 {name || tu("token")} ={" "}
              {<FormattedNumber value={exchangeRate} />} TRX
            </p>
          </div>
        </fieldset>

        <fieldset>
          <legend>{tu("participation")}</legend>

          <div className="form-row text-muted">
            <p className="col-md-12">
              Specify the participation period in which tokens will be issued.
              During the participation period users can exchange TRX for {name}{" "}
              tokens.
            </p>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <Field
                type="datetime-local"
                name="startTime"
                component={renderInputField}
                label={intl.formatMessage({ id: "start_date" })}
              />
            </div>
            <div className="form-group col-md-6">
              <Field
                type="datetime-local"
                name="endTime"
                component={renderInputField}
                label={intl.formatMessage({ id: "end_date" })}
              />
            </div>
          </div>
        </fieldset>

        <div className="form-group">
          <div className="form-check">
            <Field
              type="checkbox"
              name="confirmed"
              className="form-check-input"
              parse={v => Boolean(v)}
              component={renderInputField}
              label={intl.formatMessage({ id: "token_spend_confirm" })}
            />
          </div>
        </div>

        {isTokenCreated ? (
          <Alert color="success" className="text-center">
            Token successfully issued
          </Alert>
        ) : (
          <div className="text-center">
            <button
              disabled={!isValid || submitting}
              type="submit"
              className="btn btn-success"
            >
              {tu("issue_token")}
            </button>
          </div>
        )}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  values: state.form.token.values
});

TokenForm = connect(mapStateToProps)(injectIntl(TokenForm));

export default reduxForm({
  form: "token",
  touchOnBlur: false,
  touchOnChange: true,
  validate
})(TokenForm);
