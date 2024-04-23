// Redirect Link function
export const redirectLink = (group: any) => {
  const ministry_code = group?.ministry_code?.toLowerCase();
  const church_office = ministry_code === "church_office_ministry";
  const men_ministry = ministry_code === "mens_ministry";
  const music_ministry = ministry_code === "media_publication_ministry";
  const women_ministry = ministry_code === "womens_ministry";
  const marriage_counselling =
    ministry_code === "pre-marital-marriage-department";
  const prayer_ministry = ministry_code === "prayer_ministry";
  const evangelism = ministry_code === "evangelism_ministry";
  const choir_embassy = ministry_code === "embassy_choir_ministry";
  const drama_ministry = "drama_ministry";
  const connect_ministry = ministry_code === "connect_ministry";
  const wellness_ministry = ministry_code === "wellness_ministry";
  const young_adults = ministry_code === "young_adult";
  // const youth_ministry = ministry_code === "youth_ministry";
  const children_ministry = ministry_code === "children_ministry";
  // department links here
  const media_publication = ministry_code === "media_publication_ministry";
  const it_department = ministry_code === "it_department";
  const greeters_department = ministry_code === "greeters_department";
  const holy_police_department = ministry_code === "holy_police_deparment";
  const protocol_department = ministry_code === "protocol_department";
  const believers_department = ministry_code === "believers_membership";
  const ushering_department = ministry_code === "ushering_department";
  const sunday_school_department = ministry_code === "sunday_school_ministry";
  const technical_department = ministry_code === "technical_ministry";
  const transportation_department =
    ministry_code === "transportation_department";
  const public_relations = ministry_code === "public_relations_ministry";
  const follow_up_department = ministry_code === "follow_up_ministry";
  const sanitation_department = ministry_code === "sanitation_ministry";
  switch (ministry_code) {
    case "church_office_ministry":
      return "/ministry-departments/church-office-ministry";
    case "mens_ministry":
      return "/ministry-departments/men-ministry";
    case "media_publication_ministry":
      return "/ministry-departments/media-publication-ministry";
    case "womens_ministry":
      return "/ministry-departments/women-ministry";
    case "pre-marital-marriage-department":
      return "/ministry-departments/marriage-counselling";
    case "prayer_ministry":
      return "/ministry-departments/prayer-ministry";
    case "evangelism_ministry":
      return "/ministry-departments/evangelism-ministry";
    case "embassy_choir_ministry":
      return "/ministry-departments/choir-embassy";
    case "drama_ministry":
      return "/ministry-departments/drama-ministry";
    case "connect_ministry":
      return "/ministry-departments/connect-ministry";
    case "wellness_ministry":
      return "/ministry-departments/wellness-ministry";
    case "young_adult":
      return "/ministry-departments/young-adult";
    // case "youth_ministry":
    //   return "/ministry-departments/youth-ministry";
    case "children_ministry":
      return "/ministry-departments/children-ministry";
    case "media_publication_ministry":
      return "/ministry-departments/media-publication-ministry";
    case "it_department":
      return "/ministry-departments/it-ministry";
    case "greeters_department":
      return "/ministry-departments/greeters-ministry";
    case "holy_police_department":
      return "/ministry-departments/holy-police-ministry";
    case "protocol_department":
      return "/ministry-departments/protocol-ministry";
    case "believers_membership":
      return "/ministry-departments/believers-ministry";
    case "ushering_department":
      return "/ministry-departments/ushering-ministry";
    case "sunday_school_ministry":
      return "/ministry-departments/sunday-school-ministry";
    case "technical_ministry":
      return "/ministry-departments/technical-ministry";
    case "transportation_department":
      return "/ministry-departments/transportation-ministry";
    case "public_relations_ministry":
      return "/ministry-departments/public-relations-ministry";
    case "follow_up_ministry":
      return "/ministry-departments/follow-up-ministry";
    case "sanitation_ministry":
      return "/ministry-departments/sanitation-ministry";
    default:
      return `/not-found`;
  }
  // return `/ministry-departments/${ministry_code}`;
  // return `/ministry-departments/${
  //   church_office
  //     ? "church-office"
  //     : men_ministry
  //     ? "men-ministry"
  //     : music_ministry
  //     ? "music-ministry"
  //     : women_ministry
  //     ? "women-ministry"
  //     : marriage_counselling
  //     ? "marriage-counselling"
  //     : prayer_ministry
  //     ? "prayer-ministry"
  //     : evangelism
  //     ? "evangelism-ministry"
  //     : choir_embassy
  //     ? "choir-embassy"
  //     : drama_ministry
  //     ? "drama-ministry"
  //     : connect_ministry
  //     ? "connect-ministry"
  //     : wellness_ministry
  //     ? "wellness-ministry"
  //     : young_adults
  //     ? "young-adults"
  //     : children_ministry
  //     ? "children-ministry"
  //     : media_publication
  //     ? "media-publication"
  //     : it_department
  //     ? "it-department"
  //     : greeters_department
  //     ? "greeters-department"
  //     : holy_police_department
  //     ? "holy-police-department"
  //     : protocol_department
  //     ? "protocol-department"
  //     : believers_department
  //     ? "believers-department"
  //     : ushering_department
  //     ? "ushering-department"
  //     : sunday_school_department
  //     ? "sunday-school-department"
  //     : technical_department
  //     ? "technical-department"
  //     : transportation_department
  //     ? "transportation-department"
  //     : public_relations
  //     ? "public-relations"
  //     : follow_up_department
  //     ? "follow-up-department"
  //     : sanitation_department
  //     ? "sanitation-department"
  //     : "department"
  // }`;
};
