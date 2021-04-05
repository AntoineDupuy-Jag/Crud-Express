var express = require('express');
var router = express.Router();

// Déclaration d'un tableau d'objet en format json (clé: 'valeur') pour tester le CRUD ->
let books = [
    { id: 1, author: 'G.R.R Martin', title: 'A Game of Thrones (AGOT)', release: '1996', categorie: 'Intégrale 1', image: './images/agot.png' },
    { id: 2, author: 'G.R.R Martin', title: 'A Clash of Kings (ACOK)', release: '1999', categorie: 'Intégrale 2', image: './images/acok.png' },
    { id: 3, author: 'G.R.R Martin', title: 'A Storm of Swords (ASOS)', release: '2001', categorie: 'Intégrale 3', image: './images/asos.png' }
];

// HOMEPAGE 'Catalogue' ->
router.get('/', function(req, res) {
    res.render('catalogue', {
        listBooks: books
    });
}); // EO get

/*=======================================================
||      LE CRUD (Create, Read, Update, Delete) ==>      ||
=======================================================*/

/*---------------------------
|       C R E A T E         |
--------------------------*/

// Méthode GET (pour accéder à la page 'new') ->
router.get('/new', (req, res, next) => {
    res.render('new');
}); // EO get

// Méthode POST (pour envoyer le formulaire de la page 'new') ->
router.post('/new', (req, res) => {
    // on récupère les valeurs saisies dans la page 'new' par l'utilisateur :
    const id = books.length ? (books[books.length - 1].id + 1) : 1;
    const author = req.body.author
    const title = req.body.title
    const release = req.body.release
    const categorie = req.body.categorie
    const image = req.body.image

    // on créé un objet 'book' avec ces valeurs :
    const book = {
        id: id,
        author: author,
        title: title,
        release: release,
        categorie: categorie,
        image: image
    }

    // on envoie cet objet vers notre tableau 'books[]' à l'aide de .push :
    books.push(book)

    // on redirige automatiquement vers la page 'catalogue' après l'envoi du formulaire :
    res.redirect('/catalogue')

}); // EO post

/*---------------------------
|          R E A D          |
--------------------------*/

// Méthode GET (pour afficher les informations du livre dans la page 'show') ->
router.get('/:paramId', (req, res) => {
    const id = req.params.paramId
    const book = books.filter((book) => {
        return (book.id == id)
    })[0];

    res.render('show', {
        book: book
    });
}); // EO get

/*---------------------------
|        U P D A T E        |
--------------------------*/

// Méthode GET pour accéder à la page 'edit' du livre choisi ->
router.get('/:paramId/edit', (req, res) => {
    const id = req.params.paramId
    const book = books.filter((book) => {
        return (book.id == id)
    })[0];

    res.render('edit', {
        book: book
    });
}); // EO get

// Méthode POST (pour envoyer les modifications du formulaire de la page 'edit') ->
router.post('/:paramId/edit', (req, res) => {
    // on récupère les valeurs saisies dans la page 'edit' par l'utilisateur :
    const id = req.params.paramId;
    const author = req.param('author');
    const title = req.param('title');
    const release = req.param('release');
    const categorie = req.param('categorie');

    // on parcours notre tableau 'books' avec une boucle forEach, si l'id est trouvé, on remplace les valeurs par les variables ci-dessus :
    books.forEach((book) => {
        if (book.id == id) {
            book.author = author
            book.title = title
            book.release = release
            book.categorie = categorie
        } // EO if
    }); // EO forEach

    // on redirige automatiquement vers la page 'catalogue' après l'envoi du formulaire :
    res.redirect('/catalogue')

}); // EO post

/*---------------------------
|        D E L E T E        |
--------------------------*/

// // Méthode POST pour SUPPRIMER le livre sélectionné ->
// router.post('/:paramId', (req, res) => {
//     const id = req.params.paramId;

//     books = books.filter((book) => {
//         return (book.id != id);
//     });

//     // on redirige automatiquement vers la page 'catalogue' après la suppression :
//     res.redirect('/catalogue');

// }); // EO post

// Méthode GET pour SUPPRIMER le livre sélectionné ->
router.get('/:paramId/delete', (req, res) => {
    const id = req.params.paramId;

    books = books.filter((book) => {
        return (book.id != id);
    });

    // on redirige automatiquement vers la page 'catalogue' après la suppression :
    res.redirect('/catalogue');

}); // EO post

// ================= FIN DU CRUD :) =================

module.exports = router;