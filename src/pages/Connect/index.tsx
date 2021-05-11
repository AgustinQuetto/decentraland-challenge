import { Button } from "decentraland-ui";
import { useDispatch } from "react-redux";
import { initProvider } from "../../redux/actions";

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
