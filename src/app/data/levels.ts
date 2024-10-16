const levelsData = {
  "1": {
    moves: 20,
    blue_goal: 10,
    width: 6,
    height: 9,
    empty_spaces: [],
    next_level_id: 2,
  },
  "2": {
    moves: 18,
    blue_goal: 15,
    width: 6,
    height: 9,
    empty_spaces: [
      [0, 4],
      [5, 5],
    ],
    next_level_id: 3,
  },
  "3": {
    moves: 15,
    blue_goal: 20,
    width: 6,
    height: 9,
    empty_spaces: [],
    next_level_id: null,
  },
};

export default levelsData;
