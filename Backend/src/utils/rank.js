// optional helper; not strictly needed but included for structure
const assignRanks = (users) => {
  users.sort((a,b) => b.totalPoints - a.totalPoints);
  return users.map((u, idx) => ({ ...u, rank: idx + 1 }));
};

module.exports = assignRanks;
