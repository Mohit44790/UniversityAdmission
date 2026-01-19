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
   <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg border">
         {/* Header */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Profile Details
          </h2>
          <p className="text-sm text-gray-500">
            Your basic personal information
          </p>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          
        </div>
      </div>
    </div>
    
  );
};

export default Profile;
