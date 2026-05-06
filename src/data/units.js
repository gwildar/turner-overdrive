/**
 * Unit stats registry.
 * Each faction's units live in their own file under units/.
 * Cross-faction units (mounts, mercenaries, generic creatures) live in units/common.js.
 */

import { SUPPLEMENT_UNITS } from "./supplements/index.js";
import COMMON from "./units/common.js";
import BRETONNIA from "./units/bretonnia.js";
import BEASTMEN from "./units/beastmen.js";
import CHAOS_DWARFS from "./units/chaos-dwarfs.js";
import DAEMONS_OF_CHAOS from "./units/daemons-of-chaos.js";
import DARK_ELVES from "./units/dark-elves.js";
import DWARFS from "./units/dwarfs.js";
import EMPIRE from "./units/empire.js";
import GRAND_CATHAY from "./units/grand-cathay.js";
import HIGH_ELVES from "./units/high-elves.js";
import LIZARDMEN from "./units/lizardmen.js";
import OGRE_KINGDOMS from "./units/ogre-kingdoms.js";
import ORCS_AND_GOBLINS from "./units/orcs-and-goblins.js";
import SKAVEN from "./units/skaven.js";
import TOMB_KINGS from "./units/tomb-kings.js";
import VAMPIRE_COUNTS from "./units/vampire-counts.js";
import WARRIORS_OF_CHAOS from "./units/warriors-of-chaos.js";
import WOOD_ELVES from "./units/wood-elves.js";

export const UNIT_STATS = {
  ...COMMON,
  ...BRETONNIA,
  ...BEASTMEN,
  ...CHAOS_DWARFS,
  ...DAEMONS_OF_CHAOS,
  ...DARK_ELVES,
  ...DWARFS,
  ...EMPIRE,
  ...GRAND_CATHAY,
  ...HIGH_ELVES,
  ...LIZARDMEN,
  ...OGRE_KINGDOMS,
  ...ORCS_AND_GOBLINS,
  ...SKAVEN,
  ...TOMB_KINGS,
  ...VAMPIRE_COUNTS,
  ...WARRIORS_OF_CHAOS,
  ...WOOD_ELVES,
  ...SUPPLEMENT_UNITS,
};
