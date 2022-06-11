const mockUsers = [
  {
    id: "6287dcfafc0614bd47bc9c4a",
    name: "Mario",
    username: "marioLG",
    password: "CA32A1E4F9CB46B6D99FC627F9EB4AC606BC3474",
    roles: "guitarrist",
    createdprojects: ["1", "2"],
    joinedprojects: ["3", "4"],
  },
  {
    id: "6287e11ffc0614bd47bc9c4e",
    name: "Maichol",
    username: "queEsEstoMaicol",
    password: "CA32A1E4F9CB46B8D99FC627F9EB4AC606BC3474",
    roles: "drummer",
    createdprojects: ["3", "4"],
    joinedprojects: ["1", "2"],
  },
];

const mockUser = {
  id: "6287dcfafc0614bd47bc9c4a",
  name: "Mario",
  username: "marioLG",
  password: "CA32A1E4F9CB46B6D99FC627F9EB4AC606BC3474",
  roles: "guitarrist",
  createdprojects: ["1", "2"],
  joinedprojects: ["3", "4"],
};

const mockUserPopulatedProjects = {
  id: "6287dcfafc0614bd47bc9c4a",
  name: "Mario",
  username: "marioLG",
  password: "CA32A1E4F9CB46B6D99FC627F9EB4AC606BC3474",
  roles: "guitarrist",
  createdprojects: [
    {
      id: "629b4850703ff9261686d9cd",
      name: "Rock and ron",
      description:
        "Concert for the opening of a new Ron store at Ohio city center",
      image:
        "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
      genres: ["rock"],
      roles: ["drummer", "guitarrist", "bass player", "singer", "keyboard"],
      owner: "6287dcfafc0614bd47bc9c4a",
    },
  ],
  joinedprojects: ["3", "4"],
};

const newMockUser = {
  name: "marta",
  username: "marta",
  password: "marta",
};

module.exports = {
  mockUsers,
  mockUser,
  newMockUser,
  mockUserPopulatedProjects,
};
