import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const userId = useSelector((state) => state.user?._id); // Using optional chaining
  const isAuth = Boolean(useSelector((state) => state.token));
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getUser = async () => {
      // Check if the user is authenticated and token exists
      if (!isAuth || !token || !userId) {
        setUser(null); // Reset user state if not authenticated, token doesn't exist, or userId is null
        return;
      }

      // Check if user data is already available in state
      if (user) return;

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, [userId, token, user, isAuth]); // Fetch user data only when userId, token, user state, or isAuth changes

  return user;
};

export default UserInfo;