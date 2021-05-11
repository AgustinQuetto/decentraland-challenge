import { initProvider } from "../../redux/actions";

import { useDispatch } from "react-redux";
import { Button } from "decentraland-ui";

const Connect = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(initProvider());
  };

  return (
    <Button primary onClick={onClick}>
      Connect
    </Button>
  );
};

export default Connect;
