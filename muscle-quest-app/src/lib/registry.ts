/* 
    Global registries which are not user-dependent.
    These may be downloaded from a server in the future.
*/
import { ItemState } from "src/lib/user"

export type Registry<Type> = {
    [key: string]: Type
}

enum EquipmentType {
    HEAD,
    BODY,
    FEET,
}

export type Item = {
    name: string,
    equipment_type?: EquipmentType
}

export let item_registry: Registry<Item> = {
    iron_sword: {
        name: "Iron Sword",
    },
    top_hat: {
        name: "Top Hat",
        equipment_type: EquipmentType.HEAD
    },
    golden_boots: {
        name: "Golden Boots",
        equipment_type: EquipmentType.FEET
    },
}

export function getItemName(state: ItemState) {
    let item = item_registry[state.id]
    if (item) {
        return item.name
    }
    return "ItemState"+JSON.stringify(state)
}