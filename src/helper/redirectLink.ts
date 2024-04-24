// Redirect Link function
export const redirectLink = (group: any) => {
  const ministry_code = group?.ministry_code?.toLowerCase();
  //
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
    case "teenage_ministry":
      return "/ministry-departments/teenage-ministry";
    default:
      return `/not-found`;
  }
};
