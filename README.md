
# Autocompletion d'adresse facile

Système d'autocompletion d'adresses facile en JavaScript. Ce système fonctionne grâce à la Base d'adresse Nationale, mise en place gratuitement et mis a jour par les services publiques.

Vous pouvez intégrer ce système facilement et rapidement sur votre site en suivant la documentation ci-desous.


## Demo

Pour tester ce système, téléchagez le code du projet. Un lien sera prochainement disponible pour tester en ligne :)


## Documentation

### Mettre en place le système d'autocompletion

 1. Télécharger le fichier AutoComp.js et modifier le nom des id selon votre HTML
[Fichier AutoComp.js](https://github.com/RDSV01/AutocompletionAdresse/blob/main/AutoComp.js)

2. Mettre en place jQuery sur son site en mettant le code ci-dessous avant l'ouverture de votre balise <body> et modifier l'appel du fichier AutoComp.js selon son emplacement.

```html
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.7.3/themes/base/jquery-ui.css">
<script src="scriptAppelApi.js" defer></script>
```


## Important

Il est important de bien faire correspondre les "id" et les "names" de votre html et du javascript.


## Authors

[RDSV01](https://www.github.com/RDSV01)

[Site web](https://raphds.fr)

