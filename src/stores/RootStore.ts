import TagsStore from "./TagsStore";

class RootStore {
    tagsStore: TagsStore;

    constructor() {
        this.tagsStore = new TagsStore();
    }
};

const rootStore = new RootStore();
export default rootStore;

