import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

const VerifiedRoutes = () => {
  const navigate = useNavigate();
  const { role, isVerified } = useSelector((state) => state.auth);
  console.log("role", role);
  console.log("isVerified", isVerified);

  useEffect(() => {
    if (!isVerified) {
      navigate("/login");
    }
  }, [role, isVerified, navigate]);

  return role === "CUSTOMER" && isVerified ? (
    <Outlet />
  ) : (
    null
  );
};

export default VerifiedRoutes;
