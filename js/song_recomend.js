let TituloArray = ["En la Ciudad de la Furia","The Scientist","Eleanor Rigby"];
let ArtistaArray = ["Soda Stereo","Coldplay", "The Beatles"];

let linea = document.querySelector("#Linea");
let lineaCopia = linea.cloneNode(true);

linea.remove();

let couplet = document.querySelector("#Couplet");
let coupletCopia = couplet.cloneNode(true);

couplet.remove();

let lyrics = document.querySelector("#Lyrics");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

let CH = getRandomInt(3);

let Titulo = TituloArray[CH];
let Artista = ArtistaArray[CH];


fetch("https://api.lyrics.ovh/v1/" + Artista + "/" + Titulo)
.then (response => response.json())
.then(data =>
    {
        let Letra = data.lyrics;

        Letra = Letra.replaceAll("\n\n","\n");

        let LetraArray = Letra.split("\n");

        document.querySelector("#Tema").innerHTML = "'" + Titulo + "' por " + Artista;

        Create_Couplet(3,LetraArray);

    }
)
.catch(error=>console.log(error));

function Create_Couplet(N,LetraArray)
{
    var i;
    for(let i=0;i<N;i++)
        {
            let NewCouplet = coupletCopia.cloneNode(true);
            lyrics.appendChild(NewCouplet);
            let NewArray = Create_Line(LetraArray.indexOf(""),LetraArray,NewCouplet);
            LetraArray.length = 0;         
            LetraArray.push.apply(LetraArray, NewArray);
        }
    
};

function Create_Line(N, LetraArray, Couplet)
{
    var i;
    for(i=0;i<N;i++)
        {
            let NewLine = lineaCopia.cloneNode(true);
            NewLine.innerHTML = LetraArray[i];
            Couplet.appendChild(NewLine);
        }
        
    return LetraArray.slice(i+1,LetraArray.lenght);
};

