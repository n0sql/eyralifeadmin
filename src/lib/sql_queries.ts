
export const new_user_table_sql = `CREATE TABLE IF NOT EXISTS user (id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, isApproved BOOLEAN DEFAULT (FALSE), role ENUM('admin', 'sales-agent'), agent_id INT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)`;
export const add_user = 'INSERT INTO user (email, username, password, isApproved, role, agent_id) VALUES (?, ?, ?, ?, ?, ?)';
export const new_user_session_table = `CREATE TABLE IF NOT EXISTS user_session (id VARCHAR(255) NOT NULL PRIMARY KEY, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES user(id), expires_at DATETIME NOT NULL)`;
export const add_user_session = `INSERT INTO user_session (id, user_id, expires_at) VALUES (?, ?, ?)`;
export const validate_session_query =`SELECT user_session.id, user_session.user_id, user_session.expires_at, user.username, user.email, user.isApproved, user.role, user.agent_id FROM user_session INNER JOIN user ON user.id = user_session.user_id WHERE user_session.id = ?`;


export const new_messages_table_sql = `CREATE TABLE IF NOT EXISTS messages (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, phone VARCHAR(255), message TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)`;
export const new_semaglutide_order_table_sql = `CREATE TABLE IF NOT EXISTS semaglutide_orders (internal_id VARCHAR(255) PRIMARY KEY NOT NULL, agent_id INT NOT NULL, submission JSON NOT NULL, status ENUM('failed', 'success') NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)`;
export const semaglutide_odt_order_sql = `CREATE TABLE IF NOT EXISTS semaglutide_odt_orders (internal_id VARCHAR(255) PRIMARY KEY NOT NULL, agent_id INT NOT NULL, transaction_details JSON NOT NULL, payment_info JSON NOT NULL, profile_info JSON NOT NULL, status ENUM('failed', 'success') NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)`;
export const add_message_sql = `INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)`;
export const add_semaglutide_order_sql = `INSERT INTO semaglutide_orders (internal_id, agent_id, submission, status) VALUES (?, ?, ?, ?)`;
export const add_semaglutide_odt_order_sql = `INSERT INTO semaglutide_odt_orders (internal_id, agent_id, transaction_details, payment_info, profile_info, status) VALUES (?, ?, ?, ?, ?, ?)`;