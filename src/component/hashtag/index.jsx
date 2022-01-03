import { useRecoilState } from 'recoil';
import { activeHashtagState } from '../../recoil/atoms';
import { Button } from 'antd';
import './index.scss';

function Hashtag(props) {
  // eslint-disable-next-line
  const [activeHashtag, setActiveHashtag] = useRecoilState(activeHashtagState);
  return (
    <Button
      type='primary'
      className='mainButton'
      onClick={() => setActiveHashtag(props.hashtag)}
    >
      {props.hashtag}
    </Button>
  );
}

export default Hashtag;
