
export const new_user_table_sql = `CREATE TABLE IF NOT EXISTS user (id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, isApproved BOOLEAN DEFAULT (FALSE), role ENUM('admin', 'sales-agent'), agent_id INT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)`;
export const add_user = 'INSERT INTO user (email, username, password, isApproved, role, agent_id) VALUES (?, ?, ?, ?, ?, ?)';
export const new_user_session_table = `CREATE TABLE IF NOT EXISTS user_session (id VARCHAR(255) NOT NULL PRIMARY KEY, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES user(id), expires_at DATETIME NOT NULL)`;
export const add_user_session = `INSERT INTO user_session (id, user_id, expires_at) VALUES (?, ?, ?)`;
export const validate_session_query =`SELECT user_session.id, user_session.user_id, user_session.expires_at, user.username, user.email, user.isApproved, user.role, user.agent_id FROM user_session INNER JOIN user ON user.id = user_session.user_id WHERE user_session.id = ?`;
export const insert_doctor_onboarding = `INSERT INTO doctor_onboarding (agent_id, first_name, last_name, clinic_name, address, phone, email, practice_business_name, doctor_type, client_code, master_client, supervising_physician_name, supervising_physician_npi, supervising_physician_dea, date_of_birth, drivers_license, npi_no, dea_no, states_licensed_in, sub_domain, signature) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
export const insert_leanmore_form = `INSERT INTO learnmoreform (name, email, phone, doctorType, state, website, submittedAt) VALUES (?, ?, ?, ?, ?, ?, now())`;
export const create_doctor_onboarding_table_query = `CREATE TABLE IF NOT EXISTS doctor_onboarding 
(
    agent_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL, 
    last_name VARCHAR(255) NOT NULL, 
    clinic_name VARCHAR(255) NOT NULL, 
    address VARCHAR(255) NOT NULL, 
    phone VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    practice_business_name VARCHAR(255) NOT NULL, 
    doctor_type VARCHAR(255) NOT NULL, 
    client_code VARCHAR(255) NOT NULL, 
    master_client VARCHAR(255) NULL, 
    supervising_physician_name VARCHAR(255) NULL, 
    supervising_physician_npi VARCHAR(255) NULL, 
    supervising_physician_dea VARCHAR(255) NULL, 
    date_of_birth VARCHAR(255) NOT NULL, 
    drivers_license VARCHAR(255) NOT NULL, 
    npi_no VARCHAR(255) NOT NULL, 
    dea_no VARCHAR(255) NOT NULL, 
    states_licensed_in VARCHAR(255) NOT NULL, 
    sub_domain VARCHAR(255) NULL,
    signature BLOB NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT PK_Onboarding PRIMARY KEY (npi_no,created_at)
)`;

export const new_messages_table_sql = `CREATE TABLE IF NOT EXISTS messages (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, phone VARCHAR(255), message TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)`;
export const new_semaglutide_order_table_sql = `CREATE TABLE IF NOT EXISTS semaglutide_orders (internal_id VARCHAR(255) PRIMARY KEY NOT NULL, agent_id INT NOT NULL, submission JSON NOT NULL, status ENUM('failed', 'success') NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)`;
export const add_message_sql = `INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)`;
export const add_semaglutide_order_sql = `INSERT INTO semaglutide_orders (internal_id, agent_id, submission, status) VALUES (?, ?, ?, ?)`;
