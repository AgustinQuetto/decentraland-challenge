import "./Account.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBalance, getHistory, transferToggle } from "../../redux/actions";
import { connect, useDispatch } from "react-redux";
import { History } from "../../types";
//components
import {
  Header,
  Blockie,
  Table,
  Empty,
  Section,
  Column,
  Narrow,
  Row,
  Badge,
  Icon,
  Button,
  Color,
} from "decentraland-ui";
import AccountTableRow from "../../components/Account/Table/Row";

interface Props {
  accounts: [string];
  balances: { [key: string]: string };
  history: { [key: string]: [History] };
}

const Account = ({ accounts, balances, history }: Props) => {
  const dispatch = useDispatch();
  const { address } = useParams();
  const addressHistory = history[address] || [];

  useEffect(() => {
    dispatch(getHistory(address));
    dispatch(getBalance(address));
  }, [address, dispatch]);

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
                  <Blockie seed={address} />
                  <Header>{address}</Header>
                  <Badge color={Color.SUMMER_RED}>
                    <Icon name="point" />
                    {balances[address]}
                  </Badge>
                </Row>
              </Column>
              {accounts.includes(address) && (
                <Column align="right">
                  <Row align="right">
                    <Button basic onClick={() => transfer(address)}>
                      Transfer
                    </Button>
                  </Row>
                </Column>
              )}
            </Row>
          </Narrow>
        </Column>
      </Section>
      <Narrow>
        <Section size="tiny">
          <Row height={32}>
            <Column>
              <Row>
                <Header sub>Transactions</Header>
              </Row>
            </Column>
          </Row>
        </Section>
        {addressHistory.length ? (
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Txn Hash</Table.HeaderCell>
                <Table.HeaderCell>Block</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>From</Table.HeaderCell>
                <Table.HeaderCell>To</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
                <Table.HeaderCell>Gas price</Table.HeaderCell>
                <Table.HeaderCell>Gas limit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {addressHistory.map((history: History, index) => (
                <AccountTableRow index={index} history={history} />
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Empty height={80}>Without transactions...</Empty>
        )}
      </Narrow>
    </>
  );
};

const mapStateToProps = ({
  app: { provider, signer, accounts, balances, history },
}) => {
  return {
    provider,
    signer,
    accounts,
    balances,
    history,
  };
};

export default connect(mapStateToProps)(Account);
