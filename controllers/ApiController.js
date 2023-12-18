const produto = require("../models/Produto");
const usuario = require("../models/Usuario");
const compra = require("../models/Compra");
//para forçar alteração

class ApiController{

   //Administração dbo.usuario
  
   async findusuario(req, res){
    var id = req.params.id;
    var usuarios = await usuario.findById(id)
    if(usuarios == undefined){
        res.status(404);
        res.json({});
    }else{
        res.status(200)
        res.json(usuarios);
    }
 }
 
 async usuariosave(req, res) {

    var {nom_usuario, tex_login, ind_bloqueado, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, num_telefone, tex_email} = req.body;       
    
    await usuario.UsuarioSave(nom_usuario, tex_login, ind_bloqueado, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, num_telefone, tex_email);
   
 }
 async listausuario(req, res) {

    var usuarios = await usuario.findAll();
    res.json(usuarios);  


 }
 async updateusuario(req, res) {

    var {ide_usuario, nom_usuario, tex_login, ind_bloqueado, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, num_telefone, tex_email} = req.body;
    
    await usuario.UsuarioUpdate(ide_usuario, nom_usuario, tex_login, ind_bloqueado, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, num_telefone, tex_email);
          
 }

 async deleteusuario(req, res) {
    var ide_usuario =  req.params.ide_usuario      
    await usuario.UsuarioDelete(ide_usuario); 
    
}

//Administração dbo.Compras
  
async findcompra(req, res){
   var id = req.params.id;
   var compras = await compra.findById(id)
   if(compras == undefined){
       res.status(404);
       res.json({});
   }else{
       res.status(200)
       res.json(compras);
   }

}

async findcomprasusuario(req, res){
   var id = req.params.id;
   var compras = await compra.findByIdeServidor(id)
   if(compras == undefined){
       res.status(404);
       res.json({});
   }else{
       res.status(200)
       res.json(compras);
   }

}

async pesquisacomprasusuario(req, res){
   //var id = req.params.id;
   var {ide_usuario, ind_pago} = req.body;
   var compras = await compra.pesquisaByIdeServidor(ide_usuario, ind_pago)
   if(compras == undefined){
       res.status(404);
       res.json({});
   }else{
       res.status(200)
       res.json(compras);
   }

}

async pesquisatotal(req, res){
   //var id = req.params.id;
   //var {ide_usuario, ind_pago} = req.body;
   var compras = await compra.pesquisaTotal()
   if(compras == undefined){
       res.status(404);
       res.json({});
   }else{
       res.status(200)
       res.json(compras);
   }

}

async comprasave(req, res) {

   var {ide_usuario, ide_produto, nom_produto, num_preco, qtd_produto, dat_compra, ind_pago, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao, dat_ultima_alteracao} = req.body;
   console.log(ide_usuario)
   await compra.CompraSave(ide_usuario, ide_produto, nom_produto, num_preco, qtd_produto, dat_compra, ind_pago, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao, dat_ultima_alteracao);  
}

async listacompra(req, res) {
   var compras = await compra.findAll();
   res.json(compras);  
}

async updatecompra(req, res) {

   var {ide_compra, ide_usuario, qtd_produto, dat_compra, ind_pago, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao, dat_ultima_alteracao} = req.body;
   
   await compra.compraUpdate(ide_compra, ide_usuario, qtd_produto, dat_compra, ind_pago, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao, dat_ultima_alteracao);
         
}

async pagarcompra(req, res) {

   var {ide_usuario,dat_ultima_alteracao} = req.body;
   
   await compra.CompraPagar(ide_usuario, dat_ultima_alteracao);
         
}

async deletecompra(req, res) {
   var ide_compra =  req.params.ide_compra      
   await compra.CompraDelete(ide_compra);
}

//Administração dbo.produto
  
async findproduto(req, res){
   console.log(req.params.id)
   var id = req.params.id;   
   console.log(id)
   var produtos = await produto.findById(id)
   if(produto == undefined){
       res.status(404);
       res.json({});
   }else{
       res.status(200)
       res.json(produtos);
   }

}
async produtosave(req, res) {
   
   var {nom_produto, num_preco, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, ind_bloqueado} = req.body;
   await produto.produtoSave(nom_produto, num_preco, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, ind_bloqueado)
}
async listaproduto(req, res) {
   var produtos = await produto.findAll();
   res.json(produtos);  
}

async updateproduto(req, res) {

   var {ide_produto, nom_produto, num_preco, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, ind_bloqueado} = req.body;   
   await produto.produtoUpdate(ide_produto, nom_produto, num_preco, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, ind_bloqueado);
         
}

async deleteproduto(req, res) {
   var ide_produto =  req.params.ide_produto      
   await produto.produtoDelete(ide_produto);
}

}

module.exports = new ApiController();