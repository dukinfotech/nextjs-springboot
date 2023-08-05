CREATE OR REPLACE FUNCTION store_data_trigger() RETURNS TRIGGER AS $$
DECLARE
    table_name TEXT;
    primary_key INTEGER;
    operation TEXT;
    operator_id INTEGER;
    json_data JSON;
BEGIN
    -- Get the name of the affected table
    table_name := TG_TABLE_NAME;
    operation := TG_OP;
    primary_key := NEW.id;
    operator_id := NEW.last_updated_by;

    -- Determine the operation (INSERT, UPDATE, or DELETE)
    IF TG_OP = 'INSERT' THEN
        json_data := row_to_json(NEW);
    ELSIF TG_OP = 'UPDATE' THEN
        IF NEW.deleted_at IS NOT NULL THEN
            operation := 'SOFT_DELETE';
        END IF;
        json_data := row_to_json(NEW);
    ELSIF TG_OP = 'DELETE' THEN
        json_data := row_to_json(OLD);
    END IF;

    -- Store the data in a log table
    EXECUTE format('INSERT INTO traces(table_name, primary_key, operation, operator_id, json_data) VALUES (%L, %L, %L, %L, %L)',
                   table_name, primary_key, operation, operator_id, json_data);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger for all tables

DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name IN (
            'roles',
            'permissions',
            'users'
        )
    LOOP
        EXECUTE format('CREATE OR REPLACE TRIGGER store_data_trigger
                        AFTER INSERT OR UPDATE OR DELETE ON %I
                        FOR EACH ROW
                        EXECUTE PROCEDURE store_data_trigger()',
                t);
    END LOOP;
END;
$$ LANGUAGE plpgsql;