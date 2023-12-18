const express = require("express");
const router = express.Router();
var knex = require("../database/conection");

class Produto {
    async findAll(){
        try{
            var result = await knex.select(['ide_produto', 'nom_produto', 'num_preco', 'nom_usuario_criador', 'dat_criacao', 'nom_usuario_ultima_alteracao',  'dat_ultima_alteracao', 'ind_bloqueado']).table("dbo.produto").orderBy('nom_produto');            
            return result;
        }catch(error){
            console.log(error);
            return[];
    }

    }
    async findById(id){                
        try{

            var result = await knex.select(['ide_produto', 'nom_produto', 'num_preco', 'nom_usuario_criador', 'dat_criacao', 'nom_usuario_ultima_alteracao',  'dat_ultima_alteracao', 'ind_bloqueado']).where({ide_produto: id}).table("dbo.produto");
           
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }                     
        }catch(error){
            console.log(error);
            return undefined;            
        }
    }
    async produtoSave(nom_produto, num_preco, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, ind_bloqueado){
        try{                       
            await knex.insert({ nom_produto, num_preco, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, ind_bloqueado}).table("dbo.produto");
            console.log("Produto Cadastrado com sucesso!!!")
        }catch(error){
            console.log(error);            

        }
    }  
    async produtoUpdate(ide_produto, nom_produto, num_preco, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, ind_bloqueado){
        try{                       
            await knex.where({ide_produto: ide_produto}).update({ nom_produto, num_preco, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao,  dat_ultima_alteracao, ind_bloqueado}).table("dbo.produto")
            console.log("Produto Alterado com sucesso com sucesso!!!")
        }catch(error){
            console.log(error);          

        }
    } 
    async produtoDelete(ide_produto){
        try{                       
            await knex.where({ide_produto: ide_produto}).delete().table("dbo.produto")
            console.log("Produto excluido com sucesso!!!")
        }catch(error){
            console.log(error);          

        }
    } 


}

module.exports = new Produto();