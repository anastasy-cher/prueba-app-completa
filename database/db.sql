create database db_links;
use db_links;

create table users(
    id int auto_increment primary key not null,
    username varchar(50) not null,
    password varchar(250) not null,
    fullname varchar(100) not null
);

create table links(
    id int auto_increment primary key not null,
    title varchar(150) not null,
    url varchar(255) not null,
    dascription text,
    user_id int,
    created_at timestamp not null default current_timestamp,
    constraint fk_user foreign key(user_id) references users(id)
);