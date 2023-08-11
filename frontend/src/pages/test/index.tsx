import axios from 'axios';
import type { NextPage } from 'next';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  return (
    <>
      <button
        onClick={async () => {
          const res = await axios.post(
            'http://localhost:8080/api/login_with_tid',
            {
              tid: 'xxxxxxxx',
            }
          );
          console.log(res);
        }}
      >
        JUMP
      </button>
    </>
  );
};

export default Home;
