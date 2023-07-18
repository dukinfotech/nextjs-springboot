CREATE TABLE role_permission_id (
  role_id INT REFERENCES roles(id),
  permission_id INT REFERENCES permissions(id)
);