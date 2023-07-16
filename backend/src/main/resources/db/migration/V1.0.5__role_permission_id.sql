CREATE TABLE role_role_id (
  role_id INT REFERENCES roles(id),
  permission_id INT REFERENCES permissions(id)
);