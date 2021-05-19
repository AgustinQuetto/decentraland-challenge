import { FC } from "react";
import { connect, useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions";

//components
import { Modal, Close } from "decentraland-ui";

type Props = {
  alert: {
    open: boolean;
    title: string;
    content: string;
    customClose: () => {};
  };
};

const Transfer: FC<Props> = ({
  alert: { open, title, content, customClose },
}) => {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(setAlert({ open: false, title: "", content: "" }));
    customClose();
  };

  return (
    <Modal size="small" open={open} closeIcon={<Close onClick={close} />}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        {content.split("\n").map((c) => (
          <p>{c}</p>
        ))}
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = ({ app: { alert } }) => {
  return {
    alert,
  };
};

export default connect(mapStateToProps)(Transfer);
