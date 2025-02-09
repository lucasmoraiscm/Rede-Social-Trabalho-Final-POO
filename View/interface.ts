export class InterfaceRedeSocial {

    public imprimirMenuInterface(apelido: string): string {
        const menu = `
+---------------------------------------+
     🌐 Rede Social - InstaApp 🌐     
+---------------------------------------+                     
 👤 PERFIL - ${apelido}                                        
+---------------------------------------+
       🔧 GERÊNCIA DE PERFIS 🔧        
                                       
 🔍 [1] - Pesquisar Perfil             
 📜 [2] - Listar todos os perfis       
 ❌ [3] - Ativar/Desativar Perfil      
                                       
+---------------------------------------+
     📝 GERÊNCIA DE PUBLICAÇÕES 📝     
                                       
 ➕ [4] - Adicionar Publicação         
 📃 [5] - Listar Publicações           
                                       
+---------------------------------------+
       🤝 GERÊNCIA DE AMIZADES 🤝      
                                       
 📩 [6] - Enviar Solicitação           
             de Amizade                
 ❤️ [7] - Aceitar Solicitação          
 ❌ [8] - Recusar Solicitação          
                                       
+---------------------------------------+
      💬 GERÊNCIA DE INTERAÇÕES 💬     
                                       
 🗣️ [9] - Interagir Publicação         
                                       
+---------------------------------------+
 ❌ [0] - Sair                         
+---------------------------------------+`;

    return menu;
    }

    public imprimirMenuInicial() : string {
        const menu = `
+---------------------------------------+              
                                 
      🌐 Welcome to INSTA-APP 🌐    
                                 
      Um lugar para se conectar📱
         
+---------------------------------------+
                                 
 🔵 [1]- Cadastre-se no InstaApp  
 🔵 [2]- Entrar no InstaApp
 ❌ [0]- Sair      
                                 
+---------------------------------------+` 

        return menu;
    }

    public imprimirCadastrarPerfil() : string {
        const menu = `
+---------------------------------------+
         ➕ Cadastrar Perfil ➕      
+---------------------------------------+
 Selecione a opcao que deseja 😊:   
                                    
 🔵 [1] - Cadastrar Perfil Comum     
 🔵 [2] - Cadastrar Perfil Avançado    
 ❌ [0] - Sair                       
                                    
+---------------------------------------+`

        return menu;
    }

    public imprimirBuscarPerfil() : string {
        const menu = `
+---------------------------------------+
          🔍 Buscar Perfil 🔍          
+---------------------------------------+
 Selecione a opcao que deseja 😊:   
                                    
 📧 [1] - Buscar por Email           
 🔤 [2] - Buscar por Apelido           
 🔢 [3] - Buscar por ID              
 ❌ [0] - Sair                       
                                    
+---------------------------------------+`

         return menu;
    }


    public ImprimirAtivarDesativarPerfil() : string {
        const menu = `
+---------------------------------------+
    ⏸️ Ativar e Desativar Perfil ⏸️  
+---------------------------------------+
 Selecione a opcao que deseja 😊:   
                                    
 🟢 [1] - Ativar Perfil              
 🔴 [2] - Desativar Perfil           
 ❌ [0] - Sair                       
                                    
+---------------------------------------+`

         return menu;
    }

    public ImprimirAdicionarPublicacao() : string {
        const menu = `
+---------------------------------------+
          🖼️ Nova Postagem 🖼️         
+---------------------------------------+
 Selecione a opcao que deseja 😊:     
                                      
 ➕ [1] - Criar Novo Post Simples      
 ➕ [2] - Criar Novo Post Avancado     
 ❌ [0] - Sair                         
                                      
+---------------------------------------+`

         return menu;
    }

    public imprimirListarPublicacao() : string {
        const menu = `
+---------------------------------------+
      👀 Visualizar Publicacoes 👀      
+---------------------------------------+
 Selecione a opcao que deseja 😊:      
                                       
 📜 [1] - Ver Postagens Geral InstaApp  
 📜 [2] - Ver Postagens por Perfil      
 ❌ [0] - Sair                          
                                       
+---------------------------------------+`

         return menu;
    }
};
