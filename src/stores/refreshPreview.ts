import mitt from "mitt";

type Events = {
  refreshPage2: void;
};

const eventBus = mitt<Events>();

export default eventBus;
