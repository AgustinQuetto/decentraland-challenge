import "./Accounts.css";
import React, { FC, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getAccounts, transferToggle } from "../../redux/actions";
import { Link } from "react-router-dom";

//components
import {
  Header,
  Card,
  Field,
  Button,
  Icon,
  Blockie,
  Loader,
  Section,
  Column,
  Narrow,
  Row,
} from "decentraland-ui";

type Props = {
  accounts: [string];
  balances: { [key: string]: number };
  signer: any;
};

type State = {
  address?: string;
};

const Accounts: FC<Props> = ({ accounts, balances, signer }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState<State>({});

  useEffect(() => {
    dispatch(getAccounts(true));
  }, [dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const transfer = (account) => {
    dispatch(transferToggle(account));
  };

  return (
    <>
      <Section>
        <Column>
          <Narrow>
            <Row stacked>
              <Column>
                <Row>
                  <Header size="large">Your selected account</Header>
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
                <div key={index}>
                  <Link to={`/account/${account}`}>
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
                  <Button basic onClick={() => transfer(account)}>
                    <Icon name="money" />
                    Transfer
                  </Button>
                  <Link to="/contracts/token">
                    <Button basic>
                      <Icon name="play" />
                      Execute contract
                    </Button>
                  </Link>
                </div>
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
