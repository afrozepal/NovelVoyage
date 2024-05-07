import { Nav } from '../Component/nav';
import { useParams } from 'react-router-dom';
import {Mysavedbooks} from '../Component/mysavedbooks'

const Library = () => {

  const { userId ,username } = useParams();

  return (
    <div>
      <Nav username={username} ></Nav>
      <Mysavedbooks userId={userId} username={username} ></Mysavedbooks>
    </div>
  );
}

export default Library;
