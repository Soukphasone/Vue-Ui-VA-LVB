import mitt from "mitt";

type Events = {
  refresh: void;
};

const eventBus = mitt<Events>();

export default eventBus;
