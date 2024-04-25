import { factories } from '@strapi/strapi';


export default factories.createCoreController('api::perfil.perfil', ({strapi}) =>({
   async teste(ctx){
       await strapi.db.transaction(async ({ trx, rollback, commit, onCommit, onRollback }) => {
           // It will implicitly use the transaction
           try{
               const perfil = await strapi.entityService.create('api::perfil.perfil', {
                   fields: ['nomeCompleto', 'telefone'],
                   data: {
                        nomeCompleto: ctx.request.body.data.nomeCompleto,
                        telefone: ctx.request.body.data.telefone
                   },
               });

               
               const user = await strapi.entityService.create("plugin::users-permissions.user", {
                   fields: ['username', 'email', 'password', 'provider', 'confirmed'],
                   data: {
                       username: ctx.request.body.data.username,
                       email: ctx.request.body.data.email,
                       password: ctx.request.body.data.password,
                       provider: ctx.request.body.data.provider,
                       confirmed: ctx.request.body.data.confirmed,
                   },
               });
               
               await strapi.query("plugin::users-permissions.user").updateRelations(
                   user.id,
                   {
                       role: '1',
                   }
               );


               await strapi.query("api::perfil.perfil").updateRelations(
                   perfil.id,
                   {
                       user: user.id,
                   }
               );
               commit();
              ctx.body = "sucesso"
           }catch(err){
               rollback();
               ctx.body = err;
           }
         });
   },
}));
