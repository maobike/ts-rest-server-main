import * as jwt from 'jsonwebtoken';
import { User } from '../interfaces/user';

const secretKey = process.env.SECRET_OR_PRIVATE_KEY as string;

export const generateJWT = ( uid : User ) => {

    return new Promise( (resolve, reject ) => {

        const payload = { uid }

        jwt.sign( payload, secretKey, {
            expiresIn: '10h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject( 'Token could not be generated' );
            }else{
                resolve( token );
            }
        })

    });

}