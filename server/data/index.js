import mongoose from "mongoose";
const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    name: "test",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    location: "1234 Main St, San Francisco, CA 94111",
    phoneNumber: "+1234567890",
    role: "client",
    status: true,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
    
  },
  {
    _id: userIds[1],
    name: "Steve",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    location: "456 Elm St, New York, NY 10001",
    phoneNumber: "+2345678901",
    role: "client",
    status: true,
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
    
  },
  {
    _id: userIds[2],
    name: "Some",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    location: "789 Oak St, Toronto, ON M5J 2L7, Canada",
    phoneNumber: "+3456789012",
    role: "client",
    status: true,
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
    
  },
  {
    _id: userIds[3],
    name: "Whatcha",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpeg",
    location: "1 ABC Street, Seoul, South Korea",
    phoneNumber: "+4567890123",
    role: "admin",
    status: true,
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    name: "Jane",
    email: "janedoe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.jpeg",
    location: "123 Maple Ave, Salt Lake City, UT 84101",
    phoneNumber: "+5678901234",
    role: "admin",
    status: true,
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    name: "Harvey",
    email: "harveydunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpeg",
    location: "123 Hollywood Blvd, Los Angeles, CA 90028",
    phoneNumber: "+6789012345",
    role: "client",
    status: true,
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
    
  },
  {
    _id: userIds[6],
    name: "Carly",
    email: "carlyvowel@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p8.jpeg",
    location: "555 Wacker Dr, Chicago, IL 60601",
    phoneNumber: "+7890123456",
    role: "client",
    status: true,
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
    
  },
  {
    _id: "6602e9dec7476ca746481d80",
    name: "SuperAdmin1",
    email: "habibbouzo21@gmail.com",
    password: "$2b$10$fZt7JPY.akqI6Qx3DB.1vuFSIvH.RiyHZqgn8JNwRPvsz.0tjoP5e",
    picturePath: "9.jpeg",
    location: "SuperAdmin1",
    phoneNumber: "123654879",
    role: "superadmin",
    status: true,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];




  export const clients=[{
    clientId: userIds[0],
    companyName: "ZoomInformatique",
    codeFiscale: "1234567890",
    factures:[],
  },{
    clientId: userIds[2],
    companyName: "Myspace",
    codeFiscale: "987654321",
    factures:[],
  },
  {
    clientId: userIds[5],
    companyName: "Mytek",
    codeFiscale: "321165595",
    factures:[],
  },{
    clientId: userIds[6],
    companyName: "Sbsinformatique",
    codeFiscale: "879798798",
    factures:[],
  },{
    clientId: userIds[7],
    companyName: "Tunisianet",
    codeFiscale: "572178511",
    factures:[],
  }];


  export const admins=[{
    adminId: userIds[3],
    clients:[],
  },{
    adminId: userIds[4],
    clients:[],
  }]
  

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    location: "New York, CA",
    description: "Some really long random description",
    picturePath: "post1.jpeg",
    userPicturePath: "p3.jpeg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: [
      "random comment",
      "another random comment",
      "yet another random comment",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    firstName: "Whatcha",
    lastName: "Doing",
    location: "Korea, CA",
    description:
      "Another really long random description. This one is longer than the previous one.",
    picturePath: "post2.jpeg",
    userPicturePath: "p6.jpeg",
    likes: new Map([
      [userIds[7], true],
      [userIds[4], true],
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      "one more random comment",
      "and another random comment",
      "no more random comments",
      "I lied, one more random comment",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    firstName: "Jane",
    lastName: "Doe",
    location: "Utah, CA",
    description:
      "This is the last really long random description. This one is longer than the previous one.",
    picturePath: "post3.jpeg",
    userPicturePath: "p5.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
      [userIds[5], true],
    ]),
    comments: [
      "one more random comment",
      "I lied, one more random comment",
      "I lied again, one more random comment",
      "Why am I doing this?",
      "I'm bored",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    firstName: "Harvey",
    lastName: "Dunn",
    location: "Los Angeles, CA",
    description:
      "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
    picturePath: "post4.jpeg",
    userPicturePath: "p7.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
    ]),
    comments: [
      "I lied again, one more random comment",
      "Why am I doing this?",
      "I'm bored",
      "I'm still bored",
      "All I want to do is play video games",
      "I'm going to play video games",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    firstName: "Carly",
    lastName: "Vowel",
    location: "Chicago, IL",
    description:
      "Just a short description. I'm tired of typing. I'm going to play video games now.",
    picturePath: "post5.jpeg",
    userPicturePath: "p8.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[3], true],
      [userIds[5], true],
      [userIds[7], true],
    ]),
    comments: [
      "I lied again, one more random comment",
      "Why am I doing this?",
      "Man I'm bored",
      "What should I do?",
      "I'm going to play video games",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7],
    firstName: "Jessica",
    lastName: "Dunn",
    location: "Washington, DC",
    description:
      "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
    picturePath: "post6.jpeg",
    userPicturePath: "p9.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),

    comments: [
      "Can I play video games now?",
      "No let's actually study",
      "Never mind, I'm going to play video games",
      "Stop it.",
      "Michael, stop it.",
    ],
  },
];