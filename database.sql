CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    client_id INTEGER,
    incident_desc VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    dates DATE,
    weather_report JSONB
);