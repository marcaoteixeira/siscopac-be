var express = require("express");
var router = express.Router();
const HomeController = require("../controllers/HomeController");
const ApiController = require("../controllers/ApiController");




router.get('/',HomeController.index);
//rotas usuário
router.get('/usuario/:id',ApiController.findusuario);
router.post('/usuario/new',ApiController.usuariosave);
router.post('/usuario/list',ApiController.listausuario);
router.put('/usuario/update',ApiController.updateusuario);
router.delete('/usuario/delete/:ide_usuario',ApiController.deleteusuario);
//rotas produto
router.get('/produto/:id',ApiController.findproduto);
router.post('/produto/new',ApiController.produtosave);
router.post('/produto/list',ApiController.listaproduto);
router.put('/produto/update',ApiController.updateproduto);
router.delete('/produto/delete/:ide_produto',ApiController.deleteproduto);
// rotas compra
//router.get('/compra/:id',ApiController.findcompra);
//router.get('/compra/:id',ApiController.findcomprasusuario);
router.post('/compra/new',ApiController.comprasave);
//router.post('/compra/list',ApiController.listacompra);
router.post('/compra/list/:id',ApiController.findcomprasusuario);
router.post('/compra/pesquisa',ApiController.pesquisacomprasusuario);
router.post('/compra/pesquisatotal',ApiController.pesquisatotal);
router.put('/compra/pagar/',ApiController.pagarcompra);
router.delete('/compra/delete/:ide_compra',ApiController.deletecompra);

module.exports = router;
