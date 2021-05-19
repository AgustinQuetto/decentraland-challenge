import { FC } from "react";
import { ethers } from "ethers";
import { IHistory } from "../../../../interfaces";
import { Table, Blockie } from "decentraland-ui";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type Props = {
  index: number;
  history: IHistory;
};

const Row: FC<Props> = ({ index, history }) => {
  const {
    value,
    gasPrice,
    gasLimit,
    blockHash,
    blockNumber,
    timestamp,
    from,
    to,
  } = history;

  const _value = ethers.utils.formatEther(value);
  const _gasPrice = gasPrice ? ethers.utils.formatEther(gasPrice) : "unknown";
  const _gasLimit = gasPrice ? ethers.utils.formatEther(gasLimit) : "unknown";

  return (
    <Table.Row key={index}>
      <Table.Cell>{blockHash}</Table.Cell>
      <Table.Cell>{blockNumber}</Table.Cell>
      <Table.Cell>
        {timestamp ? dayjs.unix(timestamp).fromNow() : ""}
      </Table.Cell>
      <Table.Cell>
        {from && <Blockie seed={from} scale={3} />}
        {from}
      </Table.Cell>
      <Table.Cell>
        {to && <Blockie seed={to} scale={3} />}
        {to}
      </Table.Cell>
      <Table.Cell>{_value.toString()} Ether</Table.Cell>
      <Table.Cell>{_gasPrice} Ether</Table.Cell>
      <Table.Cell>{_gasLimit} Ether</Table.Cell>
    </Table.Row>
  );
};

export default Row;
