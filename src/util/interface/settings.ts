export interface settingI {
  id: number;
  name: string;
  value: string;
  onEditClick?: () => void;
}

export interface IAmNewPage {
  settings: IAmNewPageSettings;
  slides: Slide[];
}

export interface IAmNewPageSettings {
  id: number;
  page_name: string;
  settings: SettingsSettings;
}

export interface SettingsSettings {
  heading_text: string;
  description_text: string;
  our_service_times: string;
  our_upcoming_events: string;
  our_mission_vision: string;
  our_ministries: string;
  give_section: {
    give_header_text: string;
    give_subheading: string;
    give_bg_image: string;
  };
  subheading_text: string;
  subheading_description_text: any;
  arrivalAndParking: any;
  worshipExperience: any;
  pageVideoLink: {
    url: string;
  };
  blueBannerContent: {
    body: string;
  };
  wednesdayBibleStudy: {
    adultText: string;
    nextGenYouthText: string;
    nextGenKidText: string;
  };
  sundayServices: {
    adultsText: string;
    adultYoutubeLink: string;
    onlineChurchLink: string;
    nextGenYouthText: string;
    nextGenYoutubeLink: string;
    nextGenKidsText: string;
    pageImage: string;
    //
    hgeSeedsText: string;
    teenagersChapelText: string;
    nextImpactServiceText: string;
  };
}

export interface sundayServicesType {
  section?: string;
  adultsText: string;
  adultYoutubeLink: string;
  onlineChurchLink: string;
  nextGenYouthText: string;
  nextGenYoutubeLink: string;
  nextGenKidsText: string;
  pageImage?: string;
  //
  hgeSeedsText: string;
  teenagersChapelText: string;
  nextImpactServiceText: string;
}

export interface Slide {
  id: number;
  image_url: string;
  target_page: string;
  order: number;
}
