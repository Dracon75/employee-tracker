use employeeTracker_DB;

INSERT INTO department
    (name)
VALUES
    ('Tourism'),
    ('Forestry'),
    ('Environmental Sciences'),
    ('Parks and Recreation');

INSERT INTO employeeRole
    (title, salary, department_id)
VALUES
    ('Park Director', 900000, 4),
    ('Forester', 70000, 2),
    ('Location Manager', 80000, 1),
    ('Consultant', 100000, 2),
    ('Environmental Researcher', 60000, 3),
    ('Accountant', 120000, 1),
    ('Ranger', 40000, 4),
    ('Security Guard', 30000, 1);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Forest', 'Gump', 1, NULL),
    ('leslie', 'Knope', 3, 1),
    ('Ron', 'Swanson', 8, NULL),
    ('Tom', 'Haverford', 5, 3)

