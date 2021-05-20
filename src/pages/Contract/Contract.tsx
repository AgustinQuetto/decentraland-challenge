import "./Contract.css";
import { FC, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getAccounts } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import contracts from "../../contracts";

//components
import {
  Header,
  Button,
  Icon,
  Section,
  Column,
  Narrow,
  Row,
} from "decentraland-ui";

type Props = {
  accounts: [string];
  balances: { [key: string]: number };
  signer: any;
  provider: any;
};

/* type State = {
  address?: string;
};
 */
const Contract: FC<Props> = ({ accounts, signer }) => {
  const dispatch = useDispatch();
  /* const [state, setState] = useState<State>({}); */
  const [contract, setContract] = useState<any>({});
  /* const [contractData, setContractData] = useState({}); */
  const { name } = useParams();

  useEffect(() => {
    dispatch(getAccounts(true));

    const contractData = contracts[name];
    /* setContractData(contractData); */

    const contract = new ethers.Contract(
      contractData.address,
      contractData.abi,
      signer
    );
    setContract(contract);
  }, [dispatch, name, signer]);

  /* const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }; */

  /* const execute = (name, args) => {
    const calls = {
      token: (address, amount) => {}
    }
  }; */

  const execute = async () => {
    const amount = prompt("Amount to transfer");
    const account = accounts[0];
    try {
      const contractExecuted = await contract.transfer(account, amount);
      alert("Execution success");
      console.log(contractExecuted);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Section>
      <Column>
        <Narrow>
          <Row stacked>
            <Column>
              <Row>
                <Header size="large">Contract: {name}</Header>
              </Row>
            </Column>
            <Column align="right">
              <Row align="right">
                <Button basic onClick={execute}>
                  <Icon name="play" />
                  Execute contract: token
                </Button>
              </Row>
            </Column>
          </Row>
        </Narrow>
      </Column>
    </Section>
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

export default connect(mapStateToProps)(Contract);
