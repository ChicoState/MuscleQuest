/*
    Type definition of a state or instance of an individual item.
*/
export type ItemState = {
    // the item id referring to an item type in the item registry.
    id: string,

    // [optional] data object that can store state-specific data, such as a damage value,
    // enchantment, unique stats, etc.
    data?: object
}

/* 
    Type definition of the user data object that is stored for the user.
*/
type DataObject = {
    // a list of item states that the user has in their inventory.
    items: Array<ItemState>,

    // the amount of gold that the user has.
    gold: number
}

/*
    The default user data object that will be saved if no data exists in the user's
    local storage.
*/
const DEFAULT_USER_DATA: DataObject = {
    items: [
        {
            id: 'iron_sword'
        },
        {
            id: 'top_hat'
        },
    ],
    gold: 0,
}

/*
    The current user data object stored in memory.
*/
let user_data: DataObject | null = null

/*
    The key used to save and load the user data in local storage.
*/
const USER_DATA_SAVE_KEY = 'mq:user_data'

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
            localStorage.setItem(USER_DATA_SAVE_KEY, JSON.stringify(DEFAULT_USER_DATA))
        }
        let x: string | null = localStorage.getItem(USER_DATA_SAVE_KEY)
        user_data = JSON.parse(x || JSON.stringify(DEFAULT_USER_DATA))
    },

    /*
        Saves the current user data to local storage.
    */
    save: ():void => {
        localStorage.setItem(USER_DATA_SAVE_KEY, JSON.stringify(user_data))
    },

    /*
        Gets the current user data. Will return it from memory if possible, otherwise it
        will load it from local storage.
    */
    get: (): DataObject => {
        if (!user_data) {
            UserData.load()
        }
        if (user_data != null) {
            return user_data
        } else {
            throw "Error getting data, data is null"
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
        user_data = mutator(UserData.get())
        UserData.save()
        return user_data
    },
}