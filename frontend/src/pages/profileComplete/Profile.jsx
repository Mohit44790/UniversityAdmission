import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../../redux/slices/profileSlice";



const Profile = () => {
  const dispatch = useDispatch();
  const {profile ,loading ,error} = useSelector((state)=> state.profile);

  useEffect(()=>{
    if(!profile){
      dispatch(fetchStudentProfile());
    }
  },[dispatch,profile]);

   if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  if(error){
    return(
      <div className="p-6 text-center text-red-600">
        Failed to load profile
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="p-6 text-center text-gray-500">
        No profile data available
      </div>
    );
  }


  return (
    <div>
          profile complete page
    </div>
    
  );
};

export default Profile;
