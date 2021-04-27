const passport = require("passport");
const LocalStrategy = require ("passport-local").Strategy;

passport.use('local.signup', new LocalStrategy({
    correoField: 'correo',
    contraseñaField: 'contraseña',
    passReqToCallback: true
  }, async (req, correo, contraseña, done) => {
    
    console.log(req.body);
    console.log("dale men");
        
   
  }));

  
 //penes
 

//por aca esta el error
















/*passport.use("local.signup", new LocalStrategy({
      //aca dentro vamos a colocar lo que queremos recibir, ejemplo: que voy a recibir de mi signup, un nombreField , apellidoField, etc
      correoField: "correo", //osea voy a recibir este campo a traves del INPUT, con el nombre de "CORREO", si seria en el apellidoField, el nombre del input seria "APELLIDO"
      contraseñaField: "contraseña", //es porque el INput de la contraseña se llama CONTRASEÑA, por eso pongo dos contraseña, ponga de ahi va recibir los datos
      passReqToCallback: true //aca solo van estos dos datos, ya que son los principales para poder iniciar una sesion, ya que te va pedir tu correo y tu constraseña, por eso van estos dos solos, ya que se necesitan si o si
    }, async (req, correo, contraseña, done) => { //esta funcion se ejecuta despus del LocalStrategy, el DONE es para que se siga ejecutando el codigo
        console.log(req.body);
        

    }));
//mi autenticaicon se va a llamar LOCAL.SIGNUP */