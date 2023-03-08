import TagManager from "react-gtm-module";

const tagManagerEvents = (eventName, utm_source) => {
  // console.warn("this is event name", eventName, "utm source", utm_source);
  const tagManagerArgs = {
    dataLayer: {
      event: eventName,
      utm_source: utm_source,
    },
  };
  TagManager.dataLayer(tagManagerArgs);
};
const landingTagMangerEvent = (eventName, utm_source) => {};

export default tagManagerEvents;
