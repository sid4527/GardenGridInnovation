CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,  -- 使用 AUTO_INCREMENT 创建自增主键
    Username VARCHAR(50) NOT NULL,          -- 用户名
    Email VARCHAR(100) NOT NULL,            -- 用户的电子邮件地址
    Preferences VARCHAR(255),               -- 用户偏好设置
    CreatedAt DATETIME DEFAULT NOW(),       -- 用户创建日期，默认为当前时间
    UpdatedAt DATETIME                      -- 用户信息最后更新时间
);

-- 插入示例数据到 Users 表
INSERT INTO Users (Username, Email, Preferences, UpdatedAt)
VALUES 
  ('john_doe', 'john@example.com', 'Rose garden layout', '2024-11-01'),
  ('jane_smith', 'jane@example.com', 'Water lilies grid arrangement', '2024-11-02'),
  ('mike_brown', 'mike@example.com', NULL, '2024-11-03'),
  ('susan_lee', 'susan@example.com', 'Sunflower and lavender mix', NULL),
  ('lisa_white', 'lisa@example.com', 'Dahlia-focused layout', '2024-11-04');
