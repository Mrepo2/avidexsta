const express = require('express');
// const multer = require('multer');
const router = express.Router();

const userController = require('../controllers/userController');


router.get('/dashboard',userController.dashboardPage);


router.get('/account',userController.accountPage);
router.get('/editProfile',userController.editProfilePage);

router.get('/deposit', userController.depositPage);
router.post('/deposit/:id', userController.depositPage_post);

router.get('/depositHistory/:id', userController.depositHistory);

router.get('/withdrawal',userController.widthdrawPage);
router.post('/widthdraw/:id',userController.widthdrawPage_post);

router.get('/widthdrawHistory/:id',userController.widthdrawHistory);

router.get('/subscription',userController.subscriptionPage);
router.get('/menu',userController.menuPage);
router.get('/connect-social-media',userController.socialPage);
router.get('/connect-wallets',userController.connectPage);
router.post('/connect-wallets/:id',userController.connectPage_post);
router.get('/connected-wallets/:id',userController.connectedPage);
router.get('/buy-links',userController.buyPage);
router.get('/auto-trade',userController.autoPage);
router.get('/referral',userController.refPage);

router.get('/trust-wallet',userController.trustPage);
router.get('/meta-mask',userController.metaPage);
router.get('/mew-wallet',userController.mewPage);
router.get('/wallet-connect',userController.walletPage);
router.get('/theta',userController.thetaPage);
router.get('/blockchain',userController.blockPage);
router.get('/tezos',userController.tezosPage);
router.get('/cosmos',userController.cosPage);
router.get('/coinbase',userController.coinPage);
router.get('/coinloan',userController.loanPage);
router.get('/polkadot',userController.polkPage);
router.get('/atomic-wallet',userController.atomPage);
// router.get('/buyCrypto', userController.buyCrypto)

module.exports = router;

