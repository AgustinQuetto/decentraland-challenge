import { connect, useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions";

//components
import { Modal, Close } from "decentraland-ui";

interface Props {
  alert: { open: boolean; title: string; content: string };
}

const Transfer = ({ alert: { open, title, content } }: Props) => {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(setAlert({ open: false, title: "", content: "" }));
  };

  return (
    <Modal size="small" open={open} closeIcon={<Close onClick={close} />}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{content}</Modal.Content>
    </Modal>
  );
};

const mapStateToProps = ({ app: { alert } }) => {
  return {
    alert,
  };
};

export default connect(mapStateToProps)(Transfer);
