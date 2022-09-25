export let userDetails = {
  username: "user",
  img: "https://res.cloudinary.com/dkie4szsu/image/upload/v1656579444/vcer0fogflrlp9eosqdx.jpg",
  email: "a@b.com",
  first_name: "user",
  last_name: "name",
  total_points: 3,
};

export let rankings = [
  {
    id: 5,
    username: "gpy2",
    total_points: 10,
  },
  {
    id: 1,
    username: "root",
    total_points: 3,
  },
  {
    id: 3,
    username: "gpy",
    total_points: 0,
  },
  {
    id: 4,
    username: "gpy1",
    total_points: 0,
  },
];

export let courses = [
  {
    id: 1,
    name: "New Stem",
    description: "Lear stem courses",
    author: "root",
  },
  {
    id: 2,
    name: "Stem 2",
    description: "Hola this is a good course",
    author: "root",
  },
  {
    id: 3,
    name: "Stem 3",
    description: "Hola this is a good",
    author: "root",
  },
  {
    id: 4,
    name: "Stem 3",
    description: "Hola this is a good",
    author: "root",
  },
  {
    id: 5,
    name: "Stem 5",
    description: "Hola this is a good abc",
    author: "root",
  },
  {
    id: 6,
    name: "Stem 6",
    description: "Hola this is a good abc",
    author: "root",
  },
  {
    id: 7,
    name: "Stem 7",
    description: "Hola this is a good abc",
    author: "root",
  },
  {
    id: 8,
    name: "Stem 7",
    description: "Hola this is a good abc",
    author: "root",
  },
  {
    id: 9,
    name: "Stem 8",
    description: "Hola this is a good abc",
    author: "root",
  },
  {
    id: 10,
    name: "Stem 8",
    description: "Hola this is a good abc",
    author: "root",
  },
  {
    id: 11,
    name: "Stem 8",
    description: "Hola this is a good abc",
    author: "root",
  },
  {
    id: 12,
    name: "Stem 9",
    description: "Hola this is a good abc",
    author: "root",
  },
  {
    id: 13,
    name: "Testing permissions",
    description: "This course is for testing permissions",
    author: "root",
  },
  {
    id: 14,
    name: "Testing permissions 1",
    description: "This course is for testing permissions",
    author: "root",
  },
  {
    id: 15,
    name: "Testing permissions 2",
    description: "This course is for testing permissions",
    author: "root",
  },
  {
    id: 16,
    name: "Testing permissions 3",
    description: "This course is for testing permissions",
    author: "root",
  },
];

export let course = {
  id: 1,
  name: "New Stem",
  description: "Lear stem courses",
  author: "root",
  lecture_set: [
    {
      id: 1,
      name: "First",
      description: "dadg",
      is_done: true,
      section_set: [
        {
          id: 1,
          name: "FIrst elcture",
          content: "<p>gsdg</p>\r\n\r\n<p>sscscscscs</p>",
          is_done: true,
          quiz_set: [
            {
              id: 1,
              title: "New",
              total_points: 33,
              question_set: [
                {
                  id: 1,
                  name: "dgsgsgddg",
                  description: "<p>dsgsgfsgfsvs</p>",
                  points: 1,
                  is_done: true,
                },
                {
                  id: 2,
                  name: "daa",
                  description: "<p>dgdagas</p>",
                  points: 2,
                  is_done: true,
                },
                {
                  id: 3,
                  name: "Third Question",
                  description: "<p>Here is its desc</p>",
                  points: 10,
                  is_done: false,
                },
                {
                  id: 4,
                  name: "4th one",
                  description: "hello",
                  points: 20,
                  is_done: false,
                },
              ],
            },
            {
              id: 2,
              title: "First quiz awesome",
              total_points: 0,
              question_set: [],
            },
          ],
        },
        {
          id: 2,
          name: "Second Lecture is Awesome",
          content: "<h1>Hello World</h1>",
          is_done: false,
          quiz_set: [],
        },
      ],
      course_name: "New Stem",
      has_resource: false,
    },
    {
      id: 2,
      name: "Second Lecture awesome",
      description: "Hola this is a good lecture",
      is_done: false,
      section_set: [],
      course_name: "New Stem",
      has_resource: false,
    },
  ],
};
