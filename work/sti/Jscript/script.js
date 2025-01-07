var personnes =[
    {
    prenom: "Jules",
     Nom: "Ferry",
     age: 50,
 
 informarion: function(){
     return 'je suis ' +this.prenom + ' ' + this.Nom + ' ' + "j'ai " + this.age + ' ans';
 }
},


 {
    prenom: "gerard",
     Nom: "briaud",
     age: 30,
 
 informarion: function(){
     return 'je suis ' +this.prenom + ' ' + this.Nom + ' ' + "j'ai " + this.age + ' ans';
 }
 },
 {
    prenom: "Alexandre",
     Nom: "Dumas",
     age: 28,
 
 informarion: function(){
     return 'je suis ' +this.prenom + ' ' + this.Nom + ' ' + "j'ai " + this.age + ' ans';
 }
 },


 {
    prenom: "Remi",
     Nom: "Gabin",
     age: 25,
 
 informarion: function(){
     return 'je suis ' +this.prenom + ' ' + this.Nom + ' ' + "j'ai " + this.age + ' ans';
 }
 }

];


  function afficher(){
    for (let i = 0; i < personnes.length; i++) {
        console.log(personnes[i].informarion());
      }
    //personnes.forEach(element => console.log(element.informarion()));
    const liste=   personnes.map(x=> '<li>' + x.informarion()+'</li>');
    console.log(liste[0]);
    console.log(liste[1]);
    const html=liste.join('');
    console.log(html);
    document.getElementById("affiche").innerHTML= '<ul>'+ html + '</ul>';
    const age=personnes.map(x=>x=x.age);
    const somme=age.reduce((moyenne,element)=>(moyenne+element))/age.length;
    console.log(somme);
    document.getElementById("age_moyen").innerHTML= '<ul>'+ 'L age moyen est de ' + somme + ' ans' +'</ul>';


    
  }
