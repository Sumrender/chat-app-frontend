import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Loading } from "..";

export default function ProtectedRoute({ children }) {
  let { currentUser, loading } = useContext(UserContext);
  const [isUserPresent, setIsUserPresent] = useState(false);
  console.log("pro route");
  console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      setIsUserPresent(true);
    }
  }, [currentUser]);

  const handleRoute = () => {
    return (
      <>
        {loading ? (
          <Loading />
        ) : isUserPresent ? (
          console.log("Courses Found")
        ) : (
          // <Navigate to="/login" />
          <h1>User Not Present</h1>
        )}
      </>
    );
  };
}
