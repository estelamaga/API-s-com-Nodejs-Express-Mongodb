//Arquivo criado para centralizar todas as informaçoes que são de confuguração.

//Se o desenvolvedor não setar essa variavel NODE_ENV ele vai assumir
//que é desenvolvimento
const env = process.env.NODE_ENV  ||  'dev' ;

const config = () => {
    switch(env){
        case 'dev':
            return{
            bd :'mongodb+srv://starshine:g36sos8ziebchcddee45t67u@apiudemy-lsbtw.mongodb.net/test?retryWrites=true&w=majority'
            }

        case 'hml':
             return{
            bd :'mongodb+srv://starshine:g36sos8ziebchcddee45t67u@apiudemy-lsbtw.mongodb.net/test?retryWrites=true&w=majority'
            }
        
        case 'prod':
            return {
            bd :'mongodb+srv://starshine:g36sos8ziebchcddee45t67u@apiudemy-lsbtw.mongodb.net/test?retryWrites=true&w=majority'
        }
    }
}

console.log(`Inicializando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();

// Em ambientes diferentes a string de conexão é diferente. O db de produção não pode ser o mesmo
// DB de dev, nem de homologação. A não ser que você esteja fazendo um teste.
//No terminal para setar outras ENV, comando set NODE ENV=prod (exemplo)