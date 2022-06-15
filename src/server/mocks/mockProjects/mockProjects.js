const mockProjects = [
  {
    id: "629b4850703ff9261686d9cd",
    name: "Rock and ron",
    description:
      "Concert for the opening of a new Ron store at Ohio city center",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    genres: ["rock"],
    roles: ["drummer", "guitarrist", "bass player", "singer", "keyboard"],
  },
  {
    id: "629b4b59703ff9261686d9d2",
    name: "Blues for blass",
    description: "Last concert of Blass a famous blues guitarrist",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    genres: ["blues"],
    roles: ["drummer", "guitarrist", "bass player", "singer"],
  },
];

const mockProject = {
  id: "629b4850703ff9261686d9cd",
  name: "Rock and ron",
  description: "Concert for the opening of a new Ron store at Ohio city center",
  image:
    "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
  genres: ["rock"],
  roles: ["drummer", "guitarrist", "bass player", "singer", "keyboard"],
};

const mockPopulatedProject = {
  id: "629b4850703ff9261686d9cd",
  name: "Rock and ron",
  description: "Concert for the opening of a new Ron store at Ohio city center",
  image:
    "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
  genres: ["rock"],
  roles: ["drummer", "guitarrist", "bass player", "singer", "keyboard"],
  owner: {
    username: "marta",
    id: "6294f76c8e5030ad2af29b9a",
  },
};

const mockPaginatedProject = {
  page: 0,
  pagesize: 6,
  total: 1,
  results: [
    {
      name: "mockProjectName",
      description: "MockDescriptiob",
      image: "mockImage",
      imagebackup: "mockImageBackground",
      genres: ["rock", "blues", "pop"],
      roles: ["drummer", "guitarrist", "singer"],
    },
  ],
};

const mockGetProjects = [
  {
    id: undefined,
    name: "Rock and ron",
    description:
      "Concert for the opening of a new Ron store at Ohio city center",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl1.jpg",
    genres: ["rock", "blues"],
    roles: ["drummer", "singer", "keyboard"],
    owner: "userId1",
  },
  {
    id: undefined,
    name: "Blues for blass",
    description: "Last concert of Blass a famous blues guitarrist",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/ario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl2.jpg",
    genres: ["blues", "folk"],
    roles: ["drummer", "guitarrist", "bassplayer", "singer"],
    owner: "userId2",
  },
  {
    id: undefined,
    name: "Mago de O2",
    description: "Spanish folk band",
    image: "https://offloadmedia.feverup.com/m8105701/Secreto-4-1024x683.jpg",
    imagebackup: "imagebackupurl3.jpg",
    genres: ["folk", "rock", "pop"],
    roles: ["drummer", "guitarrist", "bass player", "singer", "keyboard"],
    owner: "userI3",
  },
  {
    id: undefined,
    name: "Bluess and goose",
    description: "Blues for the goose at the zoo",
    image: "https://offloadmedia.feverup.com/madridsecreto-1024x683.jpg",
    imagebackup: "imagebackupurl4.jpg",
    genres: ["blues", "pop"],
    roles: ["drummer", "guitarrist", "bassplayer", "singer"],
    owner: "userId4",
  },
  {
    id: undefined,
    name: "Ron and rock",
    description: "Concert  rock at center",
    image:
      "https://offloadmedia.feverup.com/Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl5.jpg",
    genres: ["folk"],
    roles: ["drummer", "guitarrist", "bass player", "singer", "keyboard"],
    owner: "userId5",
  },
  {
    id: undefined,
    name: "Blues for blass",
    description: "Last concert of Blass a famous blues guitarrist",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl6.jpg",
    genres: ["blues"],
    roles: ["drummer", "guitarrist", "bass player", "singer"],
    owner: "userId6",
  },
  {
    id: undefined,
    name: "Rock and ron",
    description:
      "Concert for the opening of a new Ron store at Ohio city center",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl7.jpg",
    genres: ["rock"],
    roles: ["drummer", "guitarrist", "bass player", "singer", "keyboard"],
    owner: "userId7",
  },
  {
    id: undefined,
    name: "Blues for blass",
    description: "Last concert of Blass a famous blues guitarrist",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl8.jpg",
    genres: ["blues", "rock"],
    roles: ["drummer", "guitarrist", "bass player", "singer"],
    owner: "userId8",
  },
];

module.exports = {
  mockProject,
  mockProjects,
  mockPopulatedProject,
  mockPaginatedProject,
  mockGetProjects,
};
