import { Selectable } from "../types/Selectable";

export class Activity implements Selectable {
  constructor(
    public key: string,
    public label: string,
    public checkpoints: ActivityCheckpoint[] = []
  ) {}
}

export class ActivityCheckpoint implements Selectable {
  constructor(
    public key: string,
    public label: string
  ) {}
}

export class Difficulty implements Selectable {
  constructor(
    public key: string,
    public label: string
  ) {}
}

const singleChest = new ActivityCheckpoint("chest", "Chest");
const chest1 = new ActivityCheckpoint("chest1", "Chest 1");
const chest2 = new ActivityCheckpoint("chest2", "Chest 2");
const boss = new ActivityCheckpoint("boss", "Boss");

const chestCheckpoints = [chest1, chest2];

export const raids: Activity[] = [
  new Activity("vog", "Vault of Glass", [
    new ActivityCheckpoint("confluxes", "Confluxes"),
    new ActivityCheckpoint("templar", "Templar"),
    new ActivityCheckpoint("gatekeeper", "Gatekeeper"),
    new ActivityCheckpoint("atheon", "Atheon"),
  ]),
  new Activity("kf", "King's Fall", [
    new ActivityCheckpoint("maze", "Maze"),
    new ActivityCheckpoint("wall", "Wall"),
    new ActivityCheckpoint("warpriest", "Warpriest"),
    new ActivityCheckpoint("golgoroth", "Golgoroth"),
    new ActivityCheckpoint("daughters", "Daughters"),
    new ActivityCheckpoint("oryx", "Oryx"),
  ]),
  new Activity("gos", "Garden of Salvation", [
    new ActivityCheckpoint("consecrated", "Consecrated Mind"),
    new ActivityCheckpoint("sanctified", "Sanctified Mind"),
  ]),
  new Activity("lw", "Last Wish", [
    new ActivityCheckpoint("kalli", "Kalli"),
    new ActivityCheckpoint("shuro-chi", "Shuro-Chi"),
    new ActivityCheckpoint("morgeth", "Morgeth"),
  ]),
  new Activity("votd", "Vow of the Disciple", [...chestCheckpoints]),
  new Activity("ce", "Crota's End", [new ActivityCheckpoint("abyss", "Abyss")]),
  new Activity("ron", "Root of Nightmares", [
    ...chestCheckpoints,
    new ActivityCheckpoint("nezarec", "Nezarec"),
  ]),
  new Activity("dsc", "Deep Stone Crypt", [new ActivityCheckpoint("chest2", "Chest 2")]),
  new Activity("se", "Salvation's Edge", [
    ...chestCheckpoints,
    new ActivityCheckpoint("verity", "Verity"),
    new ActivityCheckpoint("witness", "Witness"),
  ]),
];

export const dungeons: Activity[] = [
  new Activity("sd", "Sundered Doctrine", [...chestCheckpoints, boss]),
  new Activity("vh", "Vesper's Host", [...chestCheckpoints, boss]),
  new Activity("wr", "Warlord's Ruin", [singleChest, boss]),
  new Activity("gotd", "Ghosts of the Deep", [chest1, boss]),
  new Activity("sotw", "Spire of the Watcher", [...chestCheckpoints, boss]),
  new Activity("d", "Duality", [...chestCheckpoints]),
  new Activity("goa", "Grasp of Avarice", [...chestCheckpoints]),
  new Activity("p", "Prophecy", [new ActivityCheckpoint("chests", "Chests")]),
  // TODO: confirm checkpoints
  // new Activity("poh", "Pit of Heresy", []),
  // new Activity("st", "Shattered Throne", []),
];

export const difficulties: Difficulty[] = [
  new Difficulty("normal", "Normal"),
  new Difficulty("master", "Master"),
];
