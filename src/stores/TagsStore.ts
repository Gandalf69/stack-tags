import { runInAction, makeAutoObservable } from "mobx";
import type { Tag, TagError, Order } from "../types";
import { getTags } from "../services";

export default class TagsStore {
    tags: Tag[] = [];
    loading = false;
    error: TagError = null;

    constructor() {
        makeAutoObservable(this);
    }

    getTagsData = () => {
        this.loading = true;
        getTags()
        .then(res => {
            runInAction(() => {
                this.tags = res.data.items;
                this.error = null;
            })
        })
        .catch(err => {
            runInAction(() => {
                if(err instanceof Error)
                    this.error = err.message;
                else
                    this.error = "Error while fetching tags!";
            })
        })
        .finally(() => {  
            runInAction(() => {
                this.loading = false;
            })
        })
    }

    sortTags = (order: Order, orderBy: keyof Tag) => {
        if(orderBy === "name")
            return this.tags.sort((a, b) => {
                if(order === "asc")
                    return ('' + a.name).localeCompare(b.name);
                else
                    return ('' + b.name).localeCompare(a.name);
            })
        else
            return this.tags.sort((a, b) => {
                if(order === "asc")
                    return a.count - b.count;
                else
                    return b.count - a.count;
            })
    }
}