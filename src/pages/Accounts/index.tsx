import "./Accounts.css";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { getAccounts } from "../../redux/actions";
import { Link } from "react-router-dom";
//components
import {
  Container,
  HeaderMenu,
  Header,
  Card,
  Field,
  Button,
  Icon,
  Blockie,
  Loader,
  Section,
  Column,
  Back,
  Narrow,
  Row,
  Badge,
  Dropdown,
  Empty,
  Color,
} from "decentraland-ui";

interface Props {
  provider?: any;
  wallets?: any;
  signer?: any;
  accounts: [];
  balances: { [key: string]: number };
}

interface State {
  address?: string;
}

const Accounts = ({ provider, signer, accounts, balances }: Props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState<State>({});

  useEffect(() => {
    dispatch(getAccounts(true));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Section>
        <Column>
          <Narrow>
            <Row stacked>
              <Column>
                <Row>
                  <Header size="large">Your accounts</Header>
                </Row>
              </Column>
              <Column align="right">
                <Row align="right">
                  <Field
                    label="Another address"
                    type="address"
                    name="address"
                    value={state.address}
                    onChange={onChange}
                  />
                  <Link to={`/account/${state.address}`}>
                    <Button basic>
                      <Icon name="search" />
                      Search
                    </Button>
                  </Link>
                </Row>
              </Column>
            </Row>
          </Narrow>
        </Column>
      </Section>
      <Narrow>
        <Section>
          <Card.Group>
            {accounts.map((account, index) => {
              const balance = balances[account];
              return (
                <Link to={`/account/${account}`} key={index}>
                  <Card link>
                    <Card.Content>
                      <Card.Header>
                        {account && <Blockie seed={account} scale={3} />}
                        {account}
                      </Card.Header>
                      <Card.Meta>
                        Balance {balance ? balance : <Loader active />} ETH
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                </Link>
              );
            })}
          </Card.Group>
        </Section>
      </Narrow>
    </>
  );
};

const mapStateToProps = ({ app: { provider, signer, accounts, balances } }) => {
  return {
    provider,
    signer,
    accounts,
    balances,
  };
};

export default connect(mapStateToProps)(Accounts);
