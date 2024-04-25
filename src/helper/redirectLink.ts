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
  ];
  //
  const commone_two_pages = ["church_office_ministry", "technical_ministry"];
  //
  if (commone_one_pages.includes(ministry_code))
    return `/ministry-departments/1/${ministry_code}`;
  if (commone_two_pages.includes(ministry_code))
    return `/ministry-departments/2/${ministry_code}`;
  return `/ministry-departments/${ministry_code}`;
  //
  // switch (ministry_code) {
  //   case "church_office_ministry":
  //     return "/ministry-departments/church-office-ministry";
  //   case "mens_ministry":
  //     return "/ministry-departments/men-ministry";
  //   case "media_publication_ministry":
  //     return "/ministry-departments/media-publication-ministry";
  //   case "womens_ministry":
  //     return "/ministry-departments/women-ministry";
  //   case "pre-marital-marriage-department":
  //     return "/ministry-departments/marriage-counselling";
  //   case "prayer_ministry":
  //     return "/ministry-departments/prayer-ministry";
  //   case "evangelism_ministry":
  //     return "/ministry-departments/evangelism-ministry";
  //   case "embassy_choir_ministry":
  //     return "/ministry-departments/choir-embassy";
  //   case "drama_ministry":
  //     return "/ministry-departments/drama-ministry";
  //   case "connect_ministry":
  //     return "/ministry-departments/connect-ministry";
  //   case "wellness_ministry":
  //     return "/ministry-departments/wellness-ministry";
  //   case "young_adult":
  //     return "/ministry-departments/young-adult";
  //   // case "youth_ministry":
  //   //   return "/ministry-departments/youth-ministry";
  //   case "children_ministry":
  //     return "/ministry-departments/children-ministry";
  //   case "media_publication_ministry":
  //     return "/ministry-departments/media-publication-ministry";
  //   case "it_department":
  //     return "/ministry-departments/it-ministry";
  //   case "greeters_department":
  //     return "/ministry-departments/greeters-ministry";
  //   case "holy_police_department":
  //     return "/ministry-departments/holy-police-ministry";
  //   case "protocol_department":
  //     return "/ministry-departments/protocol-ministry";
  //   case "believers_membership":
  //     return "/ministry-departments/believers-ministry";
  //   case "ushering_department":
  //     return "/ministry-departments/ushering-ministry";
  //   case "sunday_school_ministry":
  //     return "/ministry-departments/sunday-school-ministry";
  //   case "technical_ministry":
  //     return "/ministry-departments/technical-ministry";
  //   case "transportation_department":
  //     return "/ministry-departments/transportation-ministry";
  //   case "public_relations_ministry":
  //     return "/ministry-departments/public-relations-ministry";
  //   case "follow_up_ministry":
  //     return "/ministry-departments/follow-up-ministry";
  //   case "sanitation_ministry":
  //     return "/ministry-departments/sanitation-ministry";
  //   case "teenage_ministry":
  //     return "/ministry-departments/teenage-ministry";
  //   default:
  //     return `/not-found`;
  // }
  //
  // second method
  //
  // const link = ministry_code
  //   ? `/ministry-departments/${ministry_code}`
  //   : `/not-found`;
  // return link;
  //
};
