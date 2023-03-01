export type ItemState = {
    id: string,
    data?: object
}

type DataObject = {
    items: Array<ItemState>
    gold: number
}

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

let user_data: DataObject | null = null

const USER_DATA_SAVE_KEY = 'mq:user_data'

export let UserData = {
    load: (): void => {
        if (localStorage.getItem(USER_DATA_SAVE_KEY) === null) {
            localStorage.setItem(USER_DATA_SAVE_KEY, JSON.stringify(DEFAULT_USER_DATA))
        }
        let x: string | null = localStorage.getItem(USER_DATA_SAVE_KEY)
        user_data = JSON.parse(x || JSON.stringify(DEFAULT_USER_DATA))
    },
    save: ():void => {
        localStorage.setItem(USER_DATA_SAVE_KEY, JSON.stringify(user_data))
    },
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
    mutate: (mutator: (data: DataObject) => DataObject): DataObject => {
        user_data = mutator(UserData.get())
        UserData.save()
        return user_data
    },
}