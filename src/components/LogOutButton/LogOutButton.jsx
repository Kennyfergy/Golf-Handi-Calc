import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function LogOutButton(props) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT" });
      }
    });
  };

  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
