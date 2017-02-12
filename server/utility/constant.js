/**
 * Created by Luming on 1/17/2017.
 */

module.exports = Object.freeze({
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    PreconditionFailed: 412,
    ExpectationFailed: 417,
    UnprocessableEntity: 422,
    FailedDependency: 424,
    InternalServerError:500,
    ok:200,
    dbOptions: {
        connectionLimit : 100, //important
        host     : 'localhost',
        user     : 'root',
        password : 'a',
        database : 'guguorder',
        debug    :  false
    },
    dbOptions2: {
        host: 'localhost',// Host name for database connection.
        port: 3306,// Port number for database connection.
        user: 'root',// Database user.
        password: 'a',// Password for the above database user.
        database: 'guguorder',// Database name.
        checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
        expiration: 86400000,// The maximum age of a valid session; milliseconds.
        createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
        connectionLimit: 1,// Number of connections when creating a connection pool
        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
}
});