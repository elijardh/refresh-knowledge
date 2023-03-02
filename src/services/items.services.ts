import { BaseItem,Item } from "../models/item.interface";
import { Items } from "../models/items.interface";

let items: Items = {
    1: {
        id: 1,
        name: "Burger",
        price: 599,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
      },
      2: {
        id: 2,
        name: "Pizza",
        price: 299,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
      },
      3: {
        id: 3,
        name: "Tea",
        price: 199,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
      }
}

export const findAll = async(): Promise<Item[]> => Object.values(items);

export const find = async(id: number): Promise<Item|null> =>{ 
    
    const item:Item = items[id];

    if (item != null) {
        return items[id];
    } else {
        return null;
    }
    
    };

export const create = async(newItem:BaseItem): Promise<Item> =>{

    console.log(newItem);
    
    const id = new Date().valueOf();

    items[id] = {id, ...newItem};

    return items[id];
};

export const update = async(updateItem:BaseItem, id:number): Promise<Item | null> => {

    const item = find(id);

    if (item == null) {
        return null;
    }

    items[id] = {id,...updateItem};

    return items[id];
}

export const remove = async(id:number): Promise<string> =>{

    const  item = find(id);

    if (item == null) {
        return "Item Does't exist";
    }

    delete items[id];

    return "Item deleted successfully";
}
