const pate=15;
const salad=12;
const steak=25;
const poulet=20;
const creme=8;
const tartin=10;
var plat_eur=0;
var entree_eur=0;
var dessert_eur=0;
const entree_index = 0;
const plat_index = 0;
const dessert_index = 0;
function calc_restau() {
    selectElement = document.getElementById("entree");
    const entree_index = selectElement.selectedIndex;
    selectElement = document.getElementById("plat");
    const plat_index = selectElement.selectedIndex;
    selectElement = document.getElementById("dessert");
    const dessert_index = selectElement.selectedIndex;
    if ((entree_index==0) || (plat_index==0) || (dessert_index ==0)) {
        prix_finale=0;

    } else {
        if (entree_index==1){
            entree_eur=0;
        }
        if (entree_index==2){
            entree_eur=12;
        } 
        if (entree_index==3){
            entree_eur=15;
        }
        if (plat_index==1){
            plat_eur=15;
        }
        if (plat_index==2){
            plat_eur=25;
        } 
        if (plat_index==3){
            plat_eur=20;
        }
        if (dessert_index==1){
            dessert_eur=0;
        }
        if (dessert_index==2){
            dessert_eur=8;
        } 
        if (dessert_index==3){
            dessert_eur=10;
        }
        var prix_finale = entree_eur+plat_eur+dessert_eur
        document.getElementById("total").innerHTML=  'Le prix est de ' + prix_finale + ' €';
        console.log(prix_finale);
        console.log(plat_eur);
        console.log(entree_eur);
        console.log(dessert_eur);
        console.log("---------")
        console.log(entree_index);
        console.log(plat_index);
        console.log(dessert_index);


    }

}