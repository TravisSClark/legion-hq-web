import commander from 'assets/rankTypes/commander.png';
import operative from 'assets/rankTypes/operative.png';
import corps from 'assets/rankTypes/corps.png';
import special from 'assets/rankTypes/special.png';
import support from 'assets/rankTypes/support.png';
import heavy from 'assets/rankTypes/heavy.png';

const ranks = {
  commander: {
    name: 'Commander',
    icon: commander
  },
  operative: {
    name: 'Operative',
    icon: operative
  },
  corps: {
    name: 'Corps',
    icon: corps
  },
  special: {
    name: 'Special Forces',
    icon: special
  },
  support: {
    name: 'Support',
    icon: support
  },
  heavy: {
    name: 'Heavy',
    icon: heavy
  }
};

const rankJsonNames = [
    "commander",
    "operative",
    "corps",
    "special",
    "support",
    "heavy",
  ];

export default ranks;
export {rankJsonNames};
