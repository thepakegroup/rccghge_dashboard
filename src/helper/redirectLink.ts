// Redirect Link function
export const redirectLink = (group: any) => {
  const ministry_code = group?.ministry_code?.toLowerCase();
  //
  const commone_one_pages = [
    "pre-marital-marriage-department",
    "believers_membership",
    "protocol_department",
    "greeters_department",
    "holy_police_deparment",
    "ushering_department",
    "media_publication_ministry",
    "it_department",
    "public_relations_ministry",
    "evangelism_ministry",
    "womens_ministry",
    "embassy_choir_ministry",
    "sunday_school_ministry",
    "sanitation_ministry",
    "connect_ministry",
    "transportation_department",
    "follow_up_ministry",
    "hospitality_care_department",
    "elders_minstry",
    "mens_ministry",
    "music_ministry",
  ];
  //
  const commone_two_pages = ["church_office_ministry", "technical_ministry"];
  //
  if (commone_one_pages.includes(ministry_code))
    return `/ministry-departments/1/${ministry_code}`;
  if (commone_two_pages.includes(ministry_code))
    return `/ministry-departments/2/${ministry_code}`;
  return `/ministry-departments/${ministry_code}`;
};
