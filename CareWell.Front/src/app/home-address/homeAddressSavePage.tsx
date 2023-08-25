import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  counter: number;
  setCounter: (type: string) => void;
}
export const HomeAddressSavePage: React.FC<Props> = ({ counter, setCounter }) => {
  return (
    <>
      Hello Save Page
      <button onClick={() => setCounter('add')}>SetCounter</button>
      <>Counter: {counter}</>
      <Link to={{ pathname: '/homeAddress/verify' }}>Verify</Link>
    </>
  );
};
