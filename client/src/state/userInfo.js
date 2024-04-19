import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


const UserInfo = () => {
  const [user, setUser ] = useState(null);
  // const state = useSelector((state) => state);
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  
  useEffect(() => {
    getUser();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
  return user

}

export default UserInfo