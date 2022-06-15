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
    imagebackup: "imagebackupurl.jpg",
    genres: ["rock"],
    roles: ["drummer", "guitarrist", "bass player", "singer", "keyboard"],
    owner: "userId1",
  },
  {
    id: undefined,
    name: "Blues for blass",
    description: "Last concert of Blass a famous blues guitarrist",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl.jpg",
    genres: ["blues"],
    roles: ["drummer", "guitarrist", "bass player", "singer"],
    owner: "userId1",
  },
  {
    id: undefined,
    name: "Rock and ron",
    description:
      "Concert for the opening of a new Ron store at Ohio city center",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl.jpg",
    genres: ["rock"],
    roles: ["drummer", "guitarrist", "bass player", "singer", "keyboard"],
    owner: "userId1",
  },
  {
    id: undefined,
    name: "Blues for blass",
    description: "Last concert of Blass a famous blues guitarrist",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl.jpg",
    genres: ["blues"],
    roles: ["drummer", "guitarrist", "bass player", "singer"],
    owner: "userId1",
  },
  {
    id: undefined,
    name: "Rock and ron",
    description:
      "Concert for the opening of a new Ron store at Ohio city center",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl.jpg",
    genres: ["rock"],
    roles: ["drummer", "guitarrist", "bass player", "singer", "keyboard"],
    owner: "userId1",
  },
  {
    id: undefined,
    name: "Blues for blass",
    description: "Last concert of Blass a famous blues guitarrist",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl.jpg",
    genres: ["blues"],
    roles: ["drummer", "guitarrist", "bass player", "singer"],
    owner: "userId1",
  },
  {
    id: undefined,
    name: "Rock and ron",
    description:
      "Concert for the opening of a new Ron store at Ohio city center",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl.jpg",
    genres: ["rock"],
    roles: ["drummer", "guitarrist", "bass player", "singer", "keyboard"],
    owner: "userId1",
  },
  {
    id: undefined,
    name: "Blues for blass",
    description: "Last concert of Blass a famous blues guitarrist",
    image:
      "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/04/08105701/Madrid-Secreto-Legendario-Tempo-4-1024x683.jpg",
    imagebackup: "imagebackupurl.jpg",
    genres: ["blues"],
    roles: ["drummer", "guitarrist", "bass player", "singer"],
    owner: "userId1",
  },
];

module.exports = {
  mockProject,
  mockProjects,
  mockPopulatedProject,
  mockPaginatedProject,
  mockGetProjects,
};
