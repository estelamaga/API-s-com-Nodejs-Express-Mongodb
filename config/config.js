//Arquivo criado para centralizar todas as informaçoes que são de confuguração.

//Se o desenvolvedor não setar essa variavel NODE_ENV ele vai assumir
//que é desenvolvimento
const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env){
        case 'dev':
            return{
                
            }
    }

}