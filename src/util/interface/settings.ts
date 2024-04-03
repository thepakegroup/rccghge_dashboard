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
  our_service_times: string;
  our_upcoming_events: string;
  our_mission_vision: string;
  our_ministries: string;
}

export interface Slide {
  id: number;
  image_url: string;
  target_page: string;
  order: number;
}
