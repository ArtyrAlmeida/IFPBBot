import { Collection } from "mongodb";

abstract class AbstractModel<T extends Document> {
    protected collection: Collection;

    protected constructor () {
        this.collection = new Collection();
    } 

    public find = (query?: {}) => {
        this.collection.find<T>({
            
        })
    }
    
}