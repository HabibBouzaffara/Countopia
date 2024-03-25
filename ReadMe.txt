Push1:
addded dependecies for auth:
/server/package.json :
bcrypt
gridfs-stream
jsonwebtoken
multer
multer-gridfs-storage

push2: 
db connection 
back connect to front
problem: server/models/user.js : can't name file with maj (User.js)

push: Register, Login done:
- commented the profile section from navbar and sidebar
- commented userId and data from layout 
- removed the api connection from client/src/index.js 
- commented PersistGate from client/src/index.js 
+ imported Form.jsx from the tuto-github 
+ added isAuth in App.js

