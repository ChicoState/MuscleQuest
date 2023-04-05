import { Injectable } from '@angular/core';
import { ItemState, UserData, ShopData, Material, Element } from 'src/lib/user';

@Injectable({
  providedIn: 'root',
})
export class SloaneItemGeneratorService {
  constructor() {}

  /**
   * To generate an item, the only required argument is rank: (0 = low, 1 = medium, 2 = high, 3 = ultimate)
   * Other item values will be generated based on the rank provided
   */
  createNewItem(
    rank: number,
    id?: string,
    strength?: number,
    dexterity?: number,
    element?: Element,
    material?: Material,
    display_name?: string,
    display_icon?: string,
    shop_data?: ShopData
  ): ItemState {
    const stats = statTotal(rank);

    // initialize a variable of type ItemState
    const newItem: ItemState = {
      id: '',
      strength: 0,
      dexterity: 0,
    };

    if (id !== undefined) {
      newItem.id = id;
    } else {
      newItem.id = randomID();
    }
    if (strength !== undefined) {
      newItem.strength = strength;
    } else {
      newItem.strength = stats[0];
    }
    if (dexterity !== undefined) {
      newItem.dexterity = dexterity;
    } else {
      newItem.dexterity = stats[1];
    }
    if (element !== undefined) {
      newItem.element = element;
    }
    // Low level items will not have any elements assigned automatically
    else if (rank == 1 && coinToss()) {
      newItem.element = randomElement();
    } else if (rank > 1) {
      newItem.element = randomElement();
    }
    if (material !== undefined) {
      newItem.material = material;
    } else {
      newItem.material = materialChooser(rank);
    }
    if (display_name !== undefined) {
      newItem.display_name = display_name;
    } else {
      newItem.display_name = nameGenerator(
        rank,
        newItem.id,
        newItem.material,
        newItem.element
      );
    }

    // This functionality should take place in the shop and inventory, if I'm not mistaken

    if (display_icon !== undefined) {
      newItem.display_icon = display_icon;
    }
    if (shop_data !== undefined) {
      newItem.shop_data = shop_data;
    }

    return newItem;
  }

  // Returns an array containing a randomly generated assortment of gold, wood and iron
  createLootBundle(rank: number): Array<any> {
    let multiplier = 1;
    if (rank > 0) multiplier = rank * (rank + 1);

    const gold = rng(multiplier * 100);
    const wood = rng(multiplier * 100);
    const iron = rng(multiplier * 100);
    return [gold, wood, iron];
  }

  // Allows a randomly generated loot bundle to be easily given to user
  giveLootBundle(bundle: number[]) {
    return UserData.mutate((data) => {
      data.gold += bundle[0];
      data.wood += bundle[1];
      data.iron += bundle[2];
      return data;
    });
  }

  // Borrowed from McKeever's shop and inventory component code
  giveItem(item: ItemState) {
    UserData.mutate((data) => {
      data.items.push(item);
      return data;
    });
  }

  // Provide specific resources as such:
  // giveSpecificResources(wood: 100);
  giveSpecificResources(gold?: number, wood?: number, iron?: number) {
    return UserData.mutate((data) => {
      if (gold !== undefined) {
        data.gold += gold;
      }
      if (wood !== undefined) {
        data.wood += wood;
      }
      if (iron !== undefined) {
        data.iron += iron;
      }
      return data;
    });
  }
}

// Given a rank, generate an array containing two numbers:
// array[0] = strength; array[1] = dex;
// Stats add up to a certain value depending on the item's rank
function statTotal(rank: number) {
  const totals = [2, 4, 7, 12];
  const total = totals[rank];
  let str = rng(4);
  const dex = total - str;
  return [str, dex];
}

function randomElement(): Element {
  const elements = Object.values(Element);
  const elementIndex = rng(elements.length);
  const elementString = elements[elementIndex];
  let selected: Element;

  switch (elementString) {
    case 'FIRE':
      selected = Element.FIRE;
      break;

    case 'ICE':
      selected = Element.ICE;
      break;

    case 'LIGHTNING':
      selected = Element.LIGHTNING;
      break;

    default:
      selected = Element.FIRE;
  }
  return selected;
}

function materialChooser(rank: number): Material {
  switch (rank) {
    case 0:
      return Material.IRON;
      break;
    case 1:
      return Material.STEEL;
      break;
    case 2:
      return Material.STEEL;
      break;
    case 3:
      return Material.DIAMOND;
      break;
    default:
      return Material.IRON;
  }
}

function randomID(): string {
  const ids = ['sword', 'helmet', 'chestplate', 'gloves', 'boots'];

  const randomIndex = rng(ids.length);

  return ids[randomIndex];
}

// Given rank, item id, material and element, generate a sweet name
function nameGenerator(
  rank: number,
  id: string,
  material: Material,
  element?: Element
) {
  const adjectives: { [key: number]: string[] } = {
    0: [
      'Paltry',
      'Pathetic',
      'Piteous',
      'Flaccid',
      'Feeble',
      'Miserable',
      'Tragic',
      'Sad',
      'Wretched',
      'Forlorn',
      'Beggarly',
      'Hopeless',
      'Trifling',
      'Insignificant',
      'Meaningless',
      'Shameful',
    ],
    1: [
      'Respectable',
      'Adequate',
      'Decent',
      'Worthy',
      'Good',
      'Passable',
      'Humdrum',
      'Plain',
      'Fair',
      'Unremarkable',
      'Acceptable',
      'Middling',
      'Mediocre',
      'Mundane',
      'Boring',
    ],
    2: [
      'Superb',
      'Formidable',
      'Prime',
      'Sensational',
      'Dreadnaught',
      'Powerful',
      'Astonishing',
      'Momentous',
      'Historic',
      'Important',
      'Significant',
      'Remarkable',
      'Impressive',
      'Triumphant',
    ],
    3: [
      'Sovereign',
      'Mythical',
      'Absolute',
      'Divine',
      'Profound',
      'Transcendent',
      'Magnificent',
      'Stellar',
      'Miraculous',
      'Overwhelming',
      'Phenomenal',
      'Unreal',
      'Ultimate',
      'Supreme',
    ],
  };

  let possibleAdjectives = adjectives[rank];
  const adjIndex = rng(possibleAdjectives.length);
  const adjective = possibleAdjectives[adjIndex];

  let materialString = Material[material].toString();
  materialString = fixCapitalization(materialString);

  let itemId = fixCapitalization(id);

  let name = `${adjective} ${materialString} ${itemId}`;

  let elementString;
  if (element !== undefined) {
    elementString = ' of ' + fixCapitalization(Element[element].toString());
    name += elementString;
    return name;
  }

  return name;
}

function fixCapitalization(word: string) {
  let string = word.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function coinToss() {
  return Math.random() < 0.5;
}

function rng(n: number) {
  return Math.floor(Math.random() * n);
}
