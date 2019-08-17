import jwt from 'jsonwebtoken';

export default function verifyRole(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
          
            jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {

                if(err){
                return res.status(401).json({message: "Invalid token"});
                }

                if(!authData.user.role.includes(roles)){
                    return res.status(403).json({message: "You have no any permission"});
                }
                
                next()
            })
        }
    
}