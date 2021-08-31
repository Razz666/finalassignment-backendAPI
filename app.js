const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const db = require('./database/db');
const user_route = require('./route/route_user');
const post_route = require('./route/route_post');
const community_route = require('./route/route_discussion');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public/pictures'));

app.use(user_route);
app.use(post_route);
app.use(community_route);

app.listen(90);