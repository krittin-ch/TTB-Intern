userRoute consists of 4 Operations (5 REST API)
1. POST Method -- URL: http://localhost:5000/users/create_user
    1. Create a new user -- with userID and userPassword hashing
    2. Required fields: userName, userEmail, userPassword
    3. Optional fields: firstName, middleName, lastName

    For Example:
        {
            "userName": "user1",
            "userEmail": "user1@email.com",
            "userpassword":"password",
            "firstName": "fName1",
            "middleName": "mName1",
            "lastName": "lName1"
        }

2. GET Method (All Users) -- URL: http://localhost:5000/users/get/all_users
    1. Obtain all users information, excluding userPassword and userID

3. GET Method (Single User) -- URL: http://localhost:5000/users/get/:userID
    1. Obtain all user information, excluding userPassword and userID
    2. userID is obtained from the SHA-256 hashing of "userName:userEmail" and is stored in both userAccount and userInfo table

4. PUT Method -- URL: http://localhost:5000/users/update/:userID
    1. Update any fields depending on the requirement
    2. userID is obtained from the SHA-256 hashing of "userName:userEmail" and is stored in both userAccount and userInfo table

    For Example (assume the same user as the user1 from POST Method): 
        {
            "userEmail": "Test1@email.com",
            "firstName": "fNameTest1",
            "middleName": "mNameTest1",
            "lastName": "lNameTest1"
        }

    This will update user1 to 
        {
            "userName": "user1",
            "userEmail": "Test1@email.com",
            "userpassword":"password",
            "firstName": "fNameTest1",
            "middleName": "mNameTest1",
            "lastName": "lNameTest1"
        }

    Mentioning that the userID will hve hash again since the userEmail is changed from "user1@email.com" to "Test1@email.com"

4. DELETE Method -- URL: http://localhost:5000/users/delete/:userID
    1. Delete (or drop) the specific user from userID -- Permantly Delete
    2. userID is obtained from the SHA-256 hashing of "userName:userEmail" and is stored in both userAccount and userInfo table
