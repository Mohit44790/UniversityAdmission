import { useDispatch, useSelector } from "react-redux";



const Profile = () => {
  const dispatch = useDispatch();
  const {profile ,loading ,error} = useSelector((state)=> state.profile);


  return (
    <div>
          profile complete page
    </div>
    
  );
};

export default Profile;
