CREATE TABLE user_role_id (
  user_id INT REFERENCES users(id),
  role_id INT REFERENCES roles(id)
);