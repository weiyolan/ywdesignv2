// Business facts shared by the root JSON-LD and the service pages' Service nodes.
export const SITE_URL = "https://ywdesign.co";

export const SAME_AS = ["https://www.linkedin.com/in/yweiler", "https://github.com/weiyolan"];

// Lyon-based, serving France + Belgium (the client base); no "Worldwide".
export const AREA_SERVED = [
  { "@type": "City", name: "Lyon" },
  { "@type": "AdministrativeArea", name: "Auvergne-Rhône-Alpes" },
  { "@type": "Country", name: "France" },
  { "@type": "Country", name: "Belgium" },
];
