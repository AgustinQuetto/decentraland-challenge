import { Button } from "decentraland-ui";
import { useDispatch } from "react-redux";
import { initProvider } from "../../redux/actions";
import { LoginModal, LoginModalOptionType } from "decentraland-ui";

const Connect = ({ loading }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(initProvider());
  };

  return (
    <LoginModal loading={loading} open onClose={() => {}}>
      <LoginModal.Option
        type={LoginModalOptionType.METAMASK}
        onClick={onClick}
      />
    </LoginModal>
  );
};

export default Connect;
