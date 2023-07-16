CREATE TABLE user_permission_id (
  user_id INT REFERENCES users(id),
  permission_id INT REFERENCES permissions(id)
);