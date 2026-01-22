export const getProfileSteps = (profile) => {
  return [
    {
      key: "profile",
      label: "Profile",
      completed: Boolean(
        profile?.fullName &&
        profile?.dateOfBirth &&
        profile?.alternateMobile
      ),
    },
    {
      key: "bank",
      label: "Bank",
      completed: Boolean(
        profile?.bank_detail?.accountNumber &&
        profile?.bank_detail?.ifsc
      ),
    },
    {
      key: "family",
      label: "Family",
      completed: Boolean(profile?.family_details),
    },
    {
      key: "other",
      label: "Others",
      completed: Boolean(profile?.other_details),
    },
    {
      key: "documents",
      label: "Documents",
      completed: Boolean(profile?.documents?.length > 0),
    },
  ];
};
