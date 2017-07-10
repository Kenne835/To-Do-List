CREATE TABLE todolist(
	id SERIAL PRIMARY KEY,
	task VARCHAR (1000) NOT NULL,
	completionstatus VARCHAR (10) NOT NULL
);

INSERT INTO todolist (task, completionstatus)
VALUES('write sql file', 'yes');
