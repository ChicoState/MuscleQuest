/* 
    Global registries which are not user-dependent.
    These may be downloaded from a server in the future.
*/
import { ItemState } from "src/lib/user"

/*
    Registry type definition, basically just a map of string ids to an arbitrary type
    For example, a Registry<Item> would be a map of string ids to Items.
*/
export type Registry<Type> = {
    [id: string]: Type
}

/*
    Equipment types refer to specific equipment slots that the user will (in the future)
    be able to equip specific items into.
    
    For example, a helmet may use the HEAD equipment type.
*/
enum EquipmentType {
    HEAD,
    BODY,
    FEET,
}

/* 
    Item type which contains the different properties of items.

    Item objects are statically created in the item registry where their id is the key in the registry.
*/
export type Item = {
    // human-readable English name of the item to be displayed to the user.
    name: string,
    
    // [optional] if present, the item must be in a (currently unimplemented) equipment slot to be used.
    equipment_type?: EquipmentType
}

/*
    Item registry maps item ids to Item objects. You can consider this as a "master list" of all
    possible item types to exist. These are specifically *not* instances or states of items, just
    the definitions of the items.
*/
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

/* 
    Gets the item id of an ItemState, and looks up the Item in the registry.
    Returns the item's name if it exists.
*/
export function getItemName(state: ItemState) {
    let item = item_registry[state.id]
    if (item) {
        return item.name
    }
    return "ItemState"+JSON.stringify(state)
}