export enum Element {
  FIRE,
  ICE,
  LIGHTNING,
}

export enum Material {
  IRON,
  STEEL,
  DIAMOND,
}

export type ShopData = {
  cost: number;
};

/*
    Type definition of a state or instance of an individual item.
*/
export type ItemState = {
  // the item id referring to an item type in the item registry.
  id: string;

  // amount that having this item equipped will increase the player's strength
  strength: number;
  // amount that having this item equipped will increase the player's dexterity
  dexterity: number;

  // [optional] the element an item is strong with
  element?: Element;
  // [optional] the material an item is made of
  material?: Material;

  // [optional] override for item name, use the item type's name if missing
  display_name?: string;
  // [optional] override for item icon, use the item type's icon if missing
  display_icon?: string;

  // [optional] marks if the item was bought from the shop, and includes details about the purchase
  shop_data?: ShopData;
};

/* 
    Type definition of the user data object that is stored for the user.
*/
export type DataObject = {
  // Every user needs a corresponding id in order for their data to be stored.
  userId?: string;
  // a list of item states that the user has in their inventory.
  items: Array<ItemState>;

  // the amount of gold that the user has.
  gold: number;
  // the amount of wood that the user has.
  wood: number;
  // the amount of iron that the user has.
  iron: number;

  equipped: {
    head?: ItemState;
    chest?: ItemState;
    hands?: ItemState;
    feet?: ItemState;
    weapon?: ItemState;
  };
};

/*
    The default user data object that will be saved if no data exists in the user's
    local storage.
*/
export const DEFAULT_USER_DATA: DataObject = {
  items: [
    {
      id: 'sword',
      strength: 2,
      dexterity: 0,
      material: Material.IRON,
      element: Element.LIGHTNING,
      display_name: 'Iron Sword of Lightning',
      display_icon: '/assets/item/iron_sword.png',
    },
    {
      id: 'helmet',
      strength: 0,
      dexterity: 0,
      display_name: 'Top Hat',
      display_icon: '/assets/item/top_hat.png',
    },
  ],
  gold: 0,
  wood: 0,
  iron: 0,
  equipped: {},
};

/*
    The current user data object stored in memory.
*/
let user_data: DataObject | null = null;

/*
    The key used to save and load the user data in local storage.
*/
const USER_DATA_SAVE_KEY = 'mq:user_data';

/* 
    Object to contain functions used to handle user data.

    Import this object in order to get or modify user data.
*/
export let UserData = {
  /*
        Loads user data from local storage. If missing, it will save the default user data.
    */
  load: (): void => {
    if (localStorage.getItem(USER_DATA_SAVE_KEY) === null) {
      localStorage.setItem(
        USER_DATA_SAVE_KEY,
        JSON.stringify(DEFAULT_USER_DATA)
      );
    }
    let x: string | null = localStorage.getItem(USER_DATA_SAVE_KEY);
    user_data = JSON.parse(x || JSON.stringify(DEFAULT_USER_DATA));
  },

  /*
        Saves the current user data to local storage.
    */
  save: (): void => {
    localStorage.setItem(USER_DATA_SAVE_KEY, JSON.stringify(user_data));
  },

  /*
        Gets the current user data. Will return it from memory if possible, otherwise it
        will load it from local storage.
    */
  get: (): DataObject => {
    if (!user_data) {
      UserData.load();
    }
    if (user_data != null) {
      return user_data;
    } else {
      throw 'Error getting data, data is null';
    }
  },

  /*
        Allows you to modify user data. You pass in a function that takes in a DataObject, modifies it, and 
        returns the modified data object. This handles updating and saving the user data for you.

        Example usage using mutate to increment the gold:
        ```ts
            UserData.mutate((data) => {
                data.gold++
                return data
            })
        ```
    */
  mutate: (mutator: (data: DataObject) => DataObject): DataObject => {
    user_data = mutator(UserData.get());
    UserData.save();
    return user_data;
  },
};
