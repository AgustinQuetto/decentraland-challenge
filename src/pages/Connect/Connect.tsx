import { useDispatch } from "react-redux";
import { initProvider } from "../../redux/actions";
import { LoginModal, LoginModalOptionType } from "decentraland-ui";

const Connect = ({ loading }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(initProvider());
  };

  return (
    <LoginModal loading={loading} open>
      <LoginModal.Option
        type={LoginModalOptionType.METAMASK}
        onClick={onClick}
      />
    </LoginModal>
  );
};

export default Connect;
