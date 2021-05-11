import "./Accounts.css";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getAccounts } from "../../redux/actions";
//components
import {
  Container,
  HeaderMenu,
  Header,
  Button,
  Icon,
  Card,
  Mana,
} from "decentraland-ui";

interface Props {
  provider?: any;
  wallets?: any;
  signer?: any;
  accounts: [];
  balance: { [key: string]: number };
}

const Accounts = ({ provider, signer, accounts, balance }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  return (
    <Container>
      <HeaderMenu>
        <HeaderMenu.Left>
          <Header>Accounts</Header>
        </HeaderMenu.Left>
      </HeaderMenu>
      <Card.Group>
        {accounts.map((accounts, index) => (
          <Card link key={index}>
            <Card.Content>
              <Card.Header>{accounts}</Card.Header>
              <Card.Meta>Balance</Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

const mapStateToProps = ({ app: { provider, signer, accounts, balance } }) => {
  return {
    provider,
    signer,
    accounts,
    balance,
  };
};

export default connect(mapStateToProps)(Accounts);
