CREATE TABLE traces (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(50) NOT NULL,
  primary_key INTEGER NOT NULL,
  operation VARCHAR(11) NOT NULL,
  operator_id INTEGER REFERENCES users (id),
  json_data JSON NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)