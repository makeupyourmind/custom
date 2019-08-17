import usersRouter from './users';

export default function(app){

    app.use('/users', usersRouter);

}