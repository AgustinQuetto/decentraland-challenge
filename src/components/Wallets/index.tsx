import { connect, useDispatch } from "react-redux";
import { initProvider } from "../../redux/actions";

interface Props {
  provider?: any;
  wallets?: any;
}

const Wallets = ({ wallets, provider }: Props) => {
  const dispatch = useDispatch();
  console.log(provider);
  return <>Wallet</>;
};

const mapStateToProps = ({ wallets, provider }) => {
  return {
    wallets,
    provider,
  };
};

export default connect(mapStateToProps)(Wallets);
