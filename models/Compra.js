const express = require("express");
const router = express.Router();
var knex = require("../database/conection");

class Compra {
    async findAll(){
        try{
            var result = await knex.select(['ide_compra', 'ide_usuario', 'qtd_produto', 'dat_compra', 'ind_pago', 'nom_usuario_criador', 'dat_criacao', 'nom_usuario_ultima_alteracao','dat_ultima_alteracao']).table("dbo.compra");            
            return result;
        }catch(error){
            console.log(error);
            return[];
    }

    }
    async findById(id){                
        try{
            var result = await knex.select(['ide_compra', 'ide_usuario', 'qtd_produto', 'dat_compra', 'ind_pago', 'nom_usuario_criador', 'dat_criacao', 'nom_usuario_ultima_alteracao','dat_ultima_alteracao']).where({ide_compra: id}).table("dbo.compra");
           
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

    async findByIdeServidor(id){                
        try{
            //console.log('%%'+id)
            var result = await knex.select(['dbo.compra.ide_compra', 'dbo.compra.ide_usuario', 'dbo.compra.ide_produto', 'dbo.compra.qtd_produto', 'dbo.compra.dat_compra', 'dbo.compra.ind_pago', 'dbo.compra.nom_usuario_criador', 'dbo.compra.dat_criacao', 'dbo.compra.nom_usuario_ultima_alteracao','dbo.compra.dat_ultima_alteracao', 'dbo.produto.nom_produto', 'dbo.produto.num_preco']).table("dbo.compra").join('dbo.produto', 'dbo.produto.ide_produto', 'dbo.compra.ide_produto').orderBy('dat_compra').where({ide_usuario: id}).where({ind_pago: 0});            
            //var result = await knex.select(['ide_compra', 'ide_usuario', 'ide_produto', 'qtd_produto', 'dat_compra', 'ind_pago', 'nom_usuario_criador', 'dat_criacao', 'compra.nom_usuario_ultima_alteracao','dat_ultima_alteracao']).table("dbo.compra").where({ide_usuario: id});  
           //console.log(result)
            if(result.length > 0){
                return result;
            }else{
                return undefined;
            }                     
        }catch(error){
            console.log(error);
            return undefined;            
        }
    }

    async pesquisaByIdeServidor(id, indpago){                
        try{
            //console.log('%%'+id)
            //var result = await knex.select(['dbo.compra.ide_compra', 'dbo.compra.ide_usuario', 'dbo.compra.ide_produto', 'dbo.compra.qtd_produto', 'dbo.compra.dat_compra', 'dbo.compra.ind_pago', 'dbo.compra.nom_usuario_criador', 'dbo.compra.dat_criacao', 'dbo.compra.nom_usuario_ultima_alteracao','dbo.compra.dat_ultima_alteracao', 'dbo.produto.nom_produto', 'dbo.produto.num_preco']).table("dbo.compra").join('dbo.produto', 'dbo.produto.ide_produto', 'dbo.compra.ide_produto').orderBy('dat_compra').where({ide_usuario: id}).where({ind_pago: indpago});            
            var result = await knex.select(['dbo.compra.ide_compra', 'dbo.compra.ide_usuario', 'dbo.compra.ide_produto', 'dbo.compra.qtd_produto', 'dbo.compra.dat_compra', 'dbo.compra.ind_pago', 'dbo.compra.nom_usuario_criador', 'dbo.compra.dat_criacao', 'dbo.compra.nom_usuario_ultima_alteracao','dbo.compra.dat_ultima_alteracao', 'dbo.compra.nom_produto', 'dbo.compra.num_preco']).table("dbo.compra").orderBy('dat_compra').where({ide_usuario: id}).where({ind_pago: indpago});            
            //var result = await knex.select(['ide_compra', 'ide_usuario', 'ide_produto', 'qtd_produto', 'dat_compra', 'ind_pago', 'nom_usuario_criador', 'dat_criacao', 'compra.nom_usuario_ultima_alteracao','dat_ultima_alteracao']).table("dbo.compra").where({ide_usuario: id});  
           //console.log(result)
            if(result.length > 0){
                return result;
            }else{
                return undefined;
            }                     
        }catch(error){
            console.log(error);
            return undefined;            
        }
    }

    async pesquisaTotal(){                
        try{
            var result = await knex('dbo.compra').select('dbo.usuario.nom_usuario', 'dbo.usuario.num_telefone',knex.raw('SUM(dbo.compra.qtd_produto * dbo.compra.num_preco)  AS total')).join('dbo.usuario', 'dbo.usuario.ide_usuario', 'dbo.compra.ide_usuario').groupBy('dbo.usuario.nom_usuario', 'dbo.usuario.num_telefone').orderBy('nom_usuario').where({ind_pago: 0});;
            //]).table("dbo.compra").join('dbo.usuario', 'dbo.usuario.ide_usuario', 'dbo.compra.ide_usuario').orderBy('nom_usuario');            
            //console.log(result)
            if(result.length > 0){
                return result;
            }else{
                return undefined;
            }                     
        }catch(error){
            console.log(error);
            return undefined;            
        }
    }

    async CompraSave( ide_usuario, ide_produto, nom_produto, num_preco, qtd_produto, dat_compra, ind_pago, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao, dat_ultima_alteracao){
        try{                       
            console.log(ide_produto);
            await knex.insert({ ide_usuario, ide_produto, nom_produto, num_preco, qtd_produto, dat_compra, ind_pago, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao, dat_ultima_alteracao}).table("dbo.compra");
            console.log("compra Cadastrado com sucesso!!!")
        }catch(error){
            console.log(error);            

        }
    }  
    async CompraPagar(ide_usuario, dat_ultima_alteracao){
        try{                       
            await  knex.update({ind_pago:  1, dat_ultima_alteracao: dat_ultima_alteracao}).table("dbo.compra").where({ide_usuario: ide_usuario})
            //knex.raw('update dbo.compra set ind_pago = 1,dat_ultima_alteracao = GETDATE() where ide_usuario = ide_usuario')
            console.log("Pagamento registrado com sucesso!!!")
        }catch(error){
            console.log(error);          

        }
    } 

   /* async CompraPagar(ide_compra, ide_usuario, qtd_produto, dat_compra, ind_pago, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao, dat_ultima_alteracao){
        try{                       
            await knex.where({ide_usuario: ide_usuario}).update({ ide_compra, ide_usuario, qtd_produto, dat_compra, ind_pago, nom_usuario_criador, dat_criacao, nom_usuario_ultima_alteracao, dat_ultima_alteracao}).table("dbo.compra")
            console.log("Compras Pagas com sucesso com sucesso!!!")
        }catch(error){
            console.log(error);          

        }
    }*/

    async CompraDelete(ide_compra){
        try{                       
            await knex.where({ide_compra: ide_compra}).delete().table("dbo.compra")
            console.log("compra excluida com sucesso!!!")
        }catch(error){
            console.log(error);          

        }
    } 


}

module.exports = new Compra();