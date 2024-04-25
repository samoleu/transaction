export default {
    routes: [
        {
            method: 'POST',
            path: '/criar',
            handler: 'perfil.teste',
            config: {
                auth: false,
            }
        }
    ]
}