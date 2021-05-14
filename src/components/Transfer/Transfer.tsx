import "./Transfer.css";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { transferToggle } from "../../redux/actions";

//components
import { Modal, Button, Field } from "decentraland-ui";
import { sendTransaction } from "../../redux/actions";

interface State {
  amount: string;
  from: string;
  to: string;
}

const defaultState = {
  amount: "",
  from: "",
  to: "",
};

const Transfer = ({ transferOpen, transfer, balances, messages }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState<State>({ ...defaultState });
  const { from } = transfer;
  const { to, amount } = state;

  //Error control begins
  const amountError = amount > balances[from] || parseInt(amount) < 0;

  const errors = {
    amountError: amountError,
    canConfirm: from && to && amount && !amountError,
    invalidTo: false,
    externalError: false,
  };

  const mtValue = messages?.transaction?.value;
  if (mtValue) {
    if (mtValue.startsWith("Invalid transaction value"))
      errors.amountError = true;
    else if (mtValue.startsWith('Invalid "to" address.')) {
      errors.invalidTo = true;
    } else if (mtValue) {
      errors.externalError = messages.transaction.value;
    }
  }
  //End error handling

  useEffect(() => {
    setState({ ...defaultState, ...transfer });
  }, [transferOpen, transfer]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const _toggle = () => {
    setState({ ...defaultState });
    dispatch(transferToggle("", ""));
  };

  const send = () => {
    dispatch(sendTransaction({ to, amount }));
  };

  return (
    <Modal size="small" open={transferOpen}>
      <Modal.Header>TRANSFER</Modal.Header>
      <Modal.Content>
        <Field
          label="From"
          placeholder="Your address"
          type="address"
          disabled
          value={from}
        />
        <Field
          name="to"
          label="To"
          placeholder="destinatation address"
          type="address"
          value={state.to}
          onChange={onChange}
          error={errors.invalidTo}
          message={errors.invalidTo ? "Invalid destinatary address." : ""}
        />
        <Field
          name="amount"
          label="Amount"
          placeholder="0"
          type="number"
          value={state.amount}
          onChange={onChange}
          error={errors.amountError}
          message={errors.amountError ? "Invalid amount." : ""}
        />{" "}
        <p className="error-message">{errors.externalError}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button primary disabled={!errors.canConfirm} onClick={send}>
          Submit
        </Button>
        <Button onClick={_toggle}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = ({
  app: { accounts, balances, transfer, transferOpen, messages },
}) => {
  return {
    accounts,
    balances,
    transfer,
    transferOpen,
    messages,
  };
};

export default connect(mapStateToProps)(Transfer);
