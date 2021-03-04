import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@exemple.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doen',
    email: 'john@exemple.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Janne User',
    email: 'janne@exemple.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
