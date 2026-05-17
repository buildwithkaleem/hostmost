import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { api } from "../lib/api";

import {
  setUser,
  setLoading,
} from "../redux/user/userSlice";

const useUser = () => {

  const dispatch = useDispatch();

  const { user, loading } = useSelector(
    (state) => state.user
  );

  const [error, setError] = useState("");

  const getUser = async () => {
    try {

      dispatch(setLoading(true));

      const res = await api("/auth/me");

      dispatch(setUser(res.data));

    } catch (err) {

      setError(err.message || "Failed to fetch user");

    } finally {

      dispatch(setLoading(false));

    }
  };

  useEffect(() => {

    if (!user) {
      getUser();
    }

  }, []);

  return {
    user,
    loading,
    error,
    refetch: getUser,
  };
};

export default useUser;