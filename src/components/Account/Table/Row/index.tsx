import { ethers } from "ethers";
import { History } from "../../../../types";
import { Table, Blockie, Popup } from "decentraland-ui";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Props {
  index: number;
  history: History;
}

const Row = ({ index, history }: Props) => {
  const {
    value,
    gasPrice,
    gasLimit,
    blockHash,
    method,
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
      <Table.Cell>
        <Popup
          content={blockHash}
          position="left center"
          trigger={<span>{blockHash}</span>}
          on="click"
        />
      </Table.Cell>
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
