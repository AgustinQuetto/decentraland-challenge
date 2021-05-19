import { FC } from "react";
import { useDispatch } from "react-redux";
import { initProvider } from "../../redux/actions";
import { LoginModal, LoginModalOptionType } from "decentraland-ui";

type Props = {
  loading: boolean;
};

const Connect: FC<Props> = ({ loading }) => {
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
