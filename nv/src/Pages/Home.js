import { Nav } from '../Component/nav';
import { BooksDisplay } from '../Component/BooksDisplay';
import { useParams } from 'react-router-dom';

const Home = () => {

  const { userId ,username } = useParams();

  return (
    <div className="home">
      <Nav  userId={userId} username={username} ></Nav>
      <BooksDisplay userId={userId} username={username} ></BooksDisplay>
    </div>
  );
}

export default Home;
