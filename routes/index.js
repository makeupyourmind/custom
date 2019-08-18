import usersRouter from './users';
import shipsRouter from './ships';
import membersRouter from './members';

export default function(app){

    app.use('/users', usersRouter);
    app.use('/ships', shipsRouter);
    app.use('/members', membersRouter);

}