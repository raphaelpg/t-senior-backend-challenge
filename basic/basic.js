// Instructions:
// Please make improvements to the code below, using Javascript. 
// If you are making any assumptions about how the code functions please make note of them.

connectToDatabase()
.then((database)  => {
    return getUser(database, 'email@email.com')
    .then(user => {
        return getUserSettings(database, user.id)
        .then(settings => {
            return setRole(database, user.id, "ADMIN")
            .then(success => {
                return notifyUser(user.id, "USER_ROLE_UPDATED")
                .then(success => {
                    return notifyAdmins("USER_ROLE_UPDATED")
                })
            })
        })
    })
})

// Answer:
// I'm assuming that the param has already been checked in a controller
// Otherwise, we should check: 
// - the param type (is not null, is a string)
// - the param value (is not empty, is a valid email)
// - does not represent a security risk  
const setAdminRole = async (userName) => {
    // perform param checks here
    try {
        const database = await connectToDatabase();
        // assuming that if database connection fails, connectToDatabase() will throw an error and will be catched in the catch block
        
        // checking user exists
        const user = await getUser(database, userName);
        if (!user || !user?.id) {
            throw new Error("User not found");
        }

        // Assuming that user role field is accesible as an object property
        // checking if user is already an admin
        if (user && user?.role === "ADMIN") {
            throw new Error("User is already an admin");
        }

        const setToAdmin = await setRole(database, user?.id, "ADMIN");
        if (setToAdmin !== "success") {
            throw new Error("User role could not be updated");
        }
        await notifyUser(user?.id, "USER_ROLE_UPDATED");
        await notifyAdmins("USER_ROLE_UPDATED");
        return setToAdmin;
    } catch (error) {
        console.log(error);
        return error.message;
    }  
}

// transform to async/await arrow function
// give explicit name to the function
// perform call inside a try/catch block
// remove getUserSettings call because the result is not used
// check is user is already an admin
// check if setRole was successful
// returns string value containing the result of setRole or the error message