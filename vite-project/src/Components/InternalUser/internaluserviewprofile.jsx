import "./internaluserviewprofile.scss";
import Dashboard from "../Dashboard/dashboard";

const InternalUserViewProfile = (props) => {
  console.log(props.user_details);
  return (
    <>
      <Dashboard role="internaluser" />
      <div>Profile</div>;
    </>
  );
};

export default InternalUserViewProfile;
