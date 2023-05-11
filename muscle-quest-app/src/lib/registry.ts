/* 
    Global registries which are not user-dependent.
    These may be downloaded from a server in the future.
*/
import { ItemState } from 'src/lib/user';

/*
    Registry type definition, basically just a map of string ids to an arbitrary type
    For example, a Registry<Item> would be a map of string ids to Items.
*/
export type Registry<Type> = {
  [id: string]: Type;
};

/*
    Equipment types refer to specific equipment slots that the user will (in the future)
    be able to equip specific items into.
    
    For example, a helmet may use the HEAD equipment type.
*/
export enum EquipmentSlot {
  HEAD = 'head',
  CHEST = 'chest',
  HANDS = 'hands',
  FEET = 'feet',
  WEAPON = 'weapon',
}

/* 
    Item type which contains the different properties of items.

    Item objects are statically created in the item registry where their id is the key in the registry.
*/
export type ItemType = {
  // human-readable English name of the item to be displayed to the user.
  name: string;

  // [optional] if present, the item must be in a (currently unimplemented) equipment slot to be used.
  equipment_slot?: EquipmentSlot;

  // path to an image file used for the item type
  icon: string;
};

/*
    Item registry maps item ids to Item objects. You can consider this as a "master list" of all
    possible item types to exist. These are specifically *not* instances or states of items, just
    the definitions of the items.
*/
export const item_registry: Registry<ItemType> = {
  sword: {
    name: 'Sword',
    icon: '/assets/item/default_sword.png',
    equipment_slot: EquipmentSlot.WEAPON,
  },
  helmet: {
    name: 'Helmet',
    icon: '/assets/item/default_helmet.png',
    equipment_slot: EquipmentSlot.HEAD,
  },
  chestplate: {
    name: 'Chestplate',
    icon: '/assets/item/default_chestplate.png',
    equipment_slot: EquipmentSlot.CHEST,
  },
  gloves: {
    name: 'Gloves',
    icon: '/assets/item/default_gloves.png',
    equipment_slot: EquipmentSlot.HANDS,
  },
  boots: {
    name: 'Boots',
    icon: '/assets/item/default_boots.png',
    equipment_slot: EquipmentSlot.FEET,
  },
};

/* 
    Gets the item id of an ItemState, and looks up the Item in the registry.
    Returns the item's name if it exists.
*/
export function getItemName(state: ItemState) {
  const item = item_registry[state.id];
  if (item) {
    return item.name;
  }
  return 'ItemState' + JSON.stringify(state);
}

/* 
    Gets the item id of an ItemState, and looks up the Item in the registry.
    Returns the item's icon if it exists.
*/
export function getItemIcon(state: ItemState) {
  if (state.display_icon) {
    return state.display_icon;
  }
  const item = item_registry[state.id];
  if (item) {
    return item.icon;
  }
  return '/assets/item/unknown.png';
}
